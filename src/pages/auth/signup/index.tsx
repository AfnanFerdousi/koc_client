"use client";

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
  const [email, setEmail] = React.useState<string>("");
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [telNum, setTelNum] = React.useState<string>("");
  const [state, setState] = React.useState<string>("signup");
  const [showResendButton, setShowResendButton] = React.useState<boolean>(true);
  const [timer, setTimer] = React.useState<number>(60);
  const dispatch = useDispatch();
  const handlePwd = (value: string) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handleChange = (value: string) => {
    setEmail(value);
  };
  const handleChangeFirstName = (value: string) => {
    setFirstName(value);
  };
  const handleChangeLastName = (value: string) => {
    setLastName(value);
  };
  const handleChangeNumber = (value: string) => {
    setTelNum(value);
  };
  const handleClick = (value: string) => {
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

    try {
      const response = await dispatch(registerUser(userData));
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        setState("verify");
        dispatch(resendEmail(userData.email));
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
          {state === "signup" && (
            <div className="register-wrap">
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
                <div className="btn" onClick={handleSignup}>
                  Kayıt Ol
                </div>
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
          ) : state === "loggedIn" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
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
          ) : null}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default SignupPage;
