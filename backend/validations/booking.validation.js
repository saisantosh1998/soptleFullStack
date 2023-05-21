const Joi = require("joi");
const { flightId, bookingDate } = require("./custom.validation");

const bookFlight = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    flightId: Joi.string().custom(flightId, "custom validation").required(),
    bookedSeats: Joi.array().required(),
    bookingDate: Joi.string().custom(bookingDate, "custom validation").required(),
  }),
};

const getBookings = {
  params: Joi.object().keys({
    bookingDate: Joi.string().custom(bookingDate, "custom validation").required(),
  }),
};

module.exports = {
  bookFlight,
  getBookings,
};
