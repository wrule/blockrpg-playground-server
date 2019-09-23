
import DBPool from '../../../Utils/DBPool';
import { QUERY_RECT } from '../SQL';

export async function queryRectDAL(
  x: number = 0,
  y: number = 0,
  w: number = 3,
  h: number = 3,
  mapId: string = '1',
): Promise<any[]> {
  const result = await DBPool.query(
    QUERY_RECT,
    [x, x + w, y, y + h, mapId]
  );
  return result[0];
}
