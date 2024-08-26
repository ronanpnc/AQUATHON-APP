"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raceService_1 = require("../services/raceService");
var RaceHandler = function (io, socket) {
    var raceID = null;
    var raceRoom = io.to(null);
    var startTime = function (payload) {
        (0, raceService_1.setRaceStartTime)(payload, "start").then(function (data) {
            raceRoom.emit("poolChanged", data === null || data === void 0 ? void 0 : data.startTime);
        }).catch(function (e) { return console.log(e); });
    };
    var resetTime = function (payload) {
        if (payload === undefined || null)
            return;
        (0, raceService_1.setRaceStartTime)(payload, "reset").then(function (data) {
            raceRoom.emit("poolChanged", data === null || data === void 0 ? void 0 : data.startTime);
        }).catch(function (e) { return console.log(e); });
    };
    var subscribe = function (payload) {
        socket.join(payload);
        raceID = payload;
        raceRoom = io.to(raceID);
        raceRoom.emit("subscribeAccepted");
    };
    /// listen on event
    socket.on("startTime", startTime);
    socket.on("resetTime", resetTime);
    socket.on("subscribe", subscribe);
};
exports.default = RaceHandler;
