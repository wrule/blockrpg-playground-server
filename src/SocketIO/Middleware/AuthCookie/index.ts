import SocketIO from 'socket.io';
import SocketIOCaller from '../../index';
import * as SessionBLL from '../../../Entity/Session/BLL';

export default async (socket: SocketIO.Socket, next: (err?: any) => void) => {
  const session = SocketIOCaller.ReadCookie(socket, 'session');
  if (session) {
    const result = await SessionBLL.sessionCheck(session);
    if (result) {
      // Scoket.IO连接成功
      next();
    } else {
      next(new Error('未授权，无法访问此服务'));        
    }
  } else {
    next(new Error('未授权，无法访问此服务'));
  }
};
