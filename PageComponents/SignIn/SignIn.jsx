import React, { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Alert, Chip, Snackbar, Typography } from "@mui/material";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormStracture = [
  {
    fieldName: "Email",
    placeholder: "Enter your email",
    keyword: "email",
    type: "email",
    helperText: "Please Enter your name",
  },
  {
    fieldName: "Password",
    placeholder: "Enter your password",
    keyword: "password",
    type: "password",
    helperText: "Please Enter your password",
  },
];

const SignIn = () => {
  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleSnackbarVariant = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const { status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }
  const [logInData, setLogInData] = useState({ email: "", password: "" });

  const handleInputChange = (e, keyword) => {
    // console.log(e, keyword);

    if (keyword === "email") {
      setLogInData({ ...logInData, email: e.target.value });
    }
    if (keyword === "password") {
      setLogInData({ ...logInData, password: e.target.value });
    }
  };

  const getInputState = (keyword) => {
    if (keyword === "email") {
      return logInData.email;
    }
    if (keyword === "password") {
      return logInData.password;
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      // e.preventDefault();
      console.log(values);
      console.log(logInData);
      const status = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });

      if (status.ok) router.push(status.url);
      console.log(status, "error");
      {
        status.error && handleSnackbarVariant(status.error, "error");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  //
  //

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>{" "} */}
      <div
        style={{
          minHeight: "100vh",
          paddingTop: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "100%" }}
          >
            {/* <form
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              onSubmit={(e) => {
                handleFormSubmit(e);
              }}
            > */}
            <Paper sx={{ padding: "3rem", maxWidth: "700px", width: "100%" }}>
              <Formik
                innerRef={formRef}
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string()
                    .min(8, "Password must be 8 characters long")
                    .matches(/[0-9]/, "Password requires a number")
                    .matches(/[a-z]/, "Password requires a lowercase letter")
                    .matches(/[A-Z]/, "Password requires an uppercase letter")
                    .matches(/[^\w]/, "Password requires a symbol"),
                })}
                onSubmit={(values) => {
                  // setTimeout(() => {
                  //   alert(JSON.stringify(values, null, 2));
                  //   setSubmitting(false);
                  // }, 400);
                  // alert("value", values);
                  handleFormSubmit(values);
                  console.log("Values", values);
                }}
              >
                {/* <Form> */}
                {/* <> */}
                {(formik) => {
                  return (
                    <>
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
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          onClick={() => {
                            // alert("Password");
                            // console.log(formik);
                            formik.submitForm();
                          }}
                        >
                          Sign In
                        </Button>
                      </Stack>
                    </>
                  );
                }}
                {/* </> */}
                {/* </Form> */}
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
                      helperText={item.helperText}
                      value={getInputState(item.keyword)}
                      onChange={(e) => {
                        handleInputChange(e, item.keyword);
                      }}
                      variant="outlined"
                      label={item.fieldName}
                      sx={{ width: "100%" }}
                      type={item.type}
                    />
                  </Stack>
                );
              })} */}

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
                >
                  Google
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    // handleClick();
                    handleSnackbarVariant("msg", "error");
                  }}
                >
                  Github
                </Button>
              </Stack>

              <Divider
                variant="fullWidth"
                orientation="horizontal"
                sx={{ marginTop: "2rem" }}
              >
                <Chip label="Don't have an account" />
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
                <Link href="/register">
                  <Button variant="contained">Register</Button>
                </Link>
              </Stack>
            </Paper>
            {/* </form> */}
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
