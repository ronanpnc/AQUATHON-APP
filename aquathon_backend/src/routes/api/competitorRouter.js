"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var RaceController_1 = require("../../controllers/RaceController");
var CompetitorController_1 = require("../../controllers/CompetitorController");
var router = (0, express_1.Router)();
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
router.get("/list", CompetitorController_1.default.getCompetitors);
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
router.post("/create", RaceController_1.default.createRace);
exports.default = router;
