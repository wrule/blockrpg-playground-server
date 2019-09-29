import SocketIO from 'socket.io';
import AuthCookie from '../Middleware/AuthCookie';

export default (io: SocketIO.Server) => {
  const nsp = io.of('/chatroom').use(AuthCookie);
  nsp.on('connection', (socket) => {
    console.log('聊天室：新客户端连接');
    socket.on('message', (data) => {
      console.log('接收到客户端消息', data);
      socket.broadcast.emit('message', data);
    });
    socket.on('disconnect', () => {
      console.log('聊天室：客户端下线');
    });
  });
};
