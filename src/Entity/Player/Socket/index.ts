import SocketIO from 'socket.io';

export default (socket: SocketIO.Socket, io: SocketIO.Server) => {
  socket.on('playerUpdate', (data: any) => {
    // console.log(socket.request);
    console.log('收到消息: ', data);
  });
};
