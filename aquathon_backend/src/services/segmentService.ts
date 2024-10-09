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
  previouseTime:Date | null
}


// with different collection

export async function getParticipantsBySegment(
  raceId: string,
  segmentId: string
) {
  try {
   const result = await Race.aggregate<IParticipantWithTime>([
      // Match the specific race
      { $match: { _id: new mongoose.Types.ObjectId(raceId) } },
      // Unwind participants array
      { $unwind: '$participants' },
      // Project the desired fields and extract stampTime for the specific segment
      {
        $project: {
          _id: { $toString: '$participants._id' },
          bib: '$participants.bib',
          firstName: '$participants.firstName',
          lastName: '$participants.lastName',
          colour: '$participants.colour',
          stampTime: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$participants.timeTrackings',
                  as: 'tracking',
                  cond: {
                    $eq: [
                      '$$tracking.segmentId',
                      new mongoose.Types.ObjectId(segmentId)
                    ]
                  }
                }
              },
              0
            ]
          }
        }
      },
      {
        $project: {
          _id: 1,
          bib: 1,
          firstName: 1,
          lastName: 1,
          colour: 1,
          stampTime: '$stampTime.stampTime', // Extract the actual timestamp value
          previouseTime: 1,
        }
      },
      { $sort : { bib: 1} }
      // Extract totalCompleted from the filtered segment object
    ])
    //NOTE: add 2 temporary added
    const segment = await getSegment(raceId, segmentId);
    const unassignedTime = await getUnassignedTrackTime(raceId, segmentId);
    return { participants:result,segment, unassignedTime}
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
