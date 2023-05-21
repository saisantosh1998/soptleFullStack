import React, { useEffect, useState } from "react";
import { SentimentDissatisfied } from "@mui/icons-material";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function TodayBookings(props) {
  const [flightsMap, setFlightsMap] = useState({});
  useEffect(() => {
    getFlightsMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getFlightsMap = () => {
    const bookings = props.bookings;
    const currentFlightsMap = flightsMap;
    bookings.forEach((booking) => {
      const bookingData = {
        email: booking.email,
        bookedSeats: booking.bookedSeats,
      };
      if (currentFlightsMap.hasOwnProperty(booking.flightId)) {
        currentFlightsMap[booking.flightId].push(bookingData);
      } else {
        currentFlightsMap[booking.flightId] = [bookingData];
      }
    });
    setFlightsMap({ ...currentFlightsMap });
  };
  const headers = ["flightId", "email", "bookedSeats"];

  return (
    <Box sx={{ marginTop: "5px" }}>
      {props.bookings.length > 0 ? (
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
                {Object.entries(flightsMap).map(([flightId, values]) => (
                  <React.Fragment key={flightId}>
                    <TableRow key={flightId}>
                      <TableCell rowSpan={values.length}>{flightId}</TableCell>
                      <TableCell>{values[0].email}</TableCell>
                      <TableCell>{values[0].bookedSeats.join(",")}</TableCell>
                    </TableRow>
                    {values.slice(1).map((value, index) => (
                      <TableRow key={`${flightId}-${index}`}>
                        <TableCell>{value.email}</TableCell>
                      <TableCell>{value.bookedSeats.join(",")}</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
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
          <Typography variant="body2">No bookings found</Typography>
        </Box>
      )}
    </Box>
  );
}

export default TodayBookings;
