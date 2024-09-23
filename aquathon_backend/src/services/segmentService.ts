import mongoose from 'mongoose'

import { Race } from '../models/raceModel'
import { ISegment } from '../models/segmentModel'
import { handleMongooseError } from '../utils/mongooseError'

// Get all segments
export async function getAllSegments(raceId: string): Promise<ISegment[]> {
  try {
    const segments = await Race.findOne({ _id: raceId })
    return segments.segments
  } catch (error) {
    throw handleMongooseError(error)
  }
}

export async function getParticipantSegment(raceId: string, segmentId: string) {
  try {
    const result = await Race.aggregate([
      // Match the specific race
      { $match: { _id: new mongoose.Types.ObjectId(raceId) } },

      // Unwind the participants array
      { $unwind: '$participants' },

      // Lookup timeTracking documents
      {
        $lookup: {
          from: 'timeTrackings', // Make sure this matches your actual collection name
          localField: 'participants.timeTrackings',
          foreignField:'_id',
          as: 'timeTrackings'
        }
      },

      // Project the final shape
      {
        $project: {
          _id : { $toString: '$participants._id' },
          bib: '$participants.bib',
          firstName: '$participants.firstName',
          lastName: '$participants.lastName',
          colour: '$participants.colour',
          TimeTracking: '$timeTrackings',
        }
      },

      // Sort by bib number
      { $sort: { bib: 1 } }
    ]);

    return result;
  } catch (error) {
    throw handleMongooseError(error);
  }
}
