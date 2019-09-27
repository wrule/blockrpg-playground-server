import SocketIO from 'socket.io';

export default (server: any, func: (socket: SocketIO.Socket, io: SocketIO.Server) => void) => {
  const io = SocketIO(server);
  io.on('connection', (socket) => {
    console.log('新客户端连接');
    func(socket, io);
    socket.on('disconnect', () => {
      console.log('客户端下线');
    });
  });
};
