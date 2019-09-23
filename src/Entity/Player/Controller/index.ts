import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
// import { queryRectBLL } from '../BLL';

const router = new Router();

router.post('/api/player/register', async (ctx: any, next: any) => {
  let params = ctx.request.body;
  Rsp.Success(ctx, '注册玩家');
});

router.get('/api/player/:uid', async (ctx: any, next: any) => {
  let params = ctx.request.body;
  Rsp.Success(ctx, '获取玩家数据');
});

export default router.routes();
