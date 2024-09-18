import mongoose from 'mongoose'
import { Race } from '../models/raceModel'
import { handleMongooseError } from '../utils/mongooseError'

interface setTrackingProp {
    raceId: string;
    segmentId:string;
    participantId:string;
    bib?:string;
}

export async function setTracking({
  raceId,
  segmentId,
  participantId,
  ...props,
}: setTrackingProp){
  const rId = new mongoose.Types.ObjectId(raceId)
  //const rId = new mongoose.Types.ObjectId("66e27103a16ff49d062c1194")
  const sId = new mongoose.Types.ObjectId(segmentId)

  try {
    const result = await Race.aggregate([
      // Match the specific race
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

    return result
  } catch (error) {
    throw handleMongooseError(error)
  }
}
