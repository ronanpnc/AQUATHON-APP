import mongoose from 'mongoose'
import { IParticipant } from '../models/participantModel'
import { Race } from '../models/raceModel'
import { StatusError } from '../types/common'
import { handleMongooseError } from '../utils/mongooseError'

export const getParticipants = async (raceId: string) => {
  try {
    const data = await Race.find({ _id: raceId }, { participants: 1 })
    if (!data || data.length === 0) {
      throw new StatusError('Race not found', 404)
    }
    return data[0].participants
  } catch (error) {
    if (error instanceof StatusError) {
      throw error
    }
    throw new StatusError(error.message, 500)
  }
}

export const getParticipantById = async (
  raceId: string,
  participantId: string
) => {
  try {
    const race = await Race.findOne(
      { _id: raceId, 'participants._id': participantId },
      { 'participants.$': 1 }
    )

    if (!race) {
      throw new StatusError('Race or participant not found', 404)
    }

    const participant = race.participants[0]
    if (!participant) {
      throw new StatusError('Participant not found', 404)
    }

    return participant
  } catch (error) {
    if (error instanceof StatusError) {
      throw error
    }
    throw new StatusError(error.message, 500)
  }
}

export const createParticipant = async (raceId: string, data: IParticipant) => {
  try {
    const result = await Race.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(raceId),
        'participants.bib': { $ne: data.bib }
      },
      {
        $push: { participants: data },
        $inc: { totalParticipants: 1 }
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!result) {
      throw new StatusError(
        'Race not found or participant with this bib number already exists',
        400
      )
    }

    return result.participants[result.participants.length - 1]
  } catch (error) {
    if (error instanceof StatusError) throw error
    throw handleMongooseError(error)
  }
}

export const deleteParticipant = async (
  raceId: string,
  participantId: string
) => {
  try {
    const result = await Race.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(raceId) },
      {
        $pull: {
          participants: { _id: new mongoose.Types.ObjectId(participantId) }
        },
        $inc: { totalParticipants: -1 }
      },
      {
        new: true,
        projection: { totalParticipants: 1 }
      }
    )

    if (!result) {
      throw new StatusError('Race or participant not found', 404)
    }

    return {
      message: 'Participant deleted successfully',
      totalParticipants: result.totalParticipants
    }
  } catch (error) {
    if (error instanceof StatusError) throw error
    throw handleMongooseError(error)
  }
}

export const updateParticipant = async (
  raceId: string,
  participantId: string,
  data: Partial<IParticipant>
) => {
  try {
    const result = await Race.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(raceId),
        participants: {
          $elemMatch: {
            _id: new mongoose.Types.ObjectId(participantId),
            "participants.bib": { $ne: data.bib },
          },
        }
      },
      {
        $set: {
          'participants.$.firstName': data.firstName,
          'participants.$.lastName': data.lastName,
          'participants.$.bib': data.bib,
          'participants.$.dateOfBirth': data.dateOfBirth,
          'participants.$.school': data.school,
          'participants.$.colour': data.colour,
          'participants.$.gender': data.gender
        }
      },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!result) {
      throw new StatusError(
        'Race or participant not found, or bib number already in use',
        400
      )
    }

    return result.participants[0]
  } catch (error) {
    if (error instanceof StatusError) throw error
    throw handleMongooseError(error)
  }
}
