import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { getPlayerInfoBLL } from '../BLL';
import * as SessionBLL from '../../Session/BLL';

const router = new Router();

// 获取玩家基本信息
router.post('/api/player/info', async (ctx, next) => {
  const session = ctx.cookies.get('session') as string;
  // 从redis获取uid
  const uid = await SessionBLL.sessionGetUID(session);
  if (uid) {
    const player = await getPlayerInfoBLL(uid);
    if (player) {
      Rsp.Success(ctx, player);
    } else {
      Rsp.Fail(ctx, '没有找到玩家，无法获取玩家信息');
    }
  } else {
    Rsp.Fail(ctx, '玩家未登录，无法获取玩家信息');
  }
});

export default router.routes();
