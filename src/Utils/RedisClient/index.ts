// 连接到主Redis的客户端
import Redis from 'ioredis';
import Config from '../../../config.json';

const client = new Redis(Config.redis);

export default client;
