import redis from 'redis';
import bluebird from 'bluebird';
import Config from '../../../config.json';

bluebird.promisifyAll(redis);
const client = redis.createClient(Config.redis);

export default {
  Client: client,
  AsyncClient: client as any,
};
