import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import StartAodornmentField from "@/components/form/startAodornmentField";
import PasswordField from "@/components/form/passwordField";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, loginUser, resendEmail } from "@/axios/axios";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [state, setState] = React.useState<string>("login");
  const [showResendButton, setShowResendButton] = React.useState<boolean>(true);
  const [timer, setTimer] = React.useState<number>(60);
  const router = useRouter();
  const handlePwd = (value: string) => {
    setPassword(value);
  };
  const handleChange = (value: string) => {
    setValue(value);
  };
  const handleClick = (value: string) => {
    setState(value);
  };

  const handleLogin = async () => {
    const userData = { email: value, password };
    try {
      const response = await dispatch(loginUser(userData));
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        router.push("/");
      } else if (response.payload.message === "Verify your email!") {
        setState("verify");
        dispatch(resendEmail(userData.email));
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleForgetPassword = async () => {
    try {
      await dispatch(forgetPassword(value));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleResendEmail = async () => {
    setShowResendButton(false);
    setTimer(60);
    try {
      const response = await dispatch(resendEmail(email));
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Start the countdown timer
    if (!showResendButton) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            // If timer reaches 0, show the resend button again
            clearInterval(intervalId);
            setShowResendButton(true);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [showResendButton]);
  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setState("loggedIn");
    }
  }, []);
  return (
    <Stack
      className="auth-back"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grow in={true}>
        <Stack direction="row" justifyContent="center">
          {state === "login" ? (
            <div className="center-wrap">
              <h4 className="auth-title">Giriş Yap</h4>
              <Stack direction="row" justifyContent="center">
                <Stack sx={{ width: "80%" }}>
                  <StartAodornmentField
                    value={value}
                    handleChange={handleChange}
                    Icon={<MarkunreadIcon sx={{ color: "#ffeba7" }} />}
                    helperText={""}
                    placeHolder="Email or Username"
                  />
                  <PasswordField
                    value={password}
                    handleChange={handlePwd}
                    helperText={""}
                    error={false}
                    placeHolder="Password"
                  />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="end">
                <div
                  className="auth-reset cursor-pointer"
                  onClick={() => handleClick("reset")}
                >
                  Şifrenizi mi unuttunuz?
                </div>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <div className="btn" onClick={handleLogin}>
                  GİRİŞ YAP
                </div>
              </Stack>
              <Stack direction="row" justifyContent="center" alignSelf="center">
                <Typography sx={{ color: "#c4c3ca" }}>
                  Hesabınız yok mu?
                </Typography>
                <Link href="/auth/signup" className="auth-change-btn">
                  Sign Up
                </Link>
              </Stack>
            </div>
          ) : (
            state === "verify" && (
              <div className="reset-wrap">
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => handleClick("login")}
                    sx={{ marginLeft: "20px" }}
                  >
                    <ArrowBackIosNewIcon sx={{ color: "grey" }} />
                  </IconButton>
                  <h4 className="auth-title">Verify Your Email</h4>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="start"
                  alignSelf="center"
                  paddingX="45px"
                >
                  <Typography sx={{ color: "#c4c3ca" }}>
                    We have sent a verification email to your inbox. Verify your
                    email to continue.{" "}
                  </Typography>
                  <br />
                  <Typography sx={{ color: "#c4c3ca" }}>
                    Didn't receive an email?{" "}
                    {showResendButton ? (
                      <span
                        className="auth-change-btn cursor-pointer"
                        onClick={handleResendEmail}
                      >
                        Resend email.
                      </span>
                    ) : (
                      <span>{`Resend email in ${timer} seconds.`}</span>
                    )}
                  </Typography>
                </Stack>
              </div>
            )
          )}{" "}
          {/* Closing brace for first ternary condition */}
          {state === "reset" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <IconButton
                  onClick={() => handleClick("login")}
                  sx={{ marginLeft: "20px" }}
                >
                  <ArrowBackIosNewIcon sx={{ color: "grey" }} />
                </IconButton>
                <h4 className="auth-title">Şifrenizi sıfırlayın</h4>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <Stack sx={{ width: "80%" }}>
                  <StartAodornmentField
                    value={value}
                    handleChange={handleChange}
                    Icon={<MarkunreadIcon sx={{ color: "#ffeba7" }} />}
                    helperText={""}
                    placeHolder="Email or Username"
                  />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <div className="btn" onClick={handleForgetPassword}>
                  Sonraki
                </div>
              </Stack>
            </div>
          ) : (
            state === "loggedIn" && (
              <div className="reset-wrap">
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  <h4 className="auth-title">There's nothing here</h4>
                </Stack>
                <Stack
                  direction="column"
                  justifyContent="start"
                  alignSelf="center"
                  paddingX="45px"
                >
                  <Typography sx={{ color: "#c4c3ca" }}>
                    You are already logged in.
                  </Typography>
                  <br />
                  <Typography sx={{ color: "#c4c3ca" }}>
                    <Link href="/" className="auth-change-btn cursor-pointer">
                      Go back to home.
                    </Link>
                  </Typography>
                </Stack>
              </div>
            )
          )}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default LoginPage;
