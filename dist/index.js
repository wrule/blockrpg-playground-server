"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var app = new koa_1.default();
// response
app.use(function (ctx) {
    ctx.body = 'Hello Koa';
});
app.listen(3000);
var server = require('http').createServer();
var io = require('socket.io')(server);
io.on('connection', function (client) {
    client.on('event', function (data) { });
    client.on('disconnect', function () { });
});
server.listen(3000);
