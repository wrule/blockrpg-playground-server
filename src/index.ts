import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
const mysql = require('mysql2/promise');
import bluebird from 'bluebird';
import uuidv4 from 'uuid/v4';

const app = new Koa();
const router = new Router();
const server = require('http').createServer(app.callback());
const wsio = require('socket.io')(server);

import DBPool from './Utils/DBPool';

console.log(DBPool);

// wsio.on('connection', (socket) => {
//   setInterval(() => {
//     socket.emit('event', '客户端你好啊！');
//   }, 5000);
//   socket.on('event', (data) => {
//     console.log('从客户端接收到消息', data);
//   });
// });

import Rsp from './Middleware/Rsp';

let pool: any = null;

async function fetchBlock(
  x: number = 0,
  y: number = 0,
  w: number = 3,
  h: number = 3,
  mapId: string = '1',
): Promise<any[]> {
  if (
    w > 3 ||
    h > 3 ||
    w < 0 ||
    h < 0) {
    return [];
  }
  let result = await pool.query(`
    SELECT
      x,
      y,
      resData
    FROM
      mapBlock
    WHERE
      x >= ? and
      x < ? and
      y >= ? and
      y < ? and
      mapId = ?
  `, [x, x + w, y, y + h, mapId]);
  return result[0];
}

async function main() {
  pool = mysql.createPool({
    connectionLimit : 100,
    host: 'localhost',
    user: 'root',
    password: 'gushihao',
    database: 'blockrpg',
    Promise: bluebird,
  });

  router.post('/api/map/block', async (ctx: any, next: any) => {
    let params = ctx.request.body;
    let list = await fetchBlock(
      params.x,
      params.y,
      params.w,
      params.h,
      params.mapId,
    );
    Rsp.Success(ctx, list);
  });

  app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

  server.listen(3000);
}

main();
