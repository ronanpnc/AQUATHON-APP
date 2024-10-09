import { Router } from 'express';
import DashboardController from '../../controllers/DasboardController';

const router = Router();

/**
 * @swagger
 * /api/races/{raceId}/dashboard:
 *   get:
 *     tags:
 *       - dashboard
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
 *         description: A dashboard
 *       404:
 *         description: Race not found
 *       500:
 *         description: Server error
 */
router.get('/:raceId/dashboard', DashboardController.getDashboard);

export default router;
