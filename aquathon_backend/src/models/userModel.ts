import mongoose from "mongoose";
import { db } from "../configs/db";

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_age: {
      type: Number,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_password: {
      type: String,
      required: true,
    },
  },
  { collection: "user" },
);
export const User = db.model("user", userSchema);
