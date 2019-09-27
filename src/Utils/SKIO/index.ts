import SocketIO from 'socket.io';
import ReadCookieStr from '../ReadCookieStr';

export default (server: any, func: (socket: SocketIO.Socket, io: SocketIO.Server) => void) => {
  const io = SocketIO(server);
  io.use((socket, next) => {
    // 从cookie里面获取session
    const cookie: string = socket.request.headers.cookie || '';
    const session = ReadCookieStr(cookie, 'session');
    if (session) {
      console.log(session);
    } else {
      next(new Error('未授权，无法访问此服务'));
    }
  }).on('connection', (socket) => {
    console.log('新客户端连接');
    func(socket, io);
    socket.on('disconnect', () => {
      console.log('客户端下线');
    });
  });
};
