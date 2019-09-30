import Koa from 'koa';
import compose from 'koa-compose';
import Rsp from '../Rsp';
import * as SessionBLL from '../../Entity/Session/BLL';

export default async (
  ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>,
  next: () => Promise<any>,
) => {
  // 从cookie里面获取session
  const session = (ctx.cookies.get('session') || '').trim();
  if (session) {
    const result = await SessionBLL.sessionCheck(session);
    if (result) {
      // 回填整理好的session
      ctx.cookies.set('session', session);
      next();
    } else {
      Rsp.Error(ctx, 401, '未登录，无法访问');
    }
  } else {
    Rsp.Error(ctx, 401, '未登录，无法访问');
  }
};
