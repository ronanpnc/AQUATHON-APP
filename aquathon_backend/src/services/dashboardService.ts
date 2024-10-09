import mongoose from 'mongoose'
import { IParticipant, ITimeTrackingsEmbbed } from '../models/participantModel'
import { Race } from '../models/raceModel'


export const dashboardProcess = async (raceId: string) => {
  console.log(raceId, 'nice')
  const race = await Race.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(raceId) } },
    { $unwind: '$participants' },
    {
      $addFields: {
        'participants.lastCheckpoint': {
          $arrayElemAt: ['$participants.timeTrackings', -1]
        },
        'participants.segmentCount': { $size: '$participants.timeTrackings' }
      }
    },
    {
      $sort: {
        'participants.segmentCount': -1,
        'participants.lastCheckpoint.stampTime': 1
      }
    },
    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        status: { $first: '$status' },
        segments: { $first: '$segments' },
        startTime: { $first: '$startTime' },
        leaderboard: {
          $push: {
            firstName: '$participants.firstName',
            lastName: '$participants.lastName',
            bib: '$participants.bib',
            colour: '$participants.colour',
            gender: '$participants.gender',
            school: '$participants.school',
            timeTrackings: '$participants.timeTrackings',
            segmentCount: '$participants.checkpointCount'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        title: 1,
        status: 1,
        segments: 1,
        startTime: 1,
        leaderboard: 1
      }
    }
  ])
  return race[0];
}
