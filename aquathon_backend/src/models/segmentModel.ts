import mongoose, { Document, Schema } from 'mongoose'
import { db } from '../configs/db'
/**
 * @swagger
 * components:
 *   schemas:
 *     TimeRaceConfig:
 *       type: object
 *       required:
 *         - _id
 *         - type
 *         - mode
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *           description: Unique identifier for the time race configuration.
 *         type:
 *           type: string
 *           description: The type of the time race configuration.
 *         mode:
 *           type: string
 *           description: The mode of the time race.
 *         timeTrack:
 *           type: string
 *           description: The track or path associated with the time race (optional).
 *       example:
 *         _id: "60d0fe4f5311236168a109ca"
 *         type: "sprint"
 *         mode: "competitive"
 *         timeTrack: []
 */

export interface ISegment extends Document {
  name?: string
  type: string
  totalCompleted: number
  timeTrackId?: string[]
  status?:string,
  isShareable?: boolean
  index?: number;
}

const SegmentSchema = new Schema<ISegment>({
  name: String,
  index : Number,
  type: {
    type: String,
    required: true
  },
  timeTrackId: [String],
  totalCompleted: Number,
  status: String,
  isShareable: mongoose.SchemaTypes.Boolean,
})

export const Segment = db.model('Segment', SegmentSchema)
export default SegmentSchema
