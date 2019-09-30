import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { playerLoginBLL, registerPlayerBLL } from '../../Player/BLL';

const router = new Router();

// 注册玩家
// 注册成功之后会返回一个属于玩家的uid
// 这个uid仅可以拿来登录
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
    Rsp.Fail(ctx, '请输入玩家昵称');
  }
});

// 登录玩家
// 此操作会设置session并且返回玩家信息
router.post('/api/player/login', async (ctx, next) => {
  const params = ctx.request.body;
  const uid = (params.uid || '').trim();
  if (!uid) {
    Rsp.Fail(ctx, 'uid不存在');
  }
  const result = await playerLoginBLL(uid);
  if (result) {
    Rsp.Success(ctx, result);
  } else {
    Rsp.Fail(ctx, '没有找到玩家信息，无法登陆');
  }
});

export default router.routes();
