const express = require("express");
const validate = require("../../middlewares/validate");
const flightValidation = require("../../validations/flight.validation");
const flightController = require("../../controllers/flight.controller");

const router = express.Router();

router.get(`/all`,validate(flightValidation.getAllFlights),flightController.getAllFlights);
router.get(`/:flightId`,validate(flightValidation.getFlight),flightController.getFlight);
router.get(`/:flightId/seats`,validate(flightValidation.getFlight),flightController.getAvailableSeats);



module.exports = router;