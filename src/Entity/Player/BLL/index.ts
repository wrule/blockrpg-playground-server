
import { queryPlayerDAL, insertPlayerDAL } from '../DAL';
import Player from '../Model';
import UUIDV4 from 'uuid/v4';

export async function registerPlayerBLL(name: string) {
  const player = new Player(name, 9, 0, 0, 0, 0);
  player.UID = UUIDV4();
  insertPlayerDAL(player);
}

export async function playerLoginBLL(uid: string) {
  const result = await queryPlayerDAL(uid);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
}