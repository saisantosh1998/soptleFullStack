import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { SentimentDissatisfied } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "./Flight.css";
import { config } from "../App";
import { useNavigate } from "react-router-dom";
function Flight(props) {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({ departure: "", arrival: "" });
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const { enqueueSnackbar } = useSnackbar();
  const headers = !props.fromDashboard
    ? [
        "flightId",
        "departureAirport",
        "arrivalAirport",
        "departureTime",
        "arrivalTime",
        "availableSeats",
        "actions",
      ]
    : [
        "flightId",
        "departureAirport",
        "arrivalAirport",
        "departureTime",
        "arrivalTime",
        "availableSeats",
      ];
  const updateForm = (e) => {
    const key = e.target.name;
    const updatedForm = { ...form };
    updatedForm[key] = e.target.value;
    setForm(updatedForm);
  };

  useEffect(() => {
    performAPICall();
  }, []);
  useEffect(() => {
    let delayDebounceFn;
    if (form.departure && form.arrival) {
      delayDebounceFn = setTimeout(() => {
        addFilters();
      }, 500); 
    }
    return () => {
      clearTimeout(delayDebounceFn);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.departure, form.arrival]);
  const performAPICall = async () => {
    try {
      let url = `${config.endpoint}/flight/all`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setFlights([...result.data]);
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }
  };
  const addFilters = async () => {
    try {
      setFlights([]);
      let url = `${config.endpoint}/flight/all?departure=${form.departure}&arrival=${form.arrival}`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setFlights([...result.data]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 499
      ) {
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
  const goToBooking = (row) => {
    if (email) {
      navigate(`/booking/${row["flightId"]}`);
    } else {
      enqueueSnackbar("Please login to book a flight", {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ marginTop: "5px" }}>
      {!props.fromDashboard ? (
        <Stack
          direction={"row"}
          spacing={2}
          sx={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <TextField
            id="departure"
            label="Departure"
            variant="outlined"
            title="Departure"
            name="departure"
            placeholder="Enter Departure"
            fullWidth
            value={form.departure}
            onChange={updateForm}
          />
          <TextField
            id="arrival"
            variant="outlined"
            label="Arrival"
            name="arrival"
            title="Arrival"
            fullWidth
            placeholder="Enter  Arrival"
            value={form.password}
            onChange={updateForm}
          />
        </Stack>
      ) : (
        <></>
      )}

      <Box sx={{ marginTop: "25px" }}>
        {flights.length > 0 ? (
          <>
            <TableContainer sx={{ height: "61vh" }} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableCell key={header}>
                        <Typography fontWeight="bold">{header}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell key="flightId">{row["flightId"]}</TableCell>
                      <TableCell key="departureAirport">
                        {row["departureAirport"]}
                      </TableCell>
                      <TableCell key="arrivalAirport">
                        {row["arrivalAirport"]}
                      </TableCell>
                      <TableCell key="departureTime">
                        {row["departureTime"]}
                      </TableCell>
                      <TableCell key="arrivalTime">
                        {row["arrivalTime"]}
                      </TableCell>
                      <TableCell key="availableSeats">
                        {row["availableSeats"]}
                      </TableCell>
                      {!props.fromDashboard ? (
                        <TableCell key="actions">
                          <Button
                            className="button"
                            onClick={() => goToBooking(row)}
                          >
                            Book
                          </Button>
                        </TableCell>
                      ) : (
                        <></>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "64vh",
              width: "100vw",
            }}
          >
            <SentimentDissatisfied />
            <br />
            <Typography variant="body2">No flights found</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Flight;
