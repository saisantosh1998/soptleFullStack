const mongoose = require("mongoose");
const seatSchema = mongoose.Schema(
  {
    flightId: {
      type: String,
      required: true,
      trim: true,
    },
    seatNo: {
      type: Number,
      required: true,
    },
    availability:{
      type: String,
      enum: ['available', 'not available'],
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Seat = mongoose.model("Seat", seatSchema);
module.exports = { Seat };
