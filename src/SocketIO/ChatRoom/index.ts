import SocketIO from 'socket.io';
import AuthCookie from '../Middleware/AuthCookie';
import SocketIOCaller from '../index';
import * as SessionBLL from '../../Entity/Session/BLL';

export default (io: SocketIO.Server) => {
  const nsp = io.of('/chatroom').use(AuthCookie);
  nsp.on('connection', async (socket) => {
    // 获取session
    const session = SocketIOCaller.ReadCookie(socket, 'session') as string;
    // 获取玩家昵称
    const name = await SessionBLL.sessionGetName(session);
    console.log(`ChatRoom：${name} 客户端上线`);
    socket.broadcast.emit('message', {
      name: '系统消息',
      message: `${name} 上线`,
    });
    socket.on('message', (data) => {
      // 广播消息
      socket.broadcast.emit('message', {
        name: name,
        message: data,
      });
    });
    socket.on('disconnect', () => {
      console.log(`ChatRoom：${name} 客户端下线`);
      socket.broadcast.emit('message', {
        name: '系统消息',
        message: `${name} 下线`,
      });
    });
  });
};
