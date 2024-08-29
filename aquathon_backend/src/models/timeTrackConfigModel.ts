import { Document, Schema } from 'mongoose'

// Step mongooe1: Define the Interface
export interface ITimeRaceConfig extends Document {
  type: string
  mode: string
  timeTrack: string
}

// Step 2: Define the Schema
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
    timeTrack: {
      type: String,
      required: true
    }
  },
  { timestamps: true, collection: 'timeConfigs' }
)

// Step 3: Define and Export the Model
export default timeRaceConfigSchema
