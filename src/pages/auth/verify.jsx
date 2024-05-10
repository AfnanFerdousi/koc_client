import React, { useEffect, useState } from "react";
import Grow from "@mui/material/Grow";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { verifyEmail } from "@/axios/axios";
import toast from "react-hot-toast";
import { IconButton, Stack, Typography } from "@mui/material";
import Head from "next/head";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      const { token } = router.query;
      if (token !== undefined) {
        try {
          setState("loading");
          const response = await dispatch(
            verifyEmail({
              dynamicParams: { token: token },
              bodyData: { token: token },
            })
          );
          if (
            response.payload.statusCode === 200 ||
            response.payload.statusCode === 201
          ) {
            setState("verified");
          } else {
            toast.error("Ooops! Something went wrong.");
            setState("");
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
      <Head>
        <title>Verify | KOC Freelancing</title>
      </Head>
      <Grow in={true}>
        <Stack direction="row" justifyContent="center">
          {state === "verified" ? (
            <div className="reset-wrap p-6">
              <Stack
                direction="row"
                display="flex"
                justifyContent="start"
                alignItems="center"
                mb={4}
              >
                <IconButton
                  onClick={() => handleClick("login")}
                  sx={{ marginLeft: "20px" }}
                ></IconButton>
                <h4 className="text-xl ">Your email is now verified!</h4>
              </Stack>
              <Stack
                direction="column"
                justifyContent="start"
                alignSelf="center"
                paddingX="45px"
              >
                <Typography sx={{ color: "#c4c3ca" }}>
                  You've successfully verified your email.
                </Typography>
                <br />
                <Typography sx={{ color: "#c4c3ca" }}>
                  <Link
                    href="/auth/login"
                    className="auth-change-btn cursor-pointer"
                  >
                    Go to the login page to continue
                  </Link>
                </Typography>
              </Stack>
            </div>
          ) : state === "loading" ? (
            <div className="reset-wrap p-6">
              <Stack
                direction="row"
                display="flex"
                justifyContent="start"
                alignItems="center"
                mb={4}
              >
                <IconButton
                  onClick={() => handleClick("login")}
                  sx={{ marginLeft: "20px" }}
                ></IconButton>
                <h4 className="text-xl ">Please wait a sec....</h4>
              </Stack>
              <div className="loader mx-auto"></div>{" "}
            </div>
          ) : (
            <div className="reset-wrap p-6">
              <Stack
                direction="row"
                display="flex"
                justifyContent="start"
                alignItems="center"
                mb={4}
              >
                <IconButton
                  onClick={() => handleClick("login")}
                  sx={{ marginLeft: "20px" }}
                ></IconButton>
                <h4 className="text-xl ">Oops! Something went wrong</h4>
              </Stack>
            </div>
          )}
        </Stack>
      </Grow>
    </Stack>
  );
};

export default LoginPage;
