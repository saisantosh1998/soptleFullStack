import React from "react";
import { Box, Button, Stack, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  return (
    <Box className="header">
      <Box className="header-title" onClick={() => navigate(`/`)}>
        <h3>Soptle Airlines</h3>
      </Box>
      {email && role ? (
        <Stack direction="row" spacing={2}>
          {role==='admin'?<Button variant="h6" onClick={()=>navigate('/dashboard')}>Dashboard</Button>:<></>}
          <Avatar src="avatar.png" alt={email} />
          <Typography variant="h6">{email.split("@")[0]}</Typography>
          <Button
            name="logout"
            className="logout"
            id="logout"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            LOGOUT
          </Button>
        </Stack>
      ) : (
        <Box>
          <Button sx={{ color: "black" }} onClick={() => navigate("/login")}>
            LOGIN
          </Button>
          <Button
            sx={{ backgroundColor: "#00a278" }}
            onClick={() => navigate("/register")}
            variant="contained"
          >
            REGISTER
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Header;
