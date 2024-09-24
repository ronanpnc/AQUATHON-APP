import mongoose from 'mongoose';
import { Race } from "../../models/raceModel";

async function migrateRaceSegments() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.NODE_MONGODB || 'mongodb://localhost:27017/your_database_name');
    console.log('Connected to MongoDB');

    // Perform the update
    const result = await Race.updateMany(
      {}, // Match all documents
      [
        {
          $set: {
            segments: {
              $cond: {
                if: { $isArray: "$timeRaceConfigs" },
                then: "$timeRaceConfigs",
                else: []
              }
            }
          }
        }
      ]
    );

    console.log(`Migration completed. ${result.modifiedCount} documents updated.`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateRaceSegments().catch(console.error);
