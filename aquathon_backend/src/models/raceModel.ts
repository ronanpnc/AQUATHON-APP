import mongoose from 'mongoose'
import { db } from '../configs/db'
import { IParticipant, participantSchema } from './participantModel'
import SegmentSchema, { ISegment } from './segmentModel'
import { ITimeTracking } from './timeTrackingModel'

export interface IRace {
    _id?: string
    title: string
    date: Date
    startTime: Date
    swimDistance: number
    runDistance: number
    participants?: IParticipant[]
    colours: string[]
    segmentsCompleted?: number
    timeTracking?: ITimeTracking[]
    segments: ISegment[]
    totalParticipants?: number
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
            required: true,
            enum: ['finished', 'upcoming', 'ongoing']
        },
        colours: [String],
        segmentsCompleted: Number,
        totalParticipants:Number,
        participants: [{ type: participantSchema ,ref:"Participant"}],
        segments: [SegmentSchema]
    },
    { timestamps: true, collection: 'races' }
)

export const Race = db.model('Race', raceSchema)

//raceSchema.pre<IRace>('save', async function ( next) {
//  const update = this.getUpdate();
//  console.log(update);
//
//  if (update && update.$set && update.$set['participants.$.bib']) {
//    const bib = update.$set['participants.$.bib'];
//    const participantId = update.$set['participants.$._id'];
//
//    const race = await mongoose.model('Race').findOne({
//      _id: this.getQuery()._id,
//      'participants.bib': bib,
//      'participants._id': { $ne: participantId } // Exclude the current participant from check
//    });
//
//    if (race) {
//      return next(new Error(`The bib '${bib}' is already in use by another participant.`));
//    }
//  }
//
//  next();
//});
// TODO : unique bib
//
//raceSchema.index({_id:1, 'participants.bib': 1},{unique : true})

/**
 * @swagger
 * components:
 *   schemas:
 *     Race:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The race ID.
 *           example: "5f8a3456b23c1234567890ab"
 *         title:
 *           type: string
 *           description: The race's name.
 *           example: Marathon
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of race.
 *           example: "2023-01-22T09:30:00Z"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the race.
 *           example: "2023-01-22T09:30:00Z"
 *         swimDistance:
 *           type: number
 *           description: Distance of swim in meters.
 *           example: 1000
 *         runDistance:
 *           type: number
 *           description: Distance of run in meters.
 *           example: 5000
 *         colours:
 *           type: array
 *           items:
 *             type: string
 *           description: List of colours for the participants.
 *           example: ["#FFFFFF", "#FF0000", "#00FF00"]
 *         splitTotal:
 *           type: number
 *           description: Total number of splits.
 *           example: 10
 *         splitCompleted:
 *           type: number
 *           description: Number of completed splits.
 *           example: 5
 *         timeTracking:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Split'
 *         participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/participant'
 *         timeRaceConfigs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeRaceConfig'
 *         status:
 *           type: string
 *           enum: [finished, upcoming, ongoing]
 *           description: Current status of the race.
 *           example: ongoing
 *   requestBodies:
 *     Race:
 *       type: object
 *       required:
 *         - title
 *         - date
 *         - swimDistance
 *         - runDistance
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: The race's name.
 *           example: Marathon
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of race.
 *           example: "2023-01-22T09:30:00Z"
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the race.
 *           example: "2023-01-22T09:30:00Z"
 *         swimDistance:
 *           type: number
 *           description: Distance of swim in meters.
 *           example: 1000
 *         runDistance:
 *           type: number
 *           description: Distance of run in meters.
 *           example: 5000
 *         colours:
 *           type: array
 *           items:
 *             type: string
 *           description: List of colours for the participants (optional).
 *           example: ["#FFFFFF", "#FF0000", "#00FF00"]
 *         timeRaceConfigs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TimeRaceConfig'
 *         status:
 *           type: string
 *           enum: [finished, upcoming, ongoing]
 *           description: Current status of the race.
 *           example: upcoming
 */
