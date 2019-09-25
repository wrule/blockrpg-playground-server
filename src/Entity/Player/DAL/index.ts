import DBPool from '../../../Utils/DBPool';
import { INSERT_PLAYER, QUERY_PLAYER, QUERY_PLAYER_BYNAME } from '../SQL';
import Player from '../Model';

// 向表中插入一个玩家信息
export async function insertPlayerDAL(player: Player) {
  const conn = await DBPool.getConnection();
  await conn.beginTransaction();
  const [queryResult] = await conn.query(QUERY_PLAYER_BYNAME, player.Name);
  if (queryResult.length < 1) {
    await conn.query(INSERT_PLAYER, {
      uid: player.UID,
      name: player.Name,
      image: player.Image,
      x: player.X,
      y: player.Y,
      ges: player.Ges,
      dir: player.Dir,
    });
  } else {
    console.log('玩家名称重复');    
  }
  await conn.commit();
  conn.release();
}

// 查询玩家信息
export async function queryPlayerDAL(uid: string): Promise<any[]> {
  const result = await DBPool.query(QUERY_PLAYER, uid);
  return result[0];
}
