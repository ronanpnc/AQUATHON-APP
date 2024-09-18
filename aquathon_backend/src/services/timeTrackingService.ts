import mongoose from 'mongoose'
import { Race } from '../models/raceModel'
import { handleMongooseError } from '../utils/mongooseError'

interface setTrackingProp {
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
  if (bib || participantId) {
    try {
      const result = await Race.aggregate([
        // Match the specific race
        { $match: { _id: rId } },
        {
          $unwind: {
            path: '$participants'
          }
        },
        {
          $project: {
            _id: '$participants._id',
            firstName: '$participants.firstName',
            lastName: '$participants.lastName',
            bib: '$participants.bib'
          }
        }
      ])

      return result
    } catch (error) {
      throw handleMongooseError(error)
    }
  } else {
    try {
      const result = await Race.aggregate([
        // Match the specific race
        { $match: { _id: rId } },
        {
          $unwind: {
            path: '$participants'
          }
        },
        {
          $project: {
            _id: '$participants._id',
            firstName: '$participants.firstName',
            lastName: '$participants.lastName',
            bib: '$participants.bib'
          }
        }
      ])

      return result
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
