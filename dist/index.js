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
// get the client
var mysql = require('mysql2/promise');
// get the promise implementation, we will use bluebird
var bluebird = require('bluebird');
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connection, list, y, x, block, i, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mysql.createConnection({
                        host: 'localhost',
                        user: 'root',
                        password: 'gushihao',
                        database: 'blockrpg',
                        Promise: bluebird,
                    })];
                case 1:
                    connection = _a.sent();
                    list = [];
                    for (y = -50; y <= 50; ++y) {
                        for (x = -50; x <= 50; ++x) {
                            block = {
                                mapId: '1',
                                x: x,
                                y: y,
                                resData: JSON.stringify(Array(20 * 12).fill(0).map(function (value, index) {
                                    var isTree = Math.floor(Math.random() * 25) === 0;
                                    return {
                                        resId: 1,
                                        resNum: isTree ? 9 : 1,
                                        pass: !isTree,
                                    };
                                })),
                            };
                            list.push(block);
                        }
                    }
                    list.sort(function (a, b) {
                        var adiff = Math.abs(a.x) + Math.abs(a.y);
                        var bdiff = Math.abs(b.x) + Math.abs(b.y);
                        return adiff - bdiff;
                    });
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < list.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, connection.query('INSERT INTO mapBlock SET ?', list[i])];
                case 3:
                    result = _a.sent();
                    console.log(i);
                    _a.label = 4;
                case 4:
                    ++i;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('over');
                    return [2 /*return*/];
            }
        });
    });
}
main();
// for (let y = -50; y <= 50; ++y) {
//   for (let x = -50; x <= 50; ++x) {
//     let block = {
//       mapId: '1',
//       x: x,
//       y: y,
//       resData: Array(20 * 12).fill(0).map((value, index) => {
//         const isTree = Math.floor(Math.random() * 25) === 0;
//         return {
//           resId: 1,
//           resNum: isTree ? 9 : 1,
//           pass: !isTree,
//         };
//       })
//     };
//     console.log(block);
//   }
// }
// import Koa from 'koa';
// const app = new Koa();
// // response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });
// app.listen(3000);
// const server = require('http').createServer();
// const io = require('socket.io')(server);
// io.on('connection', client => {
//   client.on('event', data => { /* … */ });
//   client.on('disconnect', () => { /* … */ });
// });
// server.listen(3000);
