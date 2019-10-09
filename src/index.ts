import Koa, { ExtendableContext } from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
// import SKIO from './Utils/SKIO';
import SocketIOCaller from './SocketIO/index';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());


import MapBlockController from './Entity/MapBlock/Controller';
import OutsideController from './Entity/Outside/Controller';
import PlayerSocket from './Entity/Player/Socket';
import ChatRoom from './SocketIO/ChatRoom';
import compose from 'koa-compose';
import AuthCookie from './Middleware/AuthCookie';
import PlayerController from './Entity/Player/Controller';

// 初始化SocketIO服务
SocketIOCaller.Init(server);
ChatRoom(SocketIOCaller.IO());

async function main() {
  app
    .use(KoaBodyParser())
    .use(OutsideController)
    .use(AuthCookie)
    .use(PlayerController)
    .use(MapBlockController)
    .use(router.allowedMethods());

  server.listen(3000);
}

main();
