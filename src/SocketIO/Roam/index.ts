import SocketIO from 'socket.io';
import AuthCookie from '../Middleware/AuthCookie';
import SocketIOCaller from '../index';
import * as SessionBLL from '../../Entity/Session/BLL';

// 空间坐标变换为网格坐标
function getGridCoordinate(x: number, y: number) {
  return {
    x: Math.floor((x + 2) / 5),
    y: Math.floor((y + 2) / 5),
  };
}
// 传入网格坐标获取网格所属的block信息
function getBlock(x: number, y: number) {
  const bx = Math.floor((x + 10) / 21);
  const by = Math.floor((y + 6) / 13);
  return {
    id: `${bx}~${by}`,
    x: bx,
    y: by,
  };
}
// 传入空间坐标获取所属的block信息
function getBlockSpace(x: number, y: number) {
  const coordinate = getGridCoordinate(x, y);
  return getBlock(coordinate.x, coordinate.y);
}
// 传入xy获取周围的九宫格块坐标
function nineGrids(x: number, y: number) {
  const px = x - 1;
  const py = y - 1;
  let grids = [];
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      grids.push({
        id: `${px + j}~${py + i}`,
        x: px + j,
        y: py + i,
      });
    }
  }
  return grids;
}

export default (io: SocketIO.Server) => {
  // 获取命名空间，并且应用权限拦截
  const nsp = io.of('/roam').use(AuthCookie);
  // 客户端连接事件
  nsp.on('connection', async (socket) => {
    // 获取session
    const sessionCookie = SocketIOCaller.ReadCookie(socket, 'session');
    if (sessionCookie) {
      // 获取session
      const session = (sessionCookie as string).trim();
      // 根据session获取玩家信息
      const player = await SessionBLL.sessionGetAll(session);
      // 玩家所在的当前block
      let curBlockId: string = '';
      // 当前影响的多个房间的id
      let curRoomIds: string[] = [];
      // 漫游事件，获取漫游数据
      socket.on('roam', (data) => {
        // 根据空间坐标计算出玩家当前的block信息
        const block = getBlockSpace(data.x, data.y);
        // 如果所在的block变化
        if (block.id !== curBlockId) {
          curBlockId = block.id;
          // 根据玩家当前所处的block计算出附近九宫格block的Ids
          const list = nineGrids(block.x, block.y).map(item => item.id);
          // 需要加入的房间的Ids
          const joinRoomIds = list.filter(nid => curRoomIds.every(oid => oid !== nid));
          socket.join(joinRoomIds);
          // 需要离开的房间的Ids
          const leaveRoomIds = curRoomIds.filter(oid => list.every(nid => nid !== oid));
          leaveRoomIds.forEach(id => {
            socket.leave(id);
          });
          curRoomIds = list;
        }
        // 触发当前房间的漫游消息
        socket.broadcast.to(block.id).emit('roam', {
          name: player.name,
          image: player.image,
          x: data.x,
          y: data.y,
          dir: data.dir,
          ges: data.ges,
        });
      });
    }
  });
}
