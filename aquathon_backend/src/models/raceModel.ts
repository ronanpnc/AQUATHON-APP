import mongoose from 'mongoose'
import { db } from '../configs/db'
import { IParticipant, participantSchema } from './participantModel'
import timeRaceConfigSchema, { ITimeRaceConfig } from './timeTrackConfigModel'

interface IRace {
  _id: string
  title: string
  time: Date
  startTime: Date
  swimDistance: number
  runDistance: number
  particpants?: IParticipant[]
  timeRaceConfigs: ITimeRaceConfig[]
  status: 'finished' | 'upcoming' | 'ongoing'
}
const raceSchema = new mongoose.Schema<IRace>(
  {
    _id: mongoose.Types.ObjectId,
    title: {
      type: String,
      required: true
    },
    swimDistance: {
      type: Number,
      required: true
    },
    runDistance: {
      type: Number,
      required: true
    },
    startTime: {
      type: mongoose.SchemaTypes.Date,
      required: true
    },
    time: {
      type: mongoose.SchemaTypes.Date,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    particpants: [participantSchema],
    timeRaceConfigs: [timeRaceConfigSchema]
  },
  { timestamps: true, collection: 'races' }
)

export const Race = db.model('Race', raceSchema)
