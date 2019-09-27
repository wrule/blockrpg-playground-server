import SocketIO from 'socket.io';

export default (socket: SocketIO.Socket, io: SocketIO.Server) => {
  socket.on('playerUpdate', (data) => {
    console.log('收到消息: ', data);
  });
};
