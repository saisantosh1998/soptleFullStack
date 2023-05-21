const { Flight, User, Booking, Seat } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const bookFlight = async (bookingDetails) => {
  const { flightId, email, bookedSeats } = bookingDetails;
  const flight = await Flight.findOne({ flightId });
  if (flight === null) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "No Flight found with provided flightId"
    );
  }
  const user = await User.findOne({ email });
  if (user === null) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Please provide your registered email"
    );
  }
  const booking = await Booking.create(bookingDetails);
  if (booking !== null) {
    const updateFlight = await Flight.updateOne({flightId},{$inc:{availableSeats:-(bookedSeats.length)}});
    if(updateFlight.modifiedCount !== 1){
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Something went wrong while booking please try again"
          );
    }
    const updateSeats = await Seat.updateMany({ seatNo: { $in: bookedSeats }, flightId }, { availability: "not available" });
    if(updateSeats.modifiedCount !== bookedSeats.length){
        throw new ApiError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Something went wrong while booking please try again"
          );
    }
    return booking;
  } else {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong while booking please try again"
    );
  }
};

const getBookingsByDate = async (bookingDate) => {
    const bookings = await Booking.find({bookingDate});
    if(bookings && bookings.length>0){
        return bookings;
    }
    throw new ApiError(
        httpStatus.NOT_FOUND,
        "No booking found for provided date"
      );
  };

module.exports = {
  bookFlight,
  getBookingsByDate,
};
