const express = require("express");
const validate = require("../../middlewares/validate");
const bookingValidation = require("../../validations/booking.validation");
const bookingController = require("../../controllers/booking.controller");

const router = express.Router();

router.post(`/`,validate(bookingValidation.bookFlight),bookingController.bookFlight);
router.get(`/:bookingDate`,validate(bookingValidation.getBookings),bookingController.getBookingsByDate);




module.exports = router;