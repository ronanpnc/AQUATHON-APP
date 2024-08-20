
import { Request, Response } from "express";
import { createRace, getRace, getRaces } from "../services/raceService";

class RaceController {
    static async getRace(req: Request, res: Response) {
        const param = req.params['id'];
        try {
            const data = await getRace(param);
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to get the race" });
        }
    }
    static async getMyRaces(req: Request, res: Response) {
        try {
            const data = await getRaces();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to get the races" });
        }
    }
    static async createRace(req: Request, res: Response) {
        try {
            const data = await createRace();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to create the race" });
        }
    }

    static async deleteRace(req: Request, res: Response) {
        try {
            const data = await createRace();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to create the race" });
        }
    }
}

export default RaceController;

