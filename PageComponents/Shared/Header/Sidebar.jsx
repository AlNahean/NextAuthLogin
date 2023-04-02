import React, { useState } from "react";

import Typography from "@mui/material/Typography";

import CircleIcon from "@mui/icons-material/Circle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import Box from "@mui/material/Box";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useGlobalContext } from "../../GlobalContext";

const drawerWidth = "640px";

const SIdebar = () => {
  const { currentUsers, currentUser, setCurrentUser } = useGlobalContext();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Box
        sx={{
          //   display: {
          //     xs: "none",
          //     md: "block",
          //   },
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={currentUser?.image} size="large" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Typography variant="h5" color="inherit">
                    {currentUser?.name}
                  </Typography>
                </>
              }
              variant="h1"
            />
            <ListItemIcon>
              <CircleIcon color="red" sx={{ color: "green" }} />
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider />
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="inherit">
              Active Now
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
                padding: "0px",
                maxHeight: 300,
                position: "relative",
                overflow: "auto",
              }}
            >
              {currentUsers.map((item, index) => {
                return (
                  <ListItem key={index} sx={{ width: "100%" }}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item?.image} />
                    </ListItemAvatar>
                    <Link href={`/chat/${item._id}`}>
                      <ListItemText
                        primary={
                          <>
                            <Typography variant="Body1" color="inherit">
                              {item?.name}
                            </Typography>
                          </>
                        }
                        secondary="WhatsUp?"
                      />
                    </Link>
                    <ListItemIcon>
                      <CircleIcon color="red" sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <AddCircleOutlineIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="inherit">
              Chats
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
                padding: "0px",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <ListItem key={index} sx={{ width: "100%" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="Body1" color="inherit">
                            Nahean
                          </Typography>
                        </>
                      }
                      secondary="WhatsUp?"
                    />
                    <ListItemIcon>
                      <CircleIcon color="red" sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <AddCircleOutlineIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="inherit">
              Received Invitation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
                padding: "0px",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <ListItem key={index} sx={{ width: "100%" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="Body1" color="inherit">
                            Nahean
                          </Typography>
                        </>
                      }
                    />
                    <ListItemIcon>
                      <CircleIcon color="red" sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <ClearIcon sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" color="inherit">
              Invite Sent
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
                padding: "0px",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                return (
                  <ListItem key={index} sx={{ width: "100%" }}>
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant="Body1" color="inherit">
                            Nahean
                          </Typography>
                        </>
                      }
                    />
                    <ListItemIcon>
                      <CircleIcon color="red" sx={{ color: "green" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <ClearIcon sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: "green" }} />
                    </ListItemIcon>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
        <Divider />
      </Box>
    </>
  );
};

export default SIdebar;
