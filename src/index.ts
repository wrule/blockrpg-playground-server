import Koa from 'koa';
import Router from 'koa-router';
import KoaBodyParser from 'koa-bodyparser';
import UUIDV4 from 'uuid/v4';
import SocketIO from 'socket.io';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const wsio = SocketIO(server);

import DBPool from './Utils/DBPool';

import { queryRectBLL } from './Entity/MapBlock/BLL';

// wsio.on('connection', (socket) => {
//   setInterval(() => {
//     socket.emit('event', '客户端你好啊！');
//   }, 5000);
//   socket.on('event', (data) => {
//     console.log('从客户端接收到消息', data);
//   });
// });

import Rsp from './Middleware/Rsp';

async function main() {
  router.post('/api/map/block', async (ctx: any, next: any) => {
    let params = ctx.request.body;
    let list = await queryRectBLL(
      params.x,
      params.y,
      params.w,
      params.h,
      params.mapId,
    );
    Rsp.Success(ctx, list);
  });

  app
    .use(KoaBodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  server.listen(3000);
}

main();
