import mongoose from 'mongoose'
import { ISplit, splitSchema } from './splitModel'
//import { db } from '../configs/db'

export interface IParticipant {
  bib: number
  firstName: string
  lastName: string
  colour: string
  dateOfBirth: Date
  school: string | null
  splits: ISplit[]
}
export const participantSchema = new mongoose.Schema<IParticipant>(
  {
    firstName: String,
    lastName: String,
    colour: String,
    dateOfBirth: mongoose.SchemaTypes.Date,
    school: String,
    splits: [splitSchema]
  },
  { timestamps: true }
)
