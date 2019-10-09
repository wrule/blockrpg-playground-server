// 全局的SocketIO服务
import SocketIO from 'socket.io';
import cookie from 'cookie';

export default class SocketIOCaller {
  // 全局的SocketIO
  private static io: SocketIO.Server | undefined = undefined;
  // 初始化全局的SocketIO
  public static Init(srv: any, opts: SocketIO.ServerOptions | undefined = undefined): void {
    this.io = SocketIO(srv, opts);
  }
  // 获取SocketIO
  public static IO(): SocketIO.Server {
    if (!this.io) {
      throw (Error('SocketIO并未初始化，请初始化之后再获取'));
    } else {
      return this.io as SocketIO.Server;
    }
  }
  // 读取存储在Socket之中Cookie值的方法
  public static ReadCookie(socket: SocketIO.Socket, key: string): string | undefined {
    const cookieText: string = socket.request.headers.cookie || '';
    const value = cookie.parse(cookieText)[key];
    return value;
  }
}
