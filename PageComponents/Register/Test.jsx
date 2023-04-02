import React from "react";

const Test = () => {
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
          error={formik.touched.confirm && formik.errors.confirm ? true : false}
          helperText={
            formik.touched.confirm && formik.errors.confirm
              ? formik.errors.confirm
              : ""
          }
          label="confirm"
          variant="outlined"
          sx={{
            width: "100%",
            outline: "none",
            // outline:
            //   formik.touched.firstconfirm &&
            //   formik.errors.firstconfirm
            //     ? " 1px solid red"
            //     : "initial",
            // border: " red",
            // outline: "none",
            // "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            //   border: "1px solid red",
            //   borderRadius: "5px 5px 0 0",
            // },
          }}
          type="password"
          name="Confirm Password"
          {...formik.getFieldProps("confirm")}
        />
      </Stack>
    </div>
  );
};

export default Test;
