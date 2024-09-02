
import {Router} from "express"
import ParcipantController from "../../controllers/ParticipantController";

const router = Router();

/**
 * @openapi
 * /api/participants/{raceId}:
 *   get:
 *     summary: Get List of Competitor for Race
 *     description: Returns the list of races that the Competitor has.
 *     tags:
 *       - Participant
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 */
router.get("/",ParcipantController.getParticipants)
export default router;
