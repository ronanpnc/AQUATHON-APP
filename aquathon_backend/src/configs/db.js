"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.connectDB = connectDB;
var mongoose_1 = require("mongoose");
var db_url = process.env.NODE_MONGODB;
exports.db = mongoose_1.default.createConnection(db_url);
//console.log(db_url);
function connectDB() {
    try {
        exports.db.on('connected', function () {
            console.log({
                status: true,
                msg: 'Mongoose default connection open to ' + 'here'
            }, 'service');
        });
        // If the connection throws an error
        exports.db.on('error', function (err) {
            console.log({ status: false, msg: 'handle mongo errored connections: ' + err }, 'service');
            connectDB();
        });
        // When the connection is disconnected
        exports.db.on('disconnected', function () {
            console.log({ status: false, msg: 'Mongoose default connection disconnected' }, 'service');
        });
        process.on('SIGINT', function () {
            exports.db.close(true);
            process.exit(0);
        });
    }
    catch (error) {
        console.log({ status: false, msg: error }, 'service');
    }
}
