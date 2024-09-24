import mongoose from 'mongoose';
import { Race } from './raceModel';
import { db } from '../configs/db';
import { timeStamp } from 'console';

export interface ITimeTracking {
  raceId: mongoose.Types.ObjectId;
  participantId: mongoose.Types.ObjectId | null;
  bib: number | null;
  segmentId: mongoose.Types.ObjectId;
  stampTime: Date;
  timeInMs?: number; // Changed from BigInteger to number for MongoDB compatibility
}

export const timeTrackingSchema = new mongoose.Schema<ITimeTracking>(
  {
    raceId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      index: true // Add index for better query performance
    },
    participantId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      index: true // Add index for better query performance
    },
    bib: Number,
    segmentId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    stampTime: {
      type: Date,
      required: true
    },
    timeInMs: {
      type: Number
    }
  },
  { timestamps: true, collection: 'timeTrackings' }
);

// Pre-save hook to check if the race and participant exist
timeTrackingSchema.pre('save', async function(next) {
  try {
    const race = await Race.findOne({
      _id: this.raceId,
      'participants._id': this.participantId
    }).select('_id').lean().exec();

    if (!race) {
      throw new Error('Race or participant not found');
    }
    next();
  } catch (error) {
    next(error);
  }
});


// NOTE need more research

//// Post-save hook to update the Race document
//timeTrackingSchema.post('save', async function(doc, next) {
//  try {
//    if(doc.bib) return;
//    const updatedRace = await Race.findOneAndUpdate(
//      {
//        _id: doc.raceId,
//        'participants._id': doc.participantId
//      },
//      {
//        $addToSet: {
//          'participants.$.timeTrackings': {
//              segmentId: doc.segmentId,
//              stampTime: doc.stampTime,
//              timeTracking: doc.id,
//          },
//        },
//        $inc: {"segmentsCompleted": 1},
//      },
//      { new: true, lean: true }
//    );
//
//    if (!updatedRace) {
//      throw new Error('Failed to update Race document');
//    }
//
//    next();
//  } catch (error) {
//    console.error('Error in post-save hook:', error);
//    await TimeTracking.findByIdAndDelete(doc._id).catch(deleteError => {
//      console.error('Error deleting TimeTracking document:', deleteError);
//    });
//    next(error);
//  }
//});

export const TimeTracking = db.model<ITimeTracking>('TimeTracking', timeTrackingSchema);

