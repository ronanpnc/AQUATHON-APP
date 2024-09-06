import { Request, Response } from "express";
import { createParticipant, getParticipants } from "../services/competitorService";

class ParcipantController {
    static async getParticipants(req: Request, res: Response) {
        try {
            const data = await getParticipants();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to get the race" });
        }
    }
    static async createParticipant(req: Request, res: Response) {
        try {
            const data = await createParticipant();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to create the race" });
        }
    }


}


export default ParcipantController;
