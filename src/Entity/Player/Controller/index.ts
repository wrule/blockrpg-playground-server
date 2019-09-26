import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { playerLoginBLL, registerPlayerBLL } from '../BLL';

const router = new Router();

// 注册玩家
router.post('/api/player/register', async (ctx, next) => {
  const params = ctx.request.body;
  const name: string = (params.name || '').trim();
  if (name) {
    if (name.length < 21) {
      const result = await registerPlayerBLL(name.trim());
      if (result.IsSuccess) {
        Rsp.Success(ctx, result.Object);
      } else {
        Rsp.Fail(ctx, result.Message);
      }
    } else {
      Rsp.Fail(ctx, '玩家昵称必须在20个字符以内');
    }
  } else {
    Rsp.Fail(ctx, '请输入玩家姓名');
  }
});

// 登录玩家（主要是获取用户信息）
router.post('/api/player/login', async (ctx, next) => {
  const params = ctx.request.body;
  const uid = params.uid;
  const player = await playerLoginBLL(uid);
  if (player) {
    Rsp.Success(ctx, player);
  } else {
    Rsp.Fail(ctx, '没有找到玩家信息，无法登陆');
  }
});

export default router.routes();
