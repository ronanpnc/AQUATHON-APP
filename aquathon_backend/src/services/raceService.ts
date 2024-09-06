import { IRace, Race } from '../models/raceModel'
import { StatusError } from '../types/common'
import { Error } from 'mongoose'
import { handleMongooseError } from '../utils/mongooseError'

export const getRaces = async (limit: number = 2, page: number = 1) => {
  //
  const data = await Race.find(
    {},
    { participants: 0, timeRaceConfigs: 0, startTime: 0 }
  )
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 })
    .catch((error) => {
      throw new StatusError(error.message)
    })
  return data
}
export const getRace = async (id: string) => {
  const data = await Race.find({ _id: id }).catch((error) => {
    throw error
  })
  return data[0]
}

// delete the race with new obj
export const createRace = async (data: IRace) => {
  const new_race = new Race({
    startTime: null,
    status: 'upcoming',
    date: new Date(data.date),
    ...data
  })
  const res = await new_race.save().catch((error: Error) => {
    throw handleMongooseError(error)
  })
  return res
}

// update the race with corresponding id
export const updateRace = async (id: string, data: Partial<IRace>) => {
  const res = await Race.findOneAndUpdate({ _id: id }, data, {
    new: true
  }).catch((error: Error) => {
    throw handleMongooseError(error)
  })

  return res
}

// delete the race with corresponding id
export const deleteRace = async (id: string) => {
  const race = Race.find({ _id: id })
  const res = await race.deleteOne().catch((error) => {
    throw handleMongooseError(error)
  })
  return res
}
export const getRaceStartTime = async (id: string) => {
  const data = await Race.find({ _id: id })
    .select('startTime')
    .catch((error) => {
      throw handleMongooseError(error)
    })
  return data[0].startTime;
}


export const setRaceStartTime = async (
  id: string,
  status: 'start' | 'reset'
) => {
  const data = await Race.find({ _id: id })
    .select('startTime')
    .catch((error) => {
      throw error
    })
  if (status == 'start') {
    data[0].startTime = new Date()
  } else if (status == 'reset') {
    data[0].startTime = null
  }
  const res = await data[0].save().catch((error) => {
    throw handleMongooseError(error)
  })
  return res
}
