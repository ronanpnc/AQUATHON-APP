import { Router } from 'express';
import ParticipantController from '../../controllers/ParticipantController';

const router = Router();

/**
 * @swagger
 * /api/races/{raceId}/participants:
 *   get:
 *     tags:
 *       - Participants
 *     summary: Get all participants in a race
 *     description: Retrieve a list of all participants for a specific race
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: Unique ID of the race
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of participants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/participant'
 *       404:
 *         description: Race not found
 *       500:
 *         description: Server error
 */
router.get('/:raceId/participants', ParticipantController.getParticipants);

/**
 * @swagger
 * /api/races/{raceId}/participants/{participantId}:
 *   get:
 *     tags:
 *       - Participants
 *     summary: Get a specific participant in a race
 *     description: Retrieve details of a specific participant in a race
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: Unique ID of the race
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: Unique ID of the participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the participant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/participant'
 *       404:
 *         description: Participant or race not found
 *       500:
 *         description: Server error
 */
router.get('/:raceId/participants/:participantId', ParticipantController.getParticipant);

/**
 * @swagger
 * /api/races/{raceId}/participants:
 *   post:
 *     tags:
 *       - Participants
 *     summary: Create a new participant in a race
 *     description: Add a new participant to a specific race
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: Unique ID of the race
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/participant'
 *     responses:
 *       201:
 *         description: Participant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/participant'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Race not found
 *       500:
 *         description: Server error
 */
router.post('/:raceId/participants', ParticipantController.createParticipant);

/**
 * @swagger
 * /api/races/{raceId}/participants/{participantId}:
 *   put:
 *     tags:
 *       - Participants
 *     summary: Update a participant in a race
 *     description: Update details of a specific participant in a race
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: Unique ID of the race
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: Unique ID of the participant
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/participant'
 *     responses:
 *       200:
 *         description: Participant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/participant'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Participant or race not found
 *       500:
 *         description: Server error
 */
router.put('/:raceId/participants/:participantId', ParticipantController.updateParticipant);

/**
 * @swagger
 * /api/races/{raceId}/participants/{participantId}:
 *   delete:
 *     tags:
 *       - Participants
 *     summary: Remove a participant from a race
 *     description: Delete a specific participant from a race
 *     parameters:
 *       - in: path
 *         name: raceId
 *         required: true
 *         description: Unique ID of the race
 *         schema:
 *           type: string
 *       - in: path
 *         name: participantId
 *         required: true
 *         description: Unique ID of the participant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participant successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Participant or race not found
 *       500:
 *         description: Server error
 */
router.delete('/:raceId/participants/:participantId', ParticipantController.deleteParticipant);

export default router;
