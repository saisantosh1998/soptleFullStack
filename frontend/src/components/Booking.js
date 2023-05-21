import { React, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import ChairIcon from "@mui/icons-material/Chair";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "./Booking.css";

function Booking() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [open, setOpen] = useState(false);
  const [flight, setFlight] = useState({});
  const [bookingDate, setBookingDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const params = useParams();
  const styles = {
    typography: {
      color: "black",
      fontSize: 20,
      position: "absolute",
      fontWeight: "bold",
      margin: "auto",
      top: "10%",
    },
  };
  useEffect(() => {
    getSeats();
    getCapacity();
    getBookingDate();
  }, []);
  const getBookingDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    setBookingDate(formattedDate);
  };
  const getSeats = async () => {
    try {
      let url = `${config.endpoint}/flight/${params.flightId}/seats`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setSeats([...result.data]);
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
  const getCapacity = async () => {
    try {
      let url = `${config.endpoint}/flight/${params.flightId}`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setFlight({ ...result.data });
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
  const handleSelectedSeats = (index) => {
    if (!selectedSeats.includes(index)) {
      setSelectedSeats([...selectedSeats, index]);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBook = async () => {
    if (selectedSeats.length > 0) {
      try {
        let url = `${config.endpoint}/booking`;
        let result = await axios.post(url, {
          flightId: flight.flightId,
          email,
          bookedSeats: selectedSeats,
          bookingDate,
        });
        if (result.status === 201) {
          navigate("/");
          enqueueSnackbar("Booked Successfully", {
            variant: "success",
          });
        }
      } catch (err) {
        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
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
    } else {
      enqueueSnackbar("Please select seats before booking", {
        variant: "error",
      });
    }
    handleClose();
  };
  return (
    <>
      <Header />
      <Typography variant="h5">Choose Your Seats</Typography>
      {flight.capacity ? (
        <>
          <Grid container className="grid" spacing={2}>
            {Array(flight.capacity)
              .fill()
              .map((_, index) => (
                <Grid
                  key={index + 1}
                  item
                  xs={3}
                  md={4}
                  className="product-grid"
                >
                  <Button
                    key={index + 1}
                    onClick={() => handleSelectedSeats(index + 1)}
                  >
                    <Typography style={styles.typography}>
                      {index + 1}
                    </Typography>
                    <ChairIcon
                      color={
                        seats.includes(index + 1)
                          ? selectedSeats.includes(index + 1)
                            ? "success"
                            : "primary"
                          : "disabled"
                      }
                      disabled={!seats.includes(index)}
                      sx={{ fontSize: 50 }}
                    />
                  </Button>
                </Grid>
              ))}
          </Grid>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack direction="row" spacing={10}>
              <ChairIcon color="success" sx={{ fontSize: 50 }} />
              &nbsp;selected
              <ChairIcon color="primary" sx={{ fontSize: 50 }} />
              &nbsp;available
              <ChairIcon color="disabled" sx={{ fontSize: 50 }} />
              &nbsp;not available
            </Stack>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button className="checkoutButton" onClick={handleOpen}>
              Checkout
            </Button>
          </Box>
          <Dialog
            sx={{
              "& .MuiDialog-paper": {
                bgcolor: "#D3D3D3",
                borderRadius: "10px",
                color: "black!important",
              },
              "& .MuiDialogContent-root, & .MuiTypography-root": {
                color: "black",
              },
            }}
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Booking Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <strong>email:</strong> {email}
              </DialogContentText>
              <DialogContentText>
                <strong>flightId:</strong> {flight.flightId}
              </DialogContentText>
              <DialogContentText>
                <strong>bookedSeats:</strong>{" "}
                {selectedSeats.length > 0 ? selectedSeats.join(",") : "NA"}
              </DialogContentText>
              <DialogContentText>
                <strong>bookingDate:</strong> {bookingDate}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="cancelButton" onClick={handleClose}>
                Cancel
              </Button>
              <Button className="button" onClick={handleBook}>
                Book
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
}

export default Booking;
