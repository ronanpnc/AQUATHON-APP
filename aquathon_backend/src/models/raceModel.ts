import mongoose from "mongoose";
import { db } from "../configs/db";

interface IRace {
  name: string;
  startTime:Date;
}
const raceSchema = new mongoose.Schema({
  name: String,
  startTime: mongoose.SchemaTypes.Date,
},{timestamps:true, collection:"races"});

export const Race = db.model<IRace>("Race", raceSchema);
