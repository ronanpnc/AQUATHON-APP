import mongoose from "mongoose";
import { db } from "../configs/db";

interface IRace {
  name: string;
  startTime:Date;
  status: "finished" | "upcoming" | "ongoing";
}
const raceSchema = new mongoose.Schema<IRace>({
  name: String,
  startTime: mongoose.SchemaTypes.Date,
  status:String,
},{timestamps:true, collection:"races"});

export const Race = db.model("Race", raceSchema);
