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

export const getParticipantById = async (raceId: string, participantId: string) => {
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
    const result = await Race.updateOne(
      {
        _id: raceId,
        'participants.bib': { $ne: data.bib }
      },
      { $push: { participants: data } },
      { runValidators: true }
    );

    if (result.matchedCount === 0) {
      throw new StatusError('Race not found', 404);
    }

    if (result.modifiedCount === 0) {
      throw new StatusError('Participant with this bib number already exists', 400);
    }

    return data;  // Return the newly added participant data
  } catch (error) {
    if (error instanceof StatusError) {
      throw error;
    }
    throw handleMongooseError(error);
  }
};

export const deleteParticipant = async (raceId: string, participantId: string) => {
  try {
    const race = await Race.findOneAndUpdate(
      { _id: raceId },
      { $pull: { participants: { _id: participantId } } },
      { new: true, projection: { participants: 1 } }
    )
    if (!race) {
      throw new StatusError('Race or participant not found', 404)
    }
    await race.save()
    return race
  } catch (error) {
    if (error instanceof StatusError) {
      throw error
    }
    throw handleMongooseError(error)
  }
}

export const updateParticipant = async (raceId: string, participantId: string, data: IParticipant) => {
  try {
    const race = await Race.findOneAndUpdate(
      { _id: raceId, "participants._id": participantId },
      {
        $set: {
          'participants.$.firstName': data.firstName,
          'participants.$.lastName': data.lastName,
          'participants.$.bib': data.bib,
          'participants.$.dateOfBirth': data.dateOfBirth,
          'participants.$.school': data.school,
          'participants.$.colour': data.colour,
          'participants.$.gender': data.gender,
        }
      },
      { new: true }
    )
    if (!race) {
      throw new StatusError('Race or participant not found', 404)
    }
    return race
  } catch (error) {
    if (error instanceof StatusError) {
      throw error
    }
    throw new StatusError(error?.reason?.message || 'Update failed', 500, error)
  }
}
