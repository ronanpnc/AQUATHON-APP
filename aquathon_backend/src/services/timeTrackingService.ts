import { handleMongooseError } from '../utils/mongooseError'
import { ITimeTracking, TimeTracking } from '../models/timeTrackingModel'
import { StatusError } from '../types/common'
import { Race } from '../models/raceModel'
import mongoose from 'mongoose'
interface setTrackingProp extends Partial<ITimeTracking> {
  _id?: string
}

export async function setTracking(data: setTrackingProp) {
  const now = new Date()
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await createTimeTracking(data.raceId, {
        segmentId: data.segmentId,
        participantId: data.participantId,
        stampTime: now
      })
      return timeTracking
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
export async function resetTracking(data: setTrackingProp) {
  const now = new Date()
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await deleteTimeTracking(data.raceId, {
        segmentId: data.segmentId,
        participantId: data.participantId,
        stampTime: now
      })
      return timeTracking
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
export const createTimeTracking = async (
  raceId: mongoose.Types.ObjectId,
  data: setTrackingProp
) => {
  try {
    // Step 1: Create new TimeTracking document
    await Race.findOneAndUpdate(
      {
        _id: raceId.toString()
      },
      {
        $addToSet: {
          'participants.$[arr].timeTrackings': {
            stampTime: data.stampTime,
            segmentId: data.segmentId
          }
        },
        $inc: {
          'segments.$[seg].totalCompleted': 1 // Increment by 1
        }
      },
      {
        new: true,
        arrayFilters: [
          { 'arr._id': data.participantId.toString() },
          { 'seg._id': data.segmentId.toString() }
        ]
      }
    )
    const res = data
    return res
  } catch (error) {
    throw new StatusError(
      'Failed to create time tracking and add reference',
      500,
      error
    )
  }
}


// reset
export const deleteTimeTracking = async (
  raceId: mongoose.Types.ObjectId,
  data: setTrackingProp
) => {
  try {
    // Step 1: Create new TimeTracking document
    await Race.findOneAndUpdate(
      {
        _id: raceId.toString(),
        "participants._id": data.participantId.toString(),
      },
      {
        $pull: {
          'participants.$.timeTrackings': {
            segmentId: data.segmentId
          }
        },
        $inc: {
          'segments.$[seg].totalCompleted': -1 // Increment by 1
        }
      } ,   {
        arrayFilters: [
          { 'seg._id': data.segmentId.toString() }
        ]
      }
    )
    const res = data
    return res
  } catch (error) {
    throw new StatusError(
      'Failed to create time tracking and add reference',
      500,
      error
    )
  }
}
export const createUnassignedTimeTracking = async (data: setTrackingProp) => {
  try {
    // Step 1: Create new TimeTracking document
    const timeTracking = new TimeTracking(data)
    const res = await timeTracking.save()
    return res
  } catch (error) {
    throw new StatusError(
      'Failed to create time tracking and add reference',
      500,
      error
    )
  }
}


export const assignTimeTracking = async (
  raceId: mongoose.Types.ObjectId,
  data: setTrackingProp
) => {
  try {
    // Step 1: Create new TimeTracking document
    await Race.findOneAndUpdate(
      {
        _id: raceId.toString()
      },
      {
        $pull: {
          'participants.$[arr].timeTrackings': {
            stampTime: data.stampTime,
            segmentId: data.segmentId
          }
        },
        $inc: {
          'segments.$[seg].totalCompleted': -1 // Increment by 1
        }
      },
      {
        new: true,
        arrayFilters: [
          { 'arr._id': data.participantId.toString() },
          { 'seg._id': data.segmentId.toString() }
        ]
      }
    )
    const res = data
    return res
  } catch (error) {
    throw new StatusError(
      'Failed to create time tracking and add reference',
      500,
      error
    )
  }
}
