import {Router} from "express"
import * as timeRouter from "./timeRouter";
import * as raceRouter from "./raceRouter";
import * as competitorRouter from "./competitorRouter";


const router = Router();

router.use("/api/time", timeRouter.default);
router.use("/api/races", raceRouter.default);
router.use("/api/competitor", competitorRouter.default);


export default router;
