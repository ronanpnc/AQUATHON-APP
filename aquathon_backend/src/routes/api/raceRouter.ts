import {Router} from "express"
import RaceController from "../../controllers/RaceController";

const router = Router();

/**
 * @openapi
 * /api/races/list:
 *   get:
 *     summary: Get List of Race for user
 *     description: Returns the list of races that the user has.
 *     tags:
 *       - Race
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 time:
 *                   type: string
 *                   format: time(number)
 *                   example: 10483920123
 */
router.get("/list",RaceController.getMyRaces)

/**
 * @openapi
 * /api/races/{id}:
 *   get:
 *     summary: Get the Race for user
 *     description: Returns the race .
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Numeric ID of the user to get races that the user has.
 *     tags:
 *       - Race
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 *
 */
router.get("/:id",RaceController.getRace)

/**
 * @openapi
 * /api/races/create:
 *   post:
 *     summary: Get List of Race for user
 *     description: Returns the Race
 *     tags:
 *       - Race
 *     responses:
 *       200:
 *         description: Successful response. Returns the Race.
 */
router.post("/create",RaceController.createRace)

export default router;
