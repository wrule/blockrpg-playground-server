
import { queryRectDAL } from '../DAL';

export async function queryRectBLL(
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
    h < 0 ||
    !mapId.trim()) {
    return [];
  }
  return await queryRectDAL(x, y, w, h, mapId);
}
