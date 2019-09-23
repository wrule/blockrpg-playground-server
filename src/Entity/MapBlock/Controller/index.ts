import Router from 'koa-router';
import Rsp from '../../../Middleware/Rsp';
import { queryRectBLL } from '../BLL';

const router = new Router();

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

export default router.routes();
