import { connect, disconnect } from 'mongoose';
import { Race } from "./dist/models/raceModel.js"

async function migrateRaceSegments() {
  try {
    // Connect to MongoDB
    await connect(process.env.NODE_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
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
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateRaceSegments().catch(console.error);
