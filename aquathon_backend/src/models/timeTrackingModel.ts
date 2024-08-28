import mongoose from 'mongoose'
//import { db } from '../configs/db'

export interface ITimeTracking {
  id: string
  startTime: Date
  endTime: Date
  timeInMs: BigInteger
}
export const timeTrackingSchema = new mongoose.Schema<ITimeTracking>({
  id: mongoose.Types.ObjectId,
  startTime: mongoose.SchemaTypes.Date,
  endTime: mongoose.SchemaTypes.Date,
  timeInMs: Number
})
