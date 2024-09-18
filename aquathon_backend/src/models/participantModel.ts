import mongoose from 'mongoose'
import segmentSchema, { ISegment } from './segmentModel'
//import { db } from '../configs/db'

/**
 * @swagger
 * components:
 *   schemas:
 *     participant:
 *       type: object
 *       required:
 *         - bib
 *         - firstName
 *         - lastName
 *         - dateOfBirth
 *       properties:
 *         bib:
 *           type: integer
 *           description: Unique participant race ID.
 *           example: 42
 *         firstName:
 *           type: string
 *           description: The participant's first name.
 *           example: John
 *         lastName:
 *           type: string
 *           description: The participant's last name.
 *           example: Doe
 *         colour:
 *           type: string
 *           description: The participant's race colour.
 *           example: Blue
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: The participant's date of birth.
 *           example: "1990-01-01"
 *         school:
 *           type: string
 *           description: The participant's school.
 *           example: "Springfield High"
 *           nullable: true
 *         splits:
 *           type: string
 *         gender:
 *           type: enum[""
 *           description: sex of the pala
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the participant was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the participant was last updated.
 */
export interface IParticipant {
  bib: number
  gender: "male"|"female"
  firstName: string
  lastName: string
  colour?: string
  dateOfBirth: Date
  school: string | null
  segments?: ISegment[]
}
export const participantSchema = new mongoose.Schema<IParticipant>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    bib: {
      type: Number,
      required: [true, 'Bib number is required'],
    },
    colour: String,
    gender: {
      type: mongoose.SchemaTypes.String,
      required: [true, 'gender is required']
    },
    dateOfBirth: {
      type: mongoose.SchemaTypes.Date,
      required: [true, 'Date of birth is required']
    },
    school: String,
    segments: [segmentSchema]
  },
  { timestamps: true }
);

export const Participant = mongoose.model('Participant', participantSchema);
