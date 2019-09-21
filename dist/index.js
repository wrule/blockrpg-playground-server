"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require('koa');
var Router = require('@koa/router');
var bodyParser = require('koa-bodyparser');
var mysql = require('mysql2/promise');
var bluebird = require('bluebird');
var app = new Koa();
var router = new Router();
var server = require('http').createServer(app.callback());
var wsio = require('socket.io')(server);
wsio.on('connection', function (socket) {
    setInterval(function () {
        socket.emit('event', '客户端你好啊！');
    }, 5000);
    socket.on('event', function (data) {
        console.log('从客户端接收到消息', data);
    });
});
var Rsp_1 = __importDefault(require("./Middleware/Rsp"));
var pool = null;
function fetchBlock(x, y, w, h, mapId) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    if (w === void 0) { w = 3; }
    if (h === void 0) { h = 3; }
    if (mapId === void 0) { mapId = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (w > 3 ||
                        h > 3 ||
                        w < 0 ||
                        h < 0) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, pool.query("\n    SELECT\n      x,\n      y,\n      resData\n    FROM\n      mapBlock\n    WHERE\n      x >= ? and\n      x < ? and\n      y >= ? and\n      y < ? and\n      mapId = ?\n  ", [x, x + w, y, y + h, mapId])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result[0]];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            pool = mysql.createPool({
                connectionLimit: 100,
                host: 'localhost',
                user: 'root',
                password: 'gushihao',
                database: 'blockrpg',
                Promise: bluebird,
            });
            router.post('/api/map/block', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
                var params, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            params = ctx.request.body;
                            return [4 /*yield*/, fetchBlock(params.x, params.y, params.w, params.h, params.mapId)];
                        case 1:
                            list = _a.sent();
                            Rsp_1.default.Success(ctx, list);
                            return [2 /*return*/];
                    }
                });
            }); });
            app
                .use(bodyParser())
                .use(router.routes())
                .use(router.allowedMethods());
            server.listen(3000);
            return [2 /*return*/];
        });
    });
}
main();
