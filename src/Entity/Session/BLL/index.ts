import UUIDV4 from 'uuid/v4';
import RedisClient from '../../../Utils/RedisClient';
// Session 20分钟的有效期
const ValidityTime: number = (20 * 60);

// 设置一个新的Session
export async function sessionSet(uid: string, name: string): Promise<string> {
  const uuid = UUIDV4();
  const key = `session:${uuid}`;
  await RedisClient.AsyncClient.HMSET(key, ['uid', uid, 'name', name]);
  await sessionUpdate(uuid);
  return uuid;
}

// 检查一个Session是否有效，此操作会更新Session的有效期
export async function sessionCheck(session: string): Promise<boolean> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const result = await RedisClient.AsyncClient.EXISTS(key);
  return !!result;
}

// 获取Session的uid，此操作会更新Session的有效期
export async function sessionGetUID(session: string): Promise<string> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  return new Promise<string>((resolve, reject) => {
    RedisClient.Client.HGET(key, 'uid', (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
  // const uid = await RedisClient.AsyncClient.HGET(key, 'uid');
  // return uid;
}

// 获取Session的name，此操作会更新Session的有效期
export async function sessionGetName(session: string): Promise<string> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  return new Promise<string>((resolve, reject) => {
    RedisClient.Client.HGET(key, 'name', (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}

// 获取Session的值（所有），此操作会更新Session的有效期
export async function sessionGetAll(session: string): Promise<any> {
  const key = `session:${session}`;
  await sessionUpdate(session);
  const object = await RedisClient.AsyncClient.HGETALL(key);
  if (object) {
    return {
      uid: object.uid,
      name: object.name,
    };
  } else {
    return null;
  }
}

// Session更新（延期）
export async function sessionUpdate(session: string): Promise<void> {
  const key = `session:${session}`;
  await RedisClient.AsyncClient.EXPIRE(key, ValidityTime);
}
