import UUIDV4 from 'uuid/v4';
import RedisClient from '../../../Utils/RedisClient';
// Session 20分钟的有效期
const ValidityTime: number = (20 * 60);

// 设置一个新的Session
export async function sessionSet(uid: string): Promise<string> {
  const uuid = UUIDV4();
  const key = `session:${uuid}`;
  await RedisClient.AsyncClient.SETEX(key, ValidityTime, uid);
  return uuid;
}

// 获取Session值，此操作会更新Session的有效期
export async function sessionGet(session: string): Promise<string> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const uid = await RedisClient.AsyncClient.GET(key);
  return uid;
}

// Session更新（延期）
export async function sessionUpdate(session: string): Promise<void> {
  const key = `session:${session}`;
  await RedisClient.AsyncClient.EXPIRE(session, ValidityTime);
}
