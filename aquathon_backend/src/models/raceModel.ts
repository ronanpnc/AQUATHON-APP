import mongoose from 'mongoose'
import { db } from '../configs/db'
import { IParticipant, participantSchema } from './participantModel'
import timeRaceConfigSchema, { ITimeRaceConfig } from './timeTrackConfigModel'
/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       properties:
 *         _id:
 *           type: integer
 *           description: The ID.
 *           example: 0
 *         title:
 *           type: string
 *           description: The race's name.
 *           example: Marathon
 *         date:
 *           type: Date
 *           description: date of race.
 *           example: 2015-01-22 9:30
 *         startTime:
 *           type: Date
 *           description: start time of the race.
 *           example: 2015-01-22 9:30
 *         swimDistance:
 *           type: integer
 *           description: distance of swim
 *           example: 10
 *         colours:
 *           type: array
 *           description: list of colours for the participants
 *           example: ["#FFFFF"]
 *         runDistance:
 *           type: integer
 *           description: distance of run
 *           example: 20
 *         participants:
 *          type: array
 *          items:
 *              $ref : '#/components/schemas/participant'
 *         timeRaceConfigs:
 *          type: array
 *          items:
 *              $ref : '#/components/schemas/TimeRaceConfig'
 *   requestBodies:
 *     Race:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The race's name.
 *           example: Marathon
 *         date:
 *           type: Date
 *           description: date of race.
 *           example: 2015-01-22 9:30
 *         startTime:
 *           type: Date
 *           description: start time of the race.
 *           example: 2015-01-22 9:30
 *         swimDistance:
 *           type: integer
 *           description: distance of swim
 *           example: 10
 *         runDistance:
 *           type: integer
 *           description: distance of run
 *           example: 20
 *         colours:
 *           type: array
 *           description: list of colours for the participants (optional)
 *           example: ["#FFFFFF"]
 *         timeRaceConfigs:
 *          type: array
 *          items:
 *              $ref : '#/components/schemas/TimeRaceConfig'
 *
 */
export interface IRace {
    _id?: string
    title: string
    date: Date
    startTime: Date
    swimDistance: number
    runDistance: number
    participants?: IParticipant[]
    colours:string[],
    timeRaceConfigs: ITimeRaceConfig[]
    status: 'finished' | 'upcoming' | 'ongoing'
}
const raceSchema = new mongoose.Schema<IRace>(
    {
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
        },
        date: {
            type: mongoose.SchemaTypes.Date,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        colours:[String],
        participants: [participantSchema],
        timeRaceConfigs: [timeRaceConfigSchema]
    },
    { timestamps: true, collection: 'races' }
)

export const Race = db.model('Race', raceSchema)
