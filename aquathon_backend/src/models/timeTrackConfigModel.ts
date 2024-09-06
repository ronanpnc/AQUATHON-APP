import  mongoose, { Document, Schema } from 'mongoose'
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


export interface ITimeRaceConfig extends Document {
  type: string
  mode: string
  timeTrackId: string[]
}
const timeRaceConfigSchema = new Schema<ITimeRaceConfig>(
  {
    type: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    timeTrackId: [
        String
    ],
  },
)
export const TimeRaceConfig = db.model("TimeRaceConfig", timeRaceConfigSchema)
export default timeRaceConfigSchema
