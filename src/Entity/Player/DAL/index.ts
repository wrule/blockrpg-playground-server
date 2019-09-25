import DBPool from '../../../Utils/DBPool';
import { INSERT_PLAYER, QUERY_PLAYER } from '../SQL';
import Player from '../Model';

// 向表中插入一个玩家信息
export async function insertPlayerDAL(player: Player) {
  const result = await DBPool.query(INSERT_PLAYER, player);
  console.log(result);
}

// 查询玩家信息
export async function queryPlayerDAL(uid: string): Promise<any[]> {
  const result = await DBPool.query(QUERY_PLAYER, uid);
  return result[0];
}
