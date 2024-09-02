import mongoose from 'mongoose'
//import { db } from '../configs/db'


/**
 * @swagger
 * components:
 *   schemas:
 *     timeTracking:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: time race id.
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
export interface ITimeTracking {
  id: string
  startTime: Date
  endTime: Date
  timeInMs: BigInteger
}
export const timeTrackingSchema = new mongoose.Schema<ITimeTracking>({
  id: mongoose.Types.ObjectId,
  startTime: mongoose.SchemaTypes.Date,
  endTime: mongoose.SchemaTypes.Date,
  timeInMs: Number
})
