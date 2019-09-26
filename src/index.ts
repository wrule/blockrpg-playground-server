import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import UUIDV4 from 'uuid/v4';
import SocketIO from 'socket.io';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const wsio = SocketIO(server);

import MapBlockController from './Entity/MapBlock/Controller';
import PlayerController from './Entity/Player/Controller';

wsio.on('connection', (socket) => {
  setInterval(() => {
    // socket.emit('event', '客户端你好啊！');
  }, 5000);
  socket.on('event', (data) => {
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
}

main();
