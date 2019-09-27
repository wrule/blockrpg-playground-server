
import { queryPlayerDAL, insertPlayerDAL } from '../DAL';
import Player from '../Model';
import Dir from '../Model/Dir';
import UUIDV4 from 'uuid/v4';
import Rtv from '../../../Utils/Rtv';

// 新玩家注册逻辑
export async function registerPlayerBLL(name: string): Promise<Rtv> {
  const imageId = Math.floor(Math.random() * 14);
  const player = new Player(name, imageId, 0, 0, Dir.DOWN, 0);
  player.UID = UUIDV4();
  const result = await insertPlayerDAL(player);
  return result;
}

// 玩家登陆逻辑
export async function playerLoginBLL(uid: string) {
  const result = await queryPlayerDAL(uid);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

// 玩家更新逻辑
export async function playerUpdate(
  session: string,
  x: number,
  y: number,
  dir: number,
  ges: number,
) {

}