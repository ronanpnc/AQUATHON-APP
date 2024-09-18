import { Request , Response} from "express";

interface TimeProps {
 time: Date;
}


class TimeControllers {
	static async getTime(req:Request, res:Response) {
        const now = new Date();
        return res.status(200).send({time : now});
	}
    // Ms is millisecond
	static async getRaceMsCount(req:Request, res:Response) {
        const now = new Date();
        return res.status(200).send({time : now});
	}
}


export default TimeControllers;

