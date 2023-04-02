import React from "react";
import Register from "../PageComponents/Register/Register";
import { RegisterProvider } from "../PageComponents/Register/Context";
import { AvatarGenerator } from "random-avatar-generator";
import Head from "next/head";

const RegisterPage = ({ generatedAvatar }) => {
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <RegisterProvider generatedAvatar={generatedAvatar}>
        <Register />
      </RegisterProvider>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const generator = new AvatarGenerator();
  return {
    props: {
      generatedAvatar: await generator.generateRandomAvatar(),
    },
  };
};

export default RegisterPage;
