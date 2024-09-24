import { IRace, Race } from '../models/raceModel'
import { StatusError } from '../types/common'
import { Error } from 'mongoose'
import { handleMongooseError } from '../utils/mongooseError'

export const getRaces = async (limit: number = 2, page: number = 1) => {
  const data = await Race.find(
    {},
    { participants: 0 }
  )
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 })
    .catch((error) => {
      throw new StatusError(error.message)
    })
  return data
}
export const getRacesGroupy = async (limit = 2, page = 1) => {
  const races = await Race.aggregate([
    {
      $sort: { date: 1, startTime: 1 }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
        races: {
          $push: {
            _id: '$_id',
            title: '$title',
            startTime: '$startTime',
            date: '$date',
            status: '$status',
            location: '$location',
            totatParticipants: '$totalParticipants'
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $skip: (page - 1) * limit || 0
    },
    {
      $limit: limit || 3
    }
  ]).catch((error: Error) => {
    throw handleMongooseError(error)
  })
  return races
}
// NOTE: need more work in the future where you can select field from client
export const getRace = async (id: string): Promise<IRace | null> => {
  try {
    const query = Race.findById(id).select({participants : 0, timeTracking: 0});

    const race = await query.exec();

    if (!race) {
      // If no race is found, return null instead of throwing an error
      return null;
    }

    return race;
  } catch (error) {
    throw handleMongooseError(error);
  }
};

// delete the race with new obj
export const createRace = async (data: IRace) => {
  const new_race = new Race({
    ...data,
    startTime: null,
    status: 'upcoming',
    totalParticipants: 0,
    segmentsCompleted: 0,
    date: new Date(data.date),
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
  return data[0].startTime
}

export const setRaceStartTime = async (
  id: string,
  status: 'start' | 'reset'
) => {
  try {
    const result = await Race.find({ _id: id }).select([
      'status',
      'startTime',
      'participants',
      'segments',
      'timeTracking'
    ])
    const data = result[0]
    if (status == 'start') {
      data.startTime = new Date()
      data.status = 'ongoing'
    } else if (status == 'reset') {
      data.startTime = null
      data.status = 'upcoming'
      data.segments.map(item => item.totalCompleted = 0)
      data.participants.map(item => item.timeTrackings=[])
      data.timeTracking = []
    }
    const res = await data.save()
    return res
  } catch (error) {
    return handleMongooseError(error)
  }
}


