
import mongoose from "mongoose";
import { db } from "../configs/db";

interface IRace {
  name: string;
  startTime: Date,
}
const competitorSchema = new mongoose.Schema({
  name: String,
  startTime: Date,
},{timestamps:true});

export const Competitor = db.model<IRace>("Competitor", competitorSchema);
