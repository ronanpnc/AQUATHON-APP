"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TimeController_1 = require("../../controllers/TimeController");
var router = (0, express_1.Router)();
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
router.get("/now", TimeController_1.default.getTime);
exports.default = router;
