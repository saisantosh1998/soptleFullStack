import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import "./Dashboard.css";
import DashboardCard from "./DashboardCard";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import Flight from "./Flight";
import TodayBookings from "./TodayBookings";

function Dashboard() {
  const [showCard, setShowCard] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [availableflights, setAvailableFlights] = useState([]);
  const [availableSeats, setAvailableSeats] = useState(0);
  const [clickedCard, setClickedCard] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getBookings();
    getAvailableFlights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getBookings = async () => {
    try {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      const url = `${config.endpoint}/booking/${formattedDate}`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setBookings([...result.data]);
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
        {
          variant: "error",
        }
      );
    }
  };
  const getAvailableFlights = async () => {
    try {
      const url = `${config.endpoint}/flight/all`;
      let result = await axios.get(url);
      if (result.status === 200) {
        setAvailableFlights([...result.data]);
        getAvailableSeats([...result.data]);
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
        {
          variant: "error",
        }
      );
    }
  };
  const getAvailableSeats = (totalFlights) => {
    const totalSeats = totalFlights.reduce((total, current) => {
      return total + current.availableSeats;
    }, 0);
    setAvailableSeats(totalSeats);
  };
  const getClickedCard = (cardName) => {
    setClickedCard(cardName);
    setShowCard(false);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header />
        <Box className="dashboardContent">
          {showCard ? (
            <DashboardCard
              noOfBookings={bookings.length}
              noOfEmptySeats={availableSeats}
              handleClickedCard={getClickedCard}
            />
          ) : (
            <>
              {clickedCard === "seats" ? (
                <Flight fromDashboard={true}/>
              ) : (
                <></>
              )}
              {clickedCard === "bookings" ? (
                <TodayBookings bookings={bookings}/>
              ) : (
                <></>
              )}
            </>
          )}
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Dashboard;
