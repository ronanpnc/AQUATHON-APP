import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { connectDB } from './configs/db'
import router from './routes/api'
import { RaceHandler } from './sockets'

const port = process.env.NODE_PORT ?? 4000;
export const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(router)

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AQUATHON APP REST API',
      version: '1.0.0',
      description: ''
    }
  },
  apis: ['./src/models/*.ts', './src/routes/api/*.ts'] // files containing annotations as above
}

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsdoc(swaggerOptions))
)

// node server
export const server = createServer(app)
server.listen(port, () => {
  connectDB()
  console.log(`running on http://localhost:${port}`)
})

// socket io
const io = new Server(server, { cors: { origin: '*' } })
const onConenction = (socket: Socket) => {
  RaceHandler(io, socket)
}
io.on('connection', onConenction)
