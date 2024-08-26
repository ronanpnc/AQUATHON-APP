"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
var express_1 = require("express");
require("dotenv/config");
var db_1 = require("./configs/db");
var swagger_ui_express_1 = require("swagger-ui-express");
var cors_1 = require("cors");
var swagger_jsdoc_1 = require("swagger-jsdoc");
var api_1 = require("./routes/api");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var sockets_1 = require("./sockets");
var port = 4000;
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.static('public'));
exports.app.use(api_1.default);
var swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AQUATHON APP REST API',
            version: '1.0.0',
            description: ''
        }
    },
    apis: ['./src/routes/api/*.ts'] // files containing annotations as above
};
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swaggerOptions)));
// node server
exports.server = (0, http_1.createServer)(exports.app);
exports.server.listen(port, function () {
    (0, db_1.connectDB)();
    console.log("running on http://localhost:".concat(port));
});
// socket io
var io = new socket_io_1.Server(exports.server, { cors: { origin: '*' } });
var onConenction = function (socket) {
    (0, sockets_1.RaceHandler)(io, socket);
};
io.on('connection', onConenction);
