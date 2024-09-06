import mongoose from 'mongoose'
import { ISplit, splitSchema } from './splitModel'
//import { db } from '../configs/db'

/**
 * @swagger
 * components:
 *   schemas:
 *     participant:
 *       type: object
 *       properties:
 *         bib:
 *           type: integer
 *           description: participant race id.
 *           example: 0
 *         firstName:
 *           type: string
 *           description: The participant's first name.
 *           example: Jon
 *         lastName:
 *           type: string
 *           description: The participant's last name.
 *           example: Jon
 *         colour:
 *           type: string
 *           description: The participant's race colour.
 *           example: Jon
 */
export interface IParticipant {
  bib: number
  firstName: string
  lastName: string
  colour?: string
  dateOfBirth: Date
  school: string | null
  splits?: ISplit[]
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

export const Participant = mongoose.model('Participant', participantSchema);
