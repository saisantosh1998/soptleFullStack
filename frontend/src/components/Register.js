import { Button, CircularProgress, FormControl, Stack, TextField ,Select, MenuItem, InputLabel} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const updateForm = (e) => {
    const key = e.target.name;
    const updatedForm = { ...form };
    updatedForm[key] = e.target.value;
    setForm(updatedForm);
  };

  const register = async (formData) => {
    try {
      if (validateInput(formData)) {
        setWait(true);
        let response = await axios.post(`${config.endpoint}/user/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
        if (response.status === 201) {
          setWait(false);
          enqueueSnackbar("Registered successfull", {
            variant: "success",
          });
          navigate("/login");
        }
      }
    } catch (err) {
      setWait(false);
      if (err.response.status >= 400 && err.response.status <= 499) {
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
    } else if (data.password.length < 6) {
      enqueueSnackbar(
        "Password must be at least 8 characters long and should contain atleast 1 letter and 1 number",
        {
          variant: "warning",
        }
      );
      return false;
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header />
      <Box className="registerContent">
        <Stack spacing={1} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            title="Name"
            name="name"
            placeholder="Enter Name"
            fullWidth
            value={form.name}
            onChange={updateForm}
          />
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
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be at least 8 characters long and should contain atleast 1 letter and 1 number"
            fullWidth
            placeholder="Enter a password with minimum 8 characters"
            value={form.password}
            onChange={updateForm}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            value={form.confirmPassword}
            onChange={updateForm}
          />
          <FormControl>
            <InputLabel id="dropdown-label">Select a role</InputLabel>
            <Select
              labelId="dropdown-label"
              name="role"
              id="dropdown"
              value={form.role}
              onChange={updateForm}
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          </FormControl>
          {!wait ? (
            <Button
              className="button"
              name="register"
              id="register"
              onClick={() => register(form)}
              variant="contained"
            >
              Register Now
            </Button>
          ) : (
            <CircularProgress />
          )}
          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
