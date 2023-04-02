import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../../GlobalContext";

const Header = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useGlobalContext();
  return (
    <>
      <AppBar position="fixed" color="primary" open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: { xs: 1, md: 2 } }}
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Mui</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
