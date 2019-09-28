
import { queryPlayerDAL, insertPlayerDAL } from '../DAL';
import Player from '../Model';
import Dir from '../Model/Dir';
import UUIDV4 from 'uuid/v4';
import RedisClient from '../../../Utils/RedisClient';
import Rtv from '../../../Utils/Rtv';
import * as SessionBLL from '../../Session/BLL';

// 新玩家注册逻辑
// 输入姓名，注册玩家之后返回玩家的uid
export async function registerPlayerBLL(name: string): Promise<Rtv> {
  const imageId = Math.floor(Math.random() * 14);
  const player = new Player(name, imageId, 0, 0, Dir.DOWN, 0);
  player.UID = UUIDV4();
  const result = await insertPlayerDAL(player);
  return result;
}

// 玩家登陆逻辑
// 拿着玩家的uid进行登录，返回sessionId
export async function playerLoginBLL(uid: string) {
  const result = await queryPlayerDAL(uid);
  if (result.length > 0) {
    const player = result[0];
    const session = await SessionBLL.sessionSet(player.uid);
    return {
      session,
      player,
    };
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