import SocketIO from 'socket.io';
import AuthCookie from '../Middleware/AuthCookie';
import SocketIOCaller from '../index';
import * as SessionBLL from '../../Entity/Session/BLL';

export default (io: SocketIO.Server) => {
  // 获取命名空间，并且应用权限拦截
  const nsp = io.of('/roam').use(AuthCookie);
  // 客户端连接事件
  nsp.on('connection', async (socket) => {
    
  });
}
