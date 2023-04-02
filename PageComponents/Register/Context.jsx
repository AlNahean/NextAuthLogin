import React, { useState, useEffect, useReducer, useContext } from "react";
import { AvatarGenerator } from "random-avatar-generator";

export const AppContext = React.createContext();

export const RegisterProvider = ({ children, generatedAvatar }) => {
  const [imgLoading, setImgLoading] = useState(true);

  const generator = new AvatarGenerator();
  const generateAvatar = () => {
    // Simply get a random avatar
    let avatar = generator.generateRandomAvatar();

    setRegisterData({ ...registerData, img: avatar });
  };
  const [test, setTest] = useState("Test");
  const [registerData, setRegisterData] = useState({
    img: generatedAvatar,
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const resetFormData = () => {
    console.log("reset-data");
    setRegisterData({
      img: generator.generateRandomAvatar(),
      name: "",
      email: "",
      password: "",
      re_password: "",
    });
  };
  return (
    <AppContext.Provider
      value={{
        test,
        registerData,
        setRegisterData,
        generateAvatar,
        resetFormData,
        imgLoading,
        setImgLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useRegisterContext = () => {
  return useContext(AppContext);
};
