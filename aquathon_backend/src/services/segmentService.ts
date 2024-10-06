import mongoose from 'mongoose'

import { Race } from '../models/raceModel'
import { ISegment } from '../models/segmentModel'
import { handleMongooseError } from '../utils/mongooseError'
import { getUnassignedTrackTime } from './timeTrackingService'
import { IParticipant } from '../models/participantModel'
//NOTE: temporary added

export async function getAllSegments(raceId: string): Promise<ISegment[]> {
  try {
    const segments = await Race.findOne({ _id: raceId })
    return segments.segments
  } catch (error) {
    throw handleMongooseError(error)
  }
}

export async function getSegment(
  raceId: string,
  segmentId: string
): Promise<ISegment> {
  try {
    const segments = await Race.findOne({ _id: raceId })
    return segments.segments.find((seg) => seg.id === segmentId)
  } catch (error) {
    throw handleMongooseError(error)
  }
}

interface IParticipantWithTime extends Omit<IParticipant, 'timeTracking'> {
  stampTime: Date | null
}

// with different collection

export async function getParticipantsBySegment(
  raceId: string,
  segmentId: string
) {
  try {
    const race = await Race.findById(new mongoose.Types.ObjectId(raceId), {
      segments: 1,
      participants: 1
    }).lean()
    const index = 1;
    const targetSegment = race.segments[index]
    const previouseSegment: ISegment | null =
      index !== 0 ? race.segments[index - 1] : null
    const unassignedTime = await getUnassignedTrackTime(raceId, segmentId)

    if (previouseSegment) {
      const ValidParticipants = race.participants.filter(
        (elem) =>
          elem.timeTrackings[index - 1]?.segmentId == previouseSegment.id
      ) as IParticipantWithTime[]
      const result = ValidParticipants.map((elem) => ({
        ...elem,
        stampTime: elem.timeTrackings[index]?.stampTime || null
      }))
      return { participants: result, segment: targetSegment, unassignedTime }
    } else {
      const result = race.participants.map((elem) => ({
        ...elem,
        stampTime: elem.timeTrackings[index]?.stampTime || null
      }))
      return { participants: result, segment: targetSegment, unassignedTime }
    }
  } catch (error) {
    console.error('Error retrieving participants:', error)
    throw error
  }
}
export async function getParticipantJoinSegment(
  raceId: string,
  segmentId: string
) {
  console.log('Received raceId:', raceId)
  console.log('Received segmentId:', segmentId)

  try {
    // Convert IDs to ObjectId if necessary
    const raceObjectId = new mongoose.Types.ObjectId(raceId)
    const segmentObjectId = new mongoose.Types.ObjectId(segmentId)

    const result = await Race.aggregate([
      // Match the specific race
      { $match: { _id: raceObjectId } },

      // Unwind the participants array
      { $unwind: '$participants' },

      // Lookup timeTracking documents only for the desired segment
      {
        $lookup: {
          from: 'timeTrackings',
          let: {
            segmentId: segmentObjectId,
            participantId: '$participants._id'
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$segmentId', '$$segmentId'] },
                    { $eq: ['$participantId', '$$participantId'] }
                  ]
                }
              }
            },
            // Project only the stampTime field
            {
              $project: { stampTime: 1 }
            }
          ],
          as: 'timeTrackings'
        }
      },

      // Project the final shape
      {
        $project: {
          _id: { $toString: '$participants._id' },
          bib: '$participants.bib',
          firstName: '$participants.firstName',
          lastName: '$participants.lastName',
          colour: '$participants.colour',
          stampTime: { $arrayElemAt: ['$timeTrackings.stampTime', 0] } // Get only the first stampTime if it exists
        }
      },

      // Sort by bib number
      { $sort: { bib: 1 } }
    ])

    return result
  } catch (error) {
    console.error('Aggregation Error:', error)
  }
}
