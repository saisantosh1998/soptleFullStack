const mongoose = require("mongoose");
const flightSchema = mongoose.Schema(
  {
    flightId: {
      type: String,
      required: true,
      trim: true,
    },
    departureAirport: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalAirport: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalTime: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Flight = mongoose.model("Flight", flightSchema);
module.exports = { Flight };
