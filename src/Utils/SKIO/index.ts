import SocketIO from 'socket.io';
import cookie from 'cookie';
import * as SessionBLL from '../../Entity/Session/BLL';

export default (server: any, func: (socket: SocketIO.Socket, io: SocketIO.Server) => void) => {
  const io = SocketIO(server);
  io.use(async (socket, next) => {
    // 从cookie里面获取session并进行验证
    const cookieText: string = socket.request.headers.cookie || '';
    const session = cookie.parse(cookieText)['session'];
    if (session) {
      const uid = await SessionBLL.sessionGetUID(session);
      if (uid) {
        // Scoket.IO连接成功
        next();
      } else {
        next(new Error('未授权，无法访问此服务'));        
      }
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
