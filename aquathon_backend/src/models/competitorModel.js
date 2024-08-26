"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competitor = void 0;
var mongoose_1 = require("mongoose");
var db_1 = require("../configs/db");
var competitorSchema = new mongoose_1.default.Schema({
    name: String,
    startTime: Date,
}, { timestamps: true });
exports.Competitor = db_1.db.model("Competitor", competitorSchema);
