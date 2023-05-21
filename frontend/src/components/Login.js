import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ email: "", password: "" });
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const updateForm = (e) => {
    const key = e.target.name;
    const updatedForm = { ...form };
    updatedForm[key] = e.target.value;
    setForm(updatedForm);
  };

  
  const login = async (formData) => {
    try {
      if (validateInput(formData)) {
        setWait(true);
        let response = await axios.post(`${config.endpoint}/user/login`, {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          setWait(false);
          enqueueSnackbar("Logged in successfully", {
            variant: "success",
          });
          persistLogin(response.data.email, response.data.role);
          navigate("/");
        }
      }
    } catch (err) {
     setWait(false);
      if (err.response&&(err.response.status >= 400 && err.response.status <= 499)) {
        enqueueSnackbar(err.response.data ? err.response.data.message : "", {
          variant: "error",
        });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
          {
            variant: "error",
          }
        );
      }
    }
  };


  const validateInput = (data) => {
    if (data.email.length === 0) {
      enqueueSnackbar("email is a required field", {
        variant: "warning",
      });
      return false;
    } else if (data.password.length === 0) {
      enqueueSnackbar("Password is a required field", {
        variant: "warning",
      });
      return false;
    } else {
      return true;
    }
  };

 
  const persistLogin = (email, role) => {
    localStorage.setItem('email', email);
    localStorage.setItem('role', role);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header />
      <Box className="loginContent">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            value={form.email}
            onChange={updateForm}
          />
          <TextField id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            fullWidth
            placeholder="Enter  Password"
            value={form.password}
            onChange={updateForm} />
            {!wait ? (
            <Button 
            className="button"
            name="login"
            id="login"
            onClick={() => login(form)}
            variant="contained">Login To Soptle Airlines</Button>
          ) : (
            <CircularProgress />
          )}
          <p className="secondary-action">
            Don't have an account?
            <Link className="link" to="/register">
              Register Now
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
