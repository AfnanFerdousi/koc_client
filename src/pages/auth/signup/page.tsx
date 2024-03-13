"use client";

import PasswordField from "@/components/form/passwordField";
import StartAodornmentField from "@/components/form/startAodornmentField";
import TextField from "@/components/form/textField";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { Stack, Typography } from "@mui/material";
import Grow from "@mui/material/Grow";
import React from "react";
import "./style.css";

const LoginPage = () => {
    const [email, setEmail] = React.useState<string>("");
    const [firstName, setFirstName] = React.useState<string>("");
    const [lastName, setLastName] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [telNum, setTelNum] = React.useState<string>("");
    // const [helperText, setHelperText] = React.useState<string>("");
    const handlePwd = (value: string) => {
        setPassword(value);
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
    return (
        <Stack
            className="auth-back"
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grow in={true}>
                <Stack direction="row" justifyContent="center">
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
                                    Icon={
                                        <LocalPhoneIcon
                                            sx={{ color: "#ffeba7" }}
                                        />
                                    }
                                    helperText={""}
                                    placeHolder="Telefon Numarası"
                                />
                                <StartAodornmentField
                                    value={email}
                                    handleChange={handleChange}
                                    Icon={
                                        <MarkunreadIcon
                                            sx={{ color: "#ffeba7" }}
                                        />
                                    }
                                    helperText={""}
                                    placeHolder="Email or Username"
                                />
                                <PasswordField
                                    value={password}
                                    handleChange={handlePwd}
                                    helperText={""}
                                    placeHolder="Password"
                                />
                            </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="center">
                            <div className="btn">Kayıt Ol</div>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignSelf="center"
                        >
                            <Typography sx={{ color: "#c4c3ca" }}>
                                Zaten hesabınız var mı?
                            </Typography>
                            <a href="/auth/login" className="auth-change-btn">
                                Log In
                            </a>
                        </Stack>
                    </div>
                </Stack>
            </Grow>
        </Stack>
    );
};

export default LoginPage;
