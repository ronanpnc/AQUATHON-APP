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
  participantId: string,
  timeRaceConfigId: string,
  startTime: Date
  endTime: Date
  timeInMs?: BigInteger
}
export const timeTrackingSchema = new mongoose.Schema<ITimeTracking>({
  participantId: {
    type: String,
    required: true
  },
  timeRaceConfigId: {
    type: String,
    required: true
  },
  startTime: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  endTime: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  timeInMs: {
    type: Number,
    required: true
  }
});
