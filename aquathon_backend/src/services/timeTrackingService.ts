import { handleMongooseError } from '../utils/mongooseError'
import { ITimeTracking, TimeTracking } from '../models/timeTrackingModel'
import { StatusError } from '../types/common'
interface setTrackingProp extends ITimeTracking {
  _id: string
}

export async function setTracking(data: setTrackingProp) {
  const now = new Date()
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await createTimeTracking({
        raceId: data.raceId,
        stampTime: now,
        ...data
      })
      return timeTracking
    } catch (error) {
      throw handleMongooseError(error)
    }
  } else {
  }
}

export const createTimeTracking = async (data: setTrackingProp)=> {

  try {
    // Step 1: Create new TimeTracking document
    const  timeTracking  = new TimeTracking(data);
    console.log(timeTracking);
    const res = await timeTracking.save();
    return res;
  } catch (error) {
    console.log(error)
    throw new StatusError('Failed to create time tracking and add reference', 500, error);
  }
};
