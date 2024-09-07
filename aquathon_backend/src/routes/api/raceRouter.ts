import { Router } from 'express'
import RaceController from '../../controllers/RaceController'

const router = Router()
// get all race
/**
 * @swagger
 * /api/races:
 *   get:
 *     tags:
 *      - Race
 *     summary: Retrieve a list of races.
 *     description: Retrieve a list of race all race in the database
 *     responses:
 *       200:
 *         description: A list of race.
 *         content:
 *           application/json:
 *             schema:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Race'
 */
router.get('', RaceController.getMyRaces)



// create race
/**
 * @swagger
 * /api/races:
 *   post:
 *     tags:
 *      - Race
 *     summary: create race.
 *     description: create Race
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/requestBodies/Race'
 *     responses:
 *       200:
 *         description: A list of race.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Race'
 */
router.post('', RaceController.createRace)



// get race
/**
 * @swagger
 * /api/races/{raceId}:
 *   get:
 *     tags:
 *      - Race
 *     summary: get race by id.
 *     description: get a Race with id
 *     parameters:
 *      - name: raceId
 *        in: path
 *        description: ID of race to return
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: A list of race.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Race'
 */
router.get('/:raceId', RaceController.getRace)



// Update race
/**
 * @swagger
 * /api/races/{raceId}:
 *   put:
 *     tags:
 *      - Race
 *     summary: update race by id.
 *     description: get a Race with id
 *     parameters:
 *      - name: raceId
 *        in: path
 *        description: ID of race to return
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Race'
 *     responses:
 *       200:
 *         description: updated race.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Race'
 */
router.put('/:raceId', RaceController.updateRace)



// Delete race
/**
 * @swagger
 * /api/races/{raceId}:
 *   delete:
 *     tags:
 *      - Race
 *     summary: delete race by id.
 *     description: get a Race with id
 *     parameters:
 *      - name: raceId
 *        in: path
 *        description: ID of race to return
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: successful delete race.
 *         content:
 *           application/json:
 *             schema:
 */

router.delete('/:raceId', RaceController.deleteRace)

export default router
