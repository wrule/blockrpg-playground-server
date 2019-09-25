import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { playerLoginBLL, registerPlayerBLL } from '../BLL';

const router = new Router();

router.post('/api/player/register', async (ctx, next) => {
  const params = ctx.request.body;
  const name: string = params.name || '';
  if (name.trim()) {
    registerPlayerBLL(name.trim());
    Rsp.Success(ctx, `注册玩家: ${name}`);
  } else {
    Rsp.Fail(ctx, '请输入玩家姓名');
  }
});

router.post('/api/player/login', async (ctx, next) => {
  const uid = ctx.params.uid;
  const player = await playerLoginBLL(uid);
  if (player) {
    Rsp.Success(ctx, player);
  } else {
    Rsp.Fail(ctx, '没有找到玩家信息，无法登陆');
  }
});

export default router.routes();
