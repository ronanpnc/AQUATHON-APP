import mongoose from 'mongoose'
import { db } from '../configs/db'
import { IParticipant, participantSchema } from './participantModel'

interface IRace {
  _id: string
  title: string
  time: Date
  startTime: Date
  particpants: IParticipant[]
  status: 'finished' | 'upcoming' | 'ongoing'
}
const raceSchema = new mongoose.Schema<IRace>(
  {
    _id: mongoose.Types.ObjectId,
    title: String,
    startTime: mongoose.SchemaTypes.Date,
    time: mongoose.SchemaTypes.Date,
    status: String,
    particpants: [participantSchema]
  },
  { timestamps: true, collection: 'races' }
)

export const Race = db.model('Race', raceSchema)
