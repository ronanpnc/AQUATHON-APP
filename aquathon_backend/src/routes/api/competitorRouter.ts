
import {Router} from "express"
import RaceController from "../../controllers/RaceController";
import CompetitorController from "../../controllers/CompetitorController";

const router = Router();

/**
 * @openapi
 * /api/competitor/list:
 *   get:
 *     summary: Get List of Competitor for Race
 *     description: Returns the list of races that the Competitor has.
 *     tags:
 *       - Competitor
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 */
router.get("/list",CompetitorController.getCompetitors)
/**
 * @openapi
 * /api/races/create:
 *   post:
 *     summary: Get List of Race for user
 *     description: Returns the list of races that the user has.
 *     tags:
 *       - Race
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 */
router.post("/create",RaceController.createRace)

export default router;
