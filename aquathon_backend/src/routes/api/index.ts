import {Router} from "express"
import * as timeRouter from "./timeRouter";
import * as raceRouter from "./raceRouter";
import * as participantRouter from "./participantRouter";
import * as segmentRouter from "./segmentRouter";
import * as dashboardRouter from "./dashboardRouter";


const router = Router();

router.use("/api/time", timeRouter.default);
router.use("/api/races", raceRouter.default);
//NOTE
router.use("/api/races", participantRouter.default);
router.use("/api/races", segmentRouter.default);
router.use("/api/races", dashboardRouter.default);


export default router;
