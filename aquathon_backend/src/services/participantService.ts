import {IParticipant, Participant} from '../models/participantModel'
import {Race} from '../models/raceModel'
import {StatusError} from '../types/common'
import {handleMongooseError} from '../utils/mongooseError'

export const getParticipants =
    async (raceId: string) => {
  const data = await Race.find({_id : raceId}, {participants : 1})
                   .catch((error) => {throw new StatusError(error.message)})
  return data[0].participants;
}

// NOTE maybe for future work
export const getParticipantById =
    async (raceId: string, participantId: string) => {
  return {}
}

export const createParticipant =
    async (raceId: string, data: IParticipant) => {
  const race = await Race.findById(raceId)
  const newParticipant = new Participant(data)
  race.participants.push(newParticipant)
  race.save()
  const err = race.validateSync()
  if (err) {
    handleMongooseError(err)
  }
  return newParticipant
}

export const deleteParticipant =
    async (raceId: string, participantId: string) => {
  const race = await Race.findOneAndUpdate(
      {_id : raceId}, {$pull : {participants : {_id : participantId}}},
      {new : true, projection : {participants : 1}})
  race.save()
  const err = race.validateSync()
  if (err) {
    handleMongooseError(err)
  }
  return race
}

export const updateParticipant =
    async (raceId: string, participantId: string, data: IParticipant) => {
  try {
  const race = await Race.findOneAndUpdate(
    { _id:raceId,"participants._id": participantId },
    {
      $set: {
          'participants.$.firstName': data.firstName,
          'participants.$.lastName': data.lastName,
          'participants.$.bib': data.bib,
          'participants.$.dateOfBirth': data.dateOfBirth,
          'participants.$.school': data.school,
          'participants.$.colour': data.colour,
      }
    },
    {new: true}
  )
  const res = race.save();
  return res
  } catch (error) {
      throw new StatusError(error?.reason?.message, 500, error)
  }
}
