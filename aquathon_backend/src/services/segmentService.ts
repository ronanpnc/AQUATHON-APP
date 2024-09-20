import mongoose from 'mongoose'
import { Race } from '../models/raceModel'
import { handleMongooseError } from '../utils/mongooseError'
import { ISegment } from '../models/segmentModel'

// Get all segments
export async function getAllSegments(
  raceId: string
): Promise<ISegment[]> {
  try {
    const segments = await Race.findOne({ _id: raceId })
    return segments.segments
  } catch (error) {
    throw handleMongooseError(error)
  }
}

export async function getParticipantSegment(
  raceId: string,
  segmentId: string
){
  const rId = new mongoose.Types.ObjectId(raceId)
  const sId = new mongoose.Types.ObjectId(segmentId)
  try {
    const result = await Race.aggregate([
      // Match the specific race
      { $match: { _id: rId } },
      { $match: { _id: rId } },
      { $unwind: {
        path :"$participants",
      }},
      {
        $project: {
          _id: '$participants._id',
          firstName: '$participants.firstName',
          lastName: '$participants.lastName',
          bib: '$participants.bib',
        }
      }
    ])
    return result;
  } catch (error) {
    throw handleMongooseError(error)
  }
}
