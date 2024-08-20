import {Router} from "express"
import TimeControllers from "../../controllers/TimeController";


const router = Router();


/**
 * @openapi
 * /api/time/now:
 *   get:
 *     summary: Get the current server time
 *     description: Returns the current date and time of the server format.
 *     tags:
 *       - Time
 *     responses:
 *       200:
 *         description: Successful response. Returns the current server time.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 time:
 *                   type: string
 *                   format: time(number)
 *                   example: "124562346"
 */
router.get("/now",TimeControllers.getTime)

export default router;
