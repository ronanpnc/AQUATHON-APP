import mongoose from 'mongoose'
import { ITimeTracking, timeTrackingSchema } from './timeTrackingModel'

export interface ISplit {
  segment: string
  timeTracking: ITimeTracking
  _id: string
}

export const splitSchema = new mongoose.Schema<ISplit>({
  segment: String,
  timeTracking: timeTrackingSchema,
  _id: mongoose.Types.ObjectId
})
