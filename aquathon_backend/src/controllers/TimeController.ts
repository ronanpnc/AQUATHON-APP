import { Request, Response } from 'express'

class TimeControllers {
  static async getTime(req: Request, res: Response) {
    const time = new Date()
    return res.status(200).send({ time: time, now: time.getTime()})
  }
  // Ms is millisecond
  static async getRaceMsCount(req: Request, res: Response) {
    const time = new Date()
    return res.status(200).send({ time: time, now: time.getTime()})
  }
}

export default TimeControllers
