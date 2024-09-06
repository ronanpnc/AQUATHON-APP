import { IRace, Race } from '../models/raceModel'

export const getRaces = async (limit:number = 2, page: number = 1) => {
  //
  const data = await Race
  .find({},{participants:0, timeRaceConfigs:0, startTime:0})
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({"updatedAt": -1})
  .catch((error) => {
    throw error
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
export const createRace = async (data:IRace) => {
  const new_race = new Race({
      startTime:null,
      status:"upcoming",
      date: new Date(data.date),
      ...data,
  })
  const res = await new_race.save().catch((error) => {
    throw error
  })
  return res
}

// update the race with corresponding id
export const updateRace = async (id: string, data:Partial<IRace>) => {
  const res = await Race.findOneAndUpdate({ _id: id },data, { new: true })
  return res
}

// delete the race with corresponding id
export const deleteRace = async (id: string) => {
  const race = Race.find({ _id: id })
  const res = await race.deleteOne().catch((error) => {
    throw error
  })
  return res
}
export const getRaceStartTime = async (id: string) => {
  const data = await Race.find({ _id: id })
    .select('startTime')
    .catch((error) => {
      throw error
    })
  return data[0]
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
    throw error
  })
  return res
}
