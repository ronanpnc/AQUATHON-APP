import mongoose from "mongoose";

const timerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  timer_id: {
    type: String,
    required: true,
  },
  timer_start: {
    type: true,
    required: true,
  },
  timer_end: {
    type: true,
    required: true,
  },
  competitor_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Timer = mongoose.model("Timer", timerSchema);
module.exports = Timer;
