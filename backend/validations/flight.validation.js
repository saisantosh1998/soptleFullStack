const Joi = require("joi");
const { flightId } = require("./custom.validation");

const getFlight = {
  params: Joi.object().keys({
    flightId: Joi.string().custom(flightId, "custom validation").required(),
  }),
};
const getAllFlights = {
  query: Joi.object().keys({
    departure: Joi.string(),
    arrival: Joi.string(),
  }),
};
module.exports = {
  getFlight,
  getAllFlights,
};
