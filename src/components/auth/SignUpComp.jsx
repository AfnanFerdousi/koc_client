"use client";

import PasswordField from "@/components/form/passwordField";
import StartAodornmentField from "@/components/form/startAodornmentField";
import TextField from "@/components/form/textField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { Stack, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import React from "react";
import { useForm } from "react-hook-form"
import Link from "next/link";

const SignUpComp = () => {
   
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSignup = (data) => {
        console.log(data)
    }
    return (
        <Stack
            className="auth-back"
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grow in={true}>
                <Stack direction="row" justifyContent="center">
                    <form
                        onSubmit={handleSubmit(onSignup)} 
                        className="bg-transparent flex items-center justify-center">
                    <div className="register-wrap">
                        <h4 className="auth-title">Kayıt Ol</h4>
                        <Stack direction="row" justifyContent="center">
                            <Stack sx={{ width: "80%" }}>
                                <Stack direction="row">
                                    <TextField
                                        {...register("first_name", {
                                            required: true,
                                        })}
                                        helperText={""}
                                        placeHolder="First Name"
                                    />
                                    <TextField
                                        {...register("last_name", {
                                            required: true,
                                        })}
                                        helperText={""}
                                        placeHolder="Last Name"
                                    />
                                </Stack>
                                <StartAodornmentField
                                    {...register("phone_number", {
                                        required: true,
                                    })}
                                    Icon={
                                        <LocalPhoneIcon
                                            sx={{ color: "#ffeba7" }}
                                        />
                                    }
                                    helperText={""}
                                    placeHolder="Telefon Numarası"
                                />
                                <StartAodornmentField
                                    {...register("email", {
                                        required: true,
                                    })}
                                    Icon={
                                        <MarkunreadIcon
                                            sx={{ color: "#ffeba7" }}
                                        />
                                    }
                                    helperText={""}
                                    placeHolder="Email or Username"
                                />
                                <PasswordField
                                    {...register("password", {
                                        required: true,
                                    })}
                                    helperText={""}
                                    placeHolder="Password"
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="center">
                            <button type="submit" className="btn">Kayıt Ol</button>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignSelf="center"
                        >
                            <Typography sx={{ color: "#c4c3ca" }}>
                                Zaten hesabınız var mı?
                            </Typography>
                            <Link href="/login" className="auth-change-btn">
                                Log In
                            </Link>
                        </Stack>
                    </div>
                    </form>
                </Stack>
            </Grow>
        </Stack>
    );
};

export default SignUpComp;
