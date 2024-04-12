import { registerUser, resendEmail } from "@/axios/axios";
import PasswordField from "@/components/form/passwordField";
import StartAodornmentField from "@/components/form/startAodornmentField";
import TextField from "@/components/form/textField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { IconButton, Stack, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [telNum, setTelNum] = React.useState("");
  const [state, setState] = React.useState("signup");
  const [showResendButton, setShowResendButton] = React.useState(true);
  const [timer, setTimer] = React.useState(60);
  const [loading, setLoading] = React.useState({
    signup: false,
    resendEmail: false,
  });
  const dispatch = useDispatch();
  const handlePwd = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handleChange = (value) => {
    setEmail(value);
  };
  const handleChangeFirstName = (value) => {
    setFirstName(value);
  };
  const handleChangeLastName = (value) => {
    setLastName(value);
  };
  const handleChangeNumber = (value) => {
    setTelNum(value);
  };
  const handleClick = (value) => {
    setState(value);
  };
  const handleSignup = async () => {
    const userData = {
      first_name: firstName,
      lastName: lastName,
      role: "user",
      phone_number: telNum,
      email,
      password,
    };
    setLoading({ ...loading, signup: true }); // Start loading for signup
    try {
      const response = await dispatch(
        registerUser({
          dynamicParams: {},
          bodyData: userData,
        })
      );
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        setState("verify");
        dispatch(
          resendEmail({
            dynamicParams: { email: userData.email },
            bodyData: { email: userData.email },
          })
        );
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading({ ...loading, signup: false }); // Stop loading for signup
    }
  };

  const handleResendEmail = async () => {
    setShowResendButton(false);
    setTimer(60);
    setLoading({ ...loading, resendEmail: true }); // Start loading for resend email
    try {
      const response = await dispatch(
        resendEmail({
          dynamicParams: { email: email },
          bodyData: { email: email },
        })
      );
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        toast.success("Email sent successfully!");
      }
    } catch (error) {
      console.error("Resend email failed:", error);
    } finally {
      setLoading({ ...loading, resendEmail: false }); // Stop loading for resend email
    }
  };
  React.useEffect(() => {
    let intervalId;

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
          {state === "signup" && (
            <div className="register-wrap rounded-none md:rounded-[10px]">
              <h4 className="auth-title">Kayıt Ol</h4>
              <Stack direction="row" justifyContent="center">
                <Stack sx={{ width: "80%" }}>
                  <Stack direction="row">
                    <TextField
                      value={firstName}
                      handleChange={handleChangeFirstName}
                      helperText={""}
                      placeHolder="First Name"
                    />
                    <TextField
                      value={lastName}
                      handleChange={handleChangeLastName}
                      helperText={""}
                      placeHolder="Last Name"
                    />
                  </Stack>
                  <StartAodornmentField
                    value={telNum}
                    handleChange={handleChangeNumber}
                    Icon={<LocalPhoneIcon sx={{ color: "#ffeba7" }} />}
                    helperText={""}
                    placeHolder="Telefon Numarası"
                  />
                  <StartAodornmentField
                    value={email}
                    handleChange={handleChange}
                    Icon={<MarkunreadIcon sx={{ color: "#ffeba7" }} />}
                    helperText={""}
                    placeHolder="Email or Username"
                  />
                  <PasswordField
                    value={password}
                    handleChange={handlePwd}
                    error={passwordError}
                    helperText={""}
                    placeHolder="Password"
                  />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="center">
                {loading.signup ? (
                  <div className="btn !cursor-context-menu !px-16 hover:bg-[#ffeaa7af]">
                    <div className="loaderAuth mx-auto"></div>{" "}
                  </div>
                ) : (
                  <div className="btn" onClick={handleSignup}>
                    Kayıt Ol
                  </div>
                )}
              </Stack>
              <Stack direction="row" justifyContent="center" alignSelf="center">
                <Typography sx={{ color: "#c4c3ca" }}>
                  Zaten hesabınız var mı?{" "}
                </Typography>
                <Link href="/auth/login" className="auth-change-btn">
                  Log In
                </Link>
              </Stack>
            </div>
          )}
          {state === "verify" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <IconButton
                  onClick={() => handleClick("signup")}
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
                  Didn&apos;t receive an email?{" "}
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
          ) : state === "loggedIn" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <h4 className="auth-title">There&apos;s nothing here</h4>
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
          ) : null}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default SignupPage;
