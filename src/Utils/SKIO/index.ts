import SocketIO from 'socket.io';

export default (server: any, func: (socket: SocketIO.Socket, io: SocketIO.Server) => void) => {
  const io = SocketIO(server);
  io.use((socket, next) => {
    console.log(socket.request.headers.cookie);
    next(new Error('未授权，无法访问此服务'));
  }).on('connection', (socket) => {
    console.log('新客户端连接');
    func(socket, io);
    socket.on('disconnect', () => {
      console.log('客户端下线');
    });
  });
};
