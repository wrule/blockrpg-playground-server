import SocketIO from 'socket.io';
import AuthCookie from '../Middleware/AuthCookie';
import SocketIOCaller from '../index';
import * as SessionBLL from '../../Entity/Session/BLL';

export default (io: SocketIO.Server) => {
  // 获取命名空间，并且应用权限拦截
  const nsp = io.of('/chatroom').use(AuthCookie);
  // 客户端连接事件
  nsp.on('connection', async (socket) => {
    // 获取session
    const sessionCookie = SocketIOCaller.ReadCookie(socket, 'session');
    // 如果session存在
    if (sessionCookie) {
      const session = (sessionCookie as string).trim();
      // 获取玩家昵称
      const name = await SessionBLL.sessionGetName(session);
      // 如果玩家昵称存在
      if (name) {
        // 系统广播玩家上线消息
        console.log(`ChatRoom：${name} 客户端上线`);
        nsp.emit('message', {
          name: '系统消息',
          message: `欢迎 ${name} 上线啦👏`,
        });
        // 广播玩家的个人消息
        socket.on('message', (data) => {
          let msg = (data || '') as string;
          // 消息如果大于100个字符，会省略截断
          if (msg.length > 100) {
            msg = msg.slice(0, 97) + '...';
          }
          socket.broadcast.emit('message', {
            name: name,
            message: msg,
          });
        });
        // 系统广播玩家下线消息
        socket.on('disconnect', () => {
          // console.log(`ChatRoom：${name} 客户端下线`);
          nsp.emit('message', {
            name: '系统消息',
            message: `${name} 下线`,
          });
        });
      }
    }
  });
};
