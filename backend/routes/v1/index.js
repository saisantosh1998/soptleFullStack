const express = require("express");
const userRoute = require("./user.route");
const flightRoute = require("./flight.route");
const bookingRoute = require("./booking.route");



const router = express.Router();

router.use('/user',userRoute);
router.use('/flight',flightRoute);
router.use('/booking',bookingRoute);





module.exports = router;
