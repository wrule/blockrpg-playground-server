import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
// import SKIO from './Utils/SKIO';
import SocketIOCaller from './SocketIO/index';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());


import MapBlockController from './Entity/MapBlock/Controller';
import PlayerController from './Entity/Player/Controller';
import PlayerSocket from './Entity/Player/Socket';
import ChatRoom from './SocketIO/ChatRoom';

// SKIO(server, (socket: SocketIO.Socket, io: SocketIO.Server) => {
//   PlayerSocket(socket, io);
// });
SocketIOCaller.Init(server);
ChatRoom(SocketIOCaller.IO());

async function main() {
  app
    .use(KoaBodyParser())
    .use(PlayerController)
    .use(MapBlockController)
    .use(router.allowedMethods());

  server.listen(3000);
}

main();
