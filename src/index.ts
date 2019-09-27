import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import SocketIO from 'socket.io';
import RedisClient from './Utils/RedisClient';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const skio = SocketIO(server);

import MapBlockController from './Entity/MapBlock/Controller';
import PlayerController from './Entity/Player/Controller';

skio.on('connection', (socket) => {
  socket.on('playerUpdate', (data) => {
    console.log('从客户端接收到消息', data);
  });
});

async function main() {
  app
    .use(KoaBodyParser())
    .use(PlayerController)
    .use(MapBlockController)
    .use(router.allowedMethods());

  server.listen(3000);

  const a = await RedisClient.AsyncClient.getAsync('1234');
  console.log(a);
}

main();
