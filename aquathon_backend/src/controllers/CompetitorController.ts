import { Request, Response } from "express";
import { createCompetitor, getCompetitors } from "../services/competitorService";

class CompetitorController {
    static async getCompetitors(req: Request, res: Response) {
        try {
            const data = await getCompetitors();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to get the race" });
        }
    }
    static async createCompetitor(req: Request, res: Response) {
        try {
            const data = await createCompetitor();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to create the race" });
        }
    }

    static async deleteCompetitor(req: Request, res: Response) {
        try {
            const data = await createCompetitor();
            return res.status(200).send(data);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ "msg": "unable to create the race" });
        }
    }
}


export default CompetitorController;
