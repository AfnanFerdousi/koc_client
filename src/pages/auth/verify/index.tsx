import React from "react";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/axios/axios";
import toast from "react-hot-toast";
import { Stack, Typography } from "@mui/material";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<string>("");
  const router = useRouter();

  React.useEffect(() => {
    const handleLogin = async () => {
      const { token } = router.query;
      if (token !== undefined) {
        try {
          const response = await dispatch(verifyEmail(token));
          if (
            response.payload.statusCode === 200 ||
            response.payload.statusCode === 201
          ) {
            setState("verified");
          } else {
            toast.error("Ooops! Something went wrong.");
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
      }
    };

    // Call handleLogin when the component mounts
    handleLogin();

    // No dependencies are specified, so this effect will only run once on component mount
  }, [dispatch, router.query]);

  return (
    <Stack
      className="auth-back"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grow in={true}>
        <Stack direction="row" justifyContent="center">
          {state === "verified" ? (
            <div className="reset-wrap">
              <Stack direction="row" justifyContent="start" alignItems="center">
                <h4 className="auth-title">You email is now verified</h4>
              </Stack>
              <Stack
                direction="column"
                justifyContent="start"
                alignSelf="center"
                paddingX="45px"
              >
                <Typography sx={{ color: "#c4c3ca" }}>
                  You verified your email successfully. You have to login to
                  continue.
                </Typography>
                <br />
                <Typography sx={{ color: "#c4c3ca" }}>
                  <Link
                    className="auth-change-btn cursor-pointer"
                    href="/auth/login"
                  >
                    Go To The Login Page
                  </Link>
                </Typography>
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
