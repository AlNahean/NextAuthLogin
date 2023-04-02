import { useState, useRef } from "react";

import {
  Paper,
  Box,
  Avatar,
  Button,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { Container } from "@mui/system";
import { Stack } from "@mui/material";
import React, { useLayoutEffect } from "react";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useRegisterContext } from "./Context";
import LoadingButton from "@mui/lab/LoadingButton";
import Divider from "@mui/material/Divider";
// import { Chip, Typography } from "@mui/material";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import { API } from "../../lib/axios/axios";
const FormStracture = [
  {
    fieldName: "Name",
    placeholder: "Enter your name",
    keyword: "name",
    type: "name",
  },
  {
    fieldName: "Email",
    placeholder: "Enter your e-mail",
    keyword: "email",
    type: "email",
  },
  {
    fieldName: "Password",
    placeholder: "Enter Password",
    keyword: "password",
    type: "password",
  },
  {
    fieldName: "Re-enter Password",
    placeholder: "Re-enter password",
    keyword: "re-password",
    type: "password",
  },
];

import { Formik } from "formik";
import * as Yup from "yup";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import HowToRegIcon from "@mui/icons-material/HowToReg";

const isObjectEmpty = (objectName) => {
  return Object.keys(objectName).length === 0;
};

const Register = () => {
  const formRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const { session, status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }
  const {
    registerData,
    setRegisterData,
    generateAvatar,
    resetFormData,
    imgLoading,
    setImgLoading,
  } = useRegisterContext();

  const handleSnackbarVariant = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };
  const handleInputChange = (e, keyword) => {
    // console.log(e, keyword);
    if (keyword === "name") {
      setRegisterData({ ...registerData, name: e.target.value });
    }
    if (keyword === "email") {
      setRegisterData({ ...registerData, email: e.target.value });
    }
    if (keyword === "password") {
      setRegisterData({ ...registerData, password: e.target.value });
    }
    if (keyword === "re-password") {
      setRegisterData({ ...registerData, re_password: e.target.value });
    }
  };

  const getInputState = (keyword) => {
    if (keyword === "name") {
      return registerData.name;
    }
    if (keyword === "email") {
      return registerData.email;
    }
    if (keyword === "password") {
      return registerData.password;
    }
    if (keyword === "re-password") {
      return registerData.re_password;
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      let registerDataCache = {
        ...formRef.current.values,
        img: registerData.img,
      };

      console.log(isObjectEmpty(formRef.current.errors));

      if (!isObjectEmpty(formRef.current.errors)) {
        handleSnackbarVariant("Please enter valid registration data", "error");

        return;
      }

      //will return true if there are no errors
      let result = await API.post("/api/auth/signup", registerDataCache);

      // console.log(result);
      if (result.ok) {
        handleSnackbarVariant(
          "Successfully registered. Please sign in",
          "success"
        );
      }
      handleSnackbarVariant(
        "Successfully registered. Please sign in",
        "success"
      );
      // alert("An error occurred");
      router.push("/signin");
    } catch (error) {
      console.log(error);
      handleSnackbarVariant("Error registering", "error");
    }
  };
  const onImgLoad = () => {
    console.log("load");
    setImgLoading(false);
  };

  useLayoutEffect(() => {
    // imgRef.current?.onLoad(() => {
    //   console.log("load");
    // });

    setTimeout(() => {
      setImgLoading(false);
    }, 3000);
    return () => {};
  }, []);
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md" sx={{}}>
          <form
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <Paper sx={{ padding: "1rem", width: "100%" }}>
              <Stack direction="row" sx={{ justifyContent: "center" }}>
                <Avatar
                  sx={{ height: "150px", width: "150px" }}
                  src={registerData.img}
                  onLoad={onImgLoad}
                />
              </Stack>
              <Stack
                direction="row"
                sx={{ justifyContent: "center", marginTop: "1rem" }}
              >
                <LoadingButton
                  size="large"
                  onClick={() => {
                    generateAvatar();
                    setImgLoading(true);
                  }}
                  endIcon={<ShuffleIcon />}
                  loading={imgLoading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Randomize
                </LoadingButton>
              </Stack>
              <Formik
                innerRef={formRef}
                initialValues={registerData}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  // firstName: Yup.string()
                  //   .max(15, "Must be 15 characters or less")
                  //   .required("Required"),
                  // lastName: Yup.string()
                  //   .max(20, "Must be 20 characters or less")
                  //   .required("Required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string()
                    .min(8, "Password must be 8 characters long")
                    .matches(/[0-9]/, "Password requires a number")
                    .matches(/[a-z]/, "Password requires a lowercase letter")
                    .matches(/[A-Z]/, "Password requires an uppercase letter")
                    .matches(/[^\w]/, "Password requires a symbol"),
                  confirm: Yup.string().oneOf(
                    [Yup.ref("password"), null],
                    'Must match "password" field value'
                  ),
                })}
              >
                {(formik) => {
                  console.log(formik);
                  return (
                    <div>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <TextField
                          error={
                            formik.touched.name && formik.errors.name
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.name && formik.errors.name
                              ? formik.errors.name
                              : ""
                          }
                          label="Name"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            outline: "none",
                            // outline:
                            //   formik.touched.firstName &&
                            //   formik.errors.firstName
                            //     ? " 1px solid red"
                            //     : "initial",
                            // border: " red",
                            // outline: "none",
                            // "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            //   border: "1px solid red",
                            //   borderRadius: "5px 5px 0 0",
                            // },
                          }}
                          type="text"
                          name="name"
                          {...formik.getFieldProps("name")}
                        />
                      </Stack>

                      {/* {formik.touched.firstName && formik.errors.firstName ? (
                        <div>{formik.errors.firstName}</div>
                      ) : null} */}

                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <TextField
                          error={
                            formik.touched.email && formik.errors.email
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                              ? formik.errors.email
                              : ""
                          }
                          label="E-mail"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            outline: "none",
                            // outline:
                            //   formik.touched.firstName &&
                            //   formik.errors.firstName
                            //     ? " 1px solid red"
                            //     : "initial",
                            // border: " red",
                            // outline: "none",
                            // "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            //   border: "1px solid red",
                            //   borderRadius: "5px 5px 0 0",
                            // },
                          }}
                          type="email"
                          name="E-mail"
                          {...formik.getFieldProps("email")}
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <TextField
                          error={
                            formik.touched.password && formik.errors.password
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                              ? formik.errors.password
                              : ""
                          }
                          label="Password"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            outline: "none",
                            // outline:
                            //   formik.touched.firstpassword &&
                            //   formik.errors.firstpassword
                            //     ? " 1px solid red"
                            //     : "initial",
                            // border: " red",
                            // outline: "none",
                            // "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            //   border: "1px solid red",
                            //   borderRadius: "5px 5px 0 0",
                            // },
                          }}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  sx={{ backgroundColor: "transparent" }}
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          {...formik.getFieldProps("password")}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <TextField
                          error={
                            formik.touched.confirm && formik.errors.confirm
                              ? true
                              : false
                          }
                          helperText={
                            formik.touched.confirm && formik.errors.confirm
                              ? formik.errors.confirm
                              : ""
                          }
                          label="Confirm Password"
                          variant="outlined"
                          sx={{
                            width: "100%",
                            outline: "none",
                          }}
                          type={showPassword ? "text" : "password"}
                          name="Confirm Password"
                          {...formik.getFieldProps("confirm")}
                          InputProps={{
                            // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                >
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Stack>
                    </div>
                  );
                }}
              </Formik>

              {/* {FormStracture.map((item) => {
                return (
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <TextField
                      value={getInputState(item.keyword)}
                      helperText="Please Enter your name"
                      variant="outlined"
                      label={item.fieldName}
                      sx={{ width: "100%" }}
                      type={item.type}
                      onChange={(e) => {
                        handleInputChange(e, item.keyword);
                      }}
                      required
                    />
                  </Stack>
                );
              })} */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: "1rem",
                }}
              >
                {/* <Button
                  variant="contained"
                  endIcon={<ShuffleIcon />}
                  onClick={() => {
                    resetFormData();
                    setImgLoading(true);
                  }}
                >
                  Reset
                </Button> */}
                <LoadingButton
                  color="error"
                  size="small"
                  onClick={() => {
                    resetFormData();
                    setImgLoading(true);
                    console.log(formRef.current);
                    formRef.current.resetForm();

                    console.log(formRef.current);
                  }}
                  endIcon={<RotateLeftIcon />}
                  loading={imgLoading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                  }}
                >
                  Reset
                </LoadingButton>
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<HowToRegIcon />}
                  // disabled={!isObjectEmpty(formRef.current.errors)}
                >
                  Register
                </Button>
              </Stack>

              <Divider
                variant="fullWidth"
                orientation="horizontal"
                sx={{ marginTop: "2rem" }}
              >
                <Chip label="Or" />
              </Divider>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    signIn("google");
                  }}
                  endIcon={<GoogleIcon />}
                >
                  Google
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    signIn("github");
                  }}
                  endIcon={<GitHubIcon />}
                >
                  Github
                </Button>
              </Stack>

              <Divider
                variant="fullWidth"
                orientation="horizontal"
                sx={{ marginTop: "2rem" }}
              >
                <Chip label="Already have an account" />
              </Divider>

              <Stack
                direction="row"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "1rem",
                  gap: "1rem",
                }}
              >
                {/* <Typography variant="body1">Dont Have an account</Typography> */}
                <Link href="/signin">
                  <Button variant="contained">Sign Up</Button>
                </Link>
              </Stack>
            </Paper>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Register;
