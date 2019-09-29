import SocketIO from 'socket.io';
import cookie from 'cookie';
import * as SessionBLL from '../../../Entity/Session/BLL';

export default async (socket: SocketIO.Socket, next: (err?: any) => void) => {
  // 从cookie里面获取session并进行验证
  const cookieText: string = socket.request.headers.cookie || '';
  const session = cookie.parse(cookieText)['session'];
  if (session) {
    const uid = await SessionBLL.sessionGet(session);
    if (uid) {
      // Scoket.IO连接成功
      next();
    } else {
      next(new Error('未授权，无法访问此服务'));        
    }
  } else {
    next(new Error('未授权，无法访问此服务'));
  }
};
