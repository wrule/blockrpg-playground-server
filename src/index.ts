const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const app = new Koa();
const router = new Router();

import Rsp from './Middleware/Rsp';

let pool = null;

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

  router.post('/api/map/block', async (ctx, next) => {
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

  app.listen(3000);
}

main();
