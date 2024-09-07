import { Request, Response } from 'express';
import {
  createParticipant,
  getParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
} from '../services/participantService';
import { IParticipant } from '../models/participantModel'; // Adjust the import path as needed

class ParticipantController {
  static async getParticipants(req: Request, res: Response) {
    const { raceId } = req.params;
    /*
    const page = req.query.page as string;
    const limit = req.query.limit as string;
    */
    try {
      const data = await getParticipants(raceId);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(error.statusCode).send(error.message);
    }
  }

  static async getParticipant(req: Request, res: Response) {
    const { raceId, participantId } = req.params;
    try {
      const data = await getParticipantById(raceId, participantId);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  static async createParticipant(req: Request, res: Response) {
    const { raceId } = req.params;
    try {
      const participantData: IParticipant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bib: req.body.bib,
        dateOfBirth: new Date(req.body.dateOfBirth),
        colour: req.body.colour,
        school: req.body.school,
        splits: []
      };
      const result = await createParticipant(raceId, participantData);
      return res.status(201).send(result);
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).send(error);
    }
  }

  static async updateParticipant(req: Request, res: Response) {
    const { raceId, participantId } = req.params;
    try {
      const data = await updateParticipant(raceId, participantId, req.body);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  static async deleteParticipant(req: Request, res: Response) {
    const { raceId, participantId } = req.params;
    try {
      const data = await deleteParticipant(raceId, participantId);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }
}

export default ParticipantController;
