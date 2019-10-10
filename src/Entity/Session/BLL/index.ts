import UUIDV4 from 'uuid/v4';
import RedisClient from '../../../Utils/RedisClient';
// Session 20分钟的有效期
const ValidityTime: number = (20 * 60);

// 设置一个新的Session
export async function sessionSet(
  uid: string,
  name: string,
  image: number
): Promise<string> {
  const uuid = UUIDV4();
  const key = `session:${uuid}`;
  RedisClient.hmset(key, ['uid', uid, 'name', name, 'image', image]);
  await sessionUpdate(uuid);
  return uuid;
}

// 检查一个Session是否有效，此操作会更新Session的有效期
export async function sessionCheck(session: string): Promise<boolean> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const result = await RedisClient.exists(key);
  return !!result;
}

// 获取Session的uid，此操作会更新Session的有效期
export async function sessionGetUID(session: string): Promise<string | null> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const value = await RedisClient.hget(key, 'uid');
  return value;
}

// 获取Session的name，此操作会更新Session的有效期
export async function sessionGetName(session: string): Promise<string | null> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const value = await RedisClient.hget(key, 'name');
  return value;
}

// 获取Session的值（所有），此操作会更新Session的有效期
export async function sessionGetAll(session: string): Promise<any> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const value = await RedisClient.hgetall(key);
  return value;
}

// Session更新（延期）
export async function sessionUpdate(session: string): Promise<void> {
  const key = `session:${session}`;
  await RedisClient.expire(key, ValidityTime);
}
