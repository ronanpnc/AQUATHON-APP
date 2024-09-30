import { handleMongooseError } from '../utils/mongooseError'
import { ITimeTracking, TimeTracking } from '../models/timeTrackingModel'
import { StatusError } from '../types/common'
import { Race } from '../models/raceModel'
import mongoose from 'mongoose'
export interface setTrackingProp extends Partial<ITimeTracking> {
  _id?: string
  status?: string
  stampId?: string
}

export async function setTracking(data: setTrackingProp) {
  const now = new Date()
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await createTimeTracking(data.raceId, {
        segmentId: data.segmentId,
        participantId: data.participantId,
        stampTime: data.stampTime || now
      })
      return { ...timeTracking, bib: data.bib }
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
export async function assignTracking(data: setTrackingProp) {
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await setTracking(data)
      await deleteOneUnassignedTimeTracking({raceId: data.raceId, segmentId: data.segmentId, stampId: data.stampId});
      return { ...timeTracking, bib: data.bib }
    } catch (error) {
      throw handleMongooseError(error)
    }
  }
}
export async function resetTracking(data: setTrackingProp) {
  if (data.bib || data.participantId) {
    try {
      const timeTracking = await deleteTimeTrackings(data.raceId, {
        segmentId: data.segmentId,
        participantId: data.participantId,
        stampTime: null
      })
      return { ...timeTracking, bib: data.bib, status: 'reset' }
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

export const deleteOneUnassignedTimeTracking = async (
  data: setTrackingProp
) => {
  try {
    // Step 1: Create new TimeTracking document
    await TimeTracking.deleteOne({
      _id: data.stampId.toString(),
      segmentId: data.segmentId.toString(),
      raceId: data.raceId.toString()
    })
    const res = { ...data, status: 'delete' ,stampId: data.stampId}
    return res
  } catch (error) {
    throw new StatusError(
      'Failed to delete unassigned track time',
      500,
      error
    )
  }
}
// reset
export const deleteTimeTrackings = async (
  raceId: mongoose.Types.ObjectId,
  data: setTrackingProp
) => {
  try {
    // Step 1: Create new TimeTracking document
    await Race.findOneAndUpdate(
      {
        _id: raceId.toString(),
        'participants._id': data.participantId.toString()
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
      },
      {
        arrayFilters: [{ 'seg._id': data.segmentId.toString() }]
      }
    )
    const res = { ...data, stampTime: null }
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
    const timeTracking = new TimeTracking({
      ...data,
      stampTime: new Date()
    })
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

export const assignTimeTracking = async (data: setTrackingProp) => {
  try {
    // Step 1: Create new TimeTracking document
    await Race.findOneAndUpdate(
      {
        _id: data.raceId.toString()
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

export const getUnassignedTrackTime = async (
  raceId: string,
  segmentId: string
) => {
  try {
    // Step 1: Create new TimeTracking document
    const data = await TimeTracking.aggregate([
      {
        $match: {
          raceId: new mongoose.Types.ObjectId(raceId),
          segmentId: new mongoose.Types.ObjectId(segmentId)
        }
      },
      {
        $project: {
          stampTime: 1,
          stampId: '$_id', // Rename _id to stampId
          _id: 0 // Exclude the original _id field
        }
      }
    ])
    return data
  } catch (error) {
    throw new StatusError(
      'Failed to create time tracking and add reference',
      500,
      error
    )
  }
}
