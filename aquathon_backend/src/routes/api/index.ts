import {Router} from "express"
import * as timeRouter from "./timeRouter";
import * as raceRouter from "./raceRouter";
import * as participantRouter from "./participantRouter";


const router = Router();

router.use("/api/time", timeRouter.default);
router.use("/api/races", raceRouter.default);
//NOTE
router.use("/api/races", participantRouter.default);


export default router;
