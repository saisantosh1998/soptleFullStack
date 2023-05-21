const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    flightId: {
      type: String,
      required: true,
      trim: true,
    },
    bookedSeats: {
      type: [Number],
      required: true,
    },
    bookingDate:{
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };
