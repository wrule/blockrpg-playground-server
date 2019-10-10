
import { queryPlayerDAL, insertPlayerDAL } from '../DAL';
import Player from '../Model';
import Dir from '../Model/Dir';
import UUIDV4 from 'uuid/v4';
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

// 获取玩家在数据库之中的基本信息
export async function getPlayerInfoBLL(uid: string) {
  const result = await queryPlayerDAL(uid);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}

// 玩家登陆逻辑
// 拿着玩家的uid进行登录
// 返回session和玩家存储在数据库之中的信息
export async function playerLoginBLL(uid: string) {
  // 首先获取玩家在数据库之中存储的信息
  const player = await getPlayerInfoBLL(uid);
  if (player) {
    // 在redis之中设置session
    const session = await SessionBLL.sessionSet(player.uid, player.name, player.image);
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