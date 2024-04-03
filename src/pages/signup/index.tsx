import React from 'react';
import Head from "next/head"
import SignUpComp from './../../components/auth/SignUpComp';

const SignUp = () => {
    return (
        <div>
            <Head>
                <title>Signup</title>
            </Head>
            <SignUpComp />
        </div>
    );
};

export default SignUp;