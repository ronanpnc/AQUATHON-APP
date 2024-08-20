import mongoose from 'mongoose'
const db_url =
  process.env.NODE_ENV === 'development'
    ? process.env.NODE_MONGO_DB + process.env.NODE_DEV_DB + process.env.NODE_MONGO_DB_OPT
    : process.env.NODE_MONGO_DB + process.env.NODE_PROD_DB+ process.env.NODE_MONGO_DB_OPT
export const db = mongoose.createConnection(
    db_url
)

export function connectDB() {
  try {
    db.on('connected', () => {
      console.log(
        {
          status: true,
          msg: 'Mongoose default connection open to ' + 'here'
        },
        'service'
      )
    })

    // If the connection throws an error
    db.on('error', (err) => {
      console.log(
        { status: false, msg: 'handle mongo errored connections: ' + err },
        'service'
      )
      connectDB()
    })
    // When the connection is disconnected
    db.on('disconnected', () => {
      console.log(
        { status: false, msg: 'Mongoose default connection disconnected' },
        'service'
      )
    })

    process.on('SIGINT', () => {
      db.close(true)
      process.exit(0)
    })
  } catch (error) {
    console.log({ status: false, msg: error }, 'service')
  }
}
