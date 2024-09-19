import mongoose from 'mongoose'
import { Race } from '../models/raceModel'
import { handleMongooseError } from '../utils/mongooseError'

export interface setTrackingProp {
  raceId: string
  segmentId: string
  participantId: string
  bib?: string
}

export async function setTracking({
  raceId,
  segmentId,
  participantId,
  bib
}: setTrackingProp) {
  const now = new Date();
  if (bib || participantId) {
    try {
      const result = await Race.updateOne(
        { _id: raceId },
        {
          $push: {
            timeTracking: {
              segmentId: segmentId,
              participantId: participantId,
              stampTime: now,
              bib: bib
            }
          }
        }
      )
      return result
    } catch (error) {
      throw handleMongooseError(error)
    }
  } else {
    try {
      const result = await Race.aggregate([
        // Match the specific race
        { $match: { _id: new mongoose.Types.ObjectId(raceId) } },
        { $unwind: '$timeTraking' },
      ])

      return result
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
