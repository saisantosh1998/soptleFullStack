import { Box } from "@mui/system";
import React from "react";
import "./Footer.css";
import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box className="footer">
      <Box className="footer-text">
        <h3>Soptle Airlines</h3>
      </Box>
      <p className="footer-text">
        Experience seamless travel with Soptle Airlines, India's most affordable
        and comprehensive flight booking solution.
      </p>
    </Box>
  );
};

export default Footer;
