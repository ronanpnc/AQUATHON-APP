import { Request, Response } from 'express';
import { dashboardProcess } from '../services/dashboardService'

class DasboardController {
  static async getDashboard(req: Request, res: Response) {
    const { raceId } = req.params
    console.log(raceId)
    /*
    const page = req.query.page as string;
    const limit = req.query.limit as string;
    */
    try {
      const data = await dashboardProcess(raceId)
      return res.status(200).send(data)
    } catch (error) {
      return res.status(error.statusCode).send(error.message)
    }
  }
}
export default DasboardController
