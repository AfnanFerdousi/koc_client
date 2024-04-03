import React from "react";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/axios/axios";
import toast from "react-hot-toast";
import { Stack, Typography } from "@mui/material";
import StartAodornmentField from "@/components/form/startAodornmentField";
import PasswordField from "@/components/form/passwordField";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [queryToken, setQueryToken] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    const { token } = router.query;
    setQueryToken(token);
    if (token !== undefined) {
      setState("reset");
    }
  }, [router.query]);
  const handlePwd = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handleConfirmPwd = (value) => {
    setConfirmPassword(value);
  };
  const handleReset = async () => {
    const passwordData = {
      password,
      confirmPassword,
    };
    try {
      const response = await dispatch(
        resetPassword({ token: queryToken, passwordData })
      );
      console.log("response here", response);
      if (
        response.payload.statusCode === 200 ||
        response.payload.statusCode === 201
      ) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  return (
    <Stack
      className="auth-back"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grow in={true}>
        <Stack direction="row" justifyContent="center">
          {state === "reset" ? (
            <div className="center-wrap">
              <h4 className="auth-title">Reset Your Password</h4>
              <Stack direction="row" justifyContent="center">
                <Stack sx={{ width: "80%" }}>
                  <PasswordField
                    value={password}
                    handleChange={handlePwd}
                    helperText={""}
                    error={passwordError}
                    placeHolder="Password"
                  />
                  <PasswordField
                    value={confirmPassword}
                    handleChange={handleConfirmPwd}
                    helperText={""}
                    error={false}
                    placeHolder="Re-enter Password"
                  />
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="center">
                <div className="btn" onClick={handleReset}>
                  Reset Password
                </div>
              </Stack>
            </div>
          ) : (
            ""
          )}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default LoginPage;
