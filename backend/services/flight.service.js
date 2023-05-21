const { Flight, Seat } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getFlight = async (id) => {
  const result = await Flight.findOne({ flightId: id });
  return result;
};

const getAllFlights = async (queryParams) => {
  const { departure, arrival } = queryParams;
  let flights;
  if (departure && !arrival) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "please provide arrival destination for flight"
    );
  }
  if (!departure && arrival) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "please provide departure destination for flight"
    );
  }
  if (departure && arrival) {
    flights = await Flight.find({
      departureAirport: departure,
      arrivalAirport: arrival,
    });
  } else {
    flights = await Flight.find({});
  }
  if (flights && flights.length > 0) {
    return flights;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "No Flights found in database");
  }
};

const getAvailableSeats = async (id) => {
  const result = await Seat.find({ flightId: id, availability:"available" },{"_id":0,seatNo:1});
  const availableSeats = result.map(seat=>seat.seatNo);
  if(availableSeats && availableSeats.length<=0){
    throw new ApiError(httpStatus.BAD_REQUEST, "All seats are booked");
  }
  return availableSeats;
};

module.exports = {
  getFlight,
  getAllFlights,
  getAvailableSeats,
};
