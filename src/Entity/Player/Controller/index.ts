import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { queryPlayerBLL } from '../BLL';

const router = new Router();

router.post('/api/player/register', async (ctx, next) => {
  const params = ctx.request.body;
  const name: string = params.name || '';
  if (name.trim()) {
    Rsp.Success(ctx, `注册玩家: ${name}`);
  } else {
    Rsp.Fail(ctx, '请输入玩家姓名');
  }
});

router.get('/api/player/:uid', async (ctx, next) => {
  const uid = ctx.params.uid;
  const player = await queryPlayerBLL(uid);
  if (player) {
    Rsp.Success(ctx, player);
  } else {
    Rsp.Fail(ctx, '没有找到对应的玩家数据');
  }
});

export default router.routes();
