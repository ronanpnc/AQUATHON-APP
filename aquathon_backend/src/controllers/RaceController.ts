import { Request, Response } from 'express'
import {
  createRace,
  deleteRace,
  getRace,
  getRaces,
  getRacesGroupy,
  getRaceStartTime,
  updateRace
} from '../services/raceService'
import { IRace } from '../models/raceModel'

class RaceController {
  static async getRace(req: Request, res: Response) {
    const param = req.params['raceId']
    try {
      const data = await getRace(param)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error)
    }
  }

  // NOTED
  static async getMyRaces(req: Request, res: Response) {
    // paginagination options
    const page = req.query.page as string
    const limit = req.query.limit as string
    try {
      const data = await getRaces(parseInt(page), parseInt(limit))
      //const data = await getRacesGroupy(parseInt(limit),parseInt(page))
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error.message)
    }
  }

  static async createRace(req: Request, res: Response) {
    try {
      const data: IRace = {
        title: req.body.title,
        date: req.body.date,
        startTime: null,
        swimDistance: req.body.swimDistance,
        runDistance: req.body.runDistance,
        segments: req.body.segments,
        status: 'upcoming',
        // this will be re define later
        // colours can be customize in the future
        colours: []
      }
      const result = await createRace(data)
      return res.status(200).send(result)
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).send(error)
    }
  }

  static async getRaceStartTime(req: Request, res: Response) {
    const param = req.params['raceId']
    try {
      const data = await getRaceStartTime(param)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error)
    }
  }

  static async updateRace(req: Request, res: Response) {
    const param = req.params['raceId']
    try {
      const data = await updateRace(param, req.body)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error)
    }
  }

  static async deleteRace(req: Request, res: Response) {
    const param = req.params['raceId']
    try {
      const data = await deleteRace(param)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error)
    }
  }
}

export default RaceController
