import React from "react";
import { useGlobalContext } from "../../GlobalContext";
import Box from "@mui/material/Box";
import Sidebar from "./Sidebar";
import Drawer from "@mui/material/Drawer";

const LeftDrawer = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useGlobalContext();

  return (
    <>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        sx={{ display: { sm: "block", md: "none" } }}
      >
        <Box
          sx={{
            width: "80%",
            height: "100vh",
            width: "100%",
          }}
        >
          <Sidebar />
        </Box>
      </Drawer>
    </>
  );
};

export default LeftDrawer;
