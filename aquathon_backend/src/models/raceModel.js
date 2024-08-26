"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Race = void 0;
var mongoose_1 = require("mongoose");
var db_1 = require("../configs/db");
var raceSchema = new mongoose_1.default.Schema({
    name: String,
    startTime: mongoose_1.default.SchemaTypes.Date,
    status: String,
}, { timestamps: true, collection: "races" });
exports.Race = db_1.db.model("Race", raceSchema);
