import mongoose from 'mongoose'
import { ITimeTracking, timeTrackingSchema } from './timeTrackingModel'

/**
 * @swagger
 * components:
 *   schemas:
 *     split:
 *       type: object
 *       properties:
 *         segment:
 *           type: string
 *           description: race segment;
 *           example: "swim"
 *         timeTracking:
 *           type: string
 *           description: The participant's first name.
 *           example: Jon
 *         _id:
 *           type: string
 *           description: The ID of spit.
 *           example: Jon
 *
 */
export interface ISplit {
  segment: string
  timeTracking: ITimeTracking
  _id: string
}

export const splitSchema = new mongoose.Schema<ISplit>({
  segment: String,
  timeTracking: timeTrackingSchema,
  _id: mongoose.Types.ObjectId
})
