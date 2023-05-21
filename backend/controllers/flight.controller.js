const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { flightService } = require("../services");

const getFlight = catchAsync(async (req, res) => {
  const id = req.params.flightId;
  let flight = await flightService.getFlight(id);
  if (flight !== null) {
    res.status(httpStatus.OK).json(flight);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "Flight not found");
  }
});

const getAllFlights = catchAsync(async (req, res) => {
  const flights = await flightService.getAllFlights(req.query);
  res.status(httpStatus.OK).json(flights);
});

const getAvailableSeats = catchAsync(async (req, res) => {
  const id = req.params.flightId;
  let flight = await flightService.getFlight(id);
  if (flight === null) {
    throw new ApiError(httpStatus.NOT_FOUND, "Flight not found");
  }
  const seats = await flightService.getAvailableSeats(id);
  res.status(httpStatus.OK).json(seats);
});
module.exports = {
  getFlight,
  getAllFlights,
  getAvailableSeats,
};
