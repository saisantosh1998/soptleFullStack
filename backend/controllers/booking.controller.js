const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { bookingService } = require("../services");

const bookFlight = catchAsync(async (req, res) => {
  const booking = await bookingService.bookFlight(req.body);
  res.status(httpStatus.CREATED).json(booking);
});

const getBookingsByDate = catchAsync(async (req, res) => {
  const bookingDate = req.params.bookingDate;
  const bookings = await bookingService.getBookingsByDate(bookingDate);
  res.status(httpStatus.OK).json(bookings);
});
module.exports = {
  bookFlight,
  getBookingsByDate,
};
