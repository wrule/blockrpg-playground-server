
// get the client
const mysql = require('mysql2/promise');

// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

async function main() {
  // create the connection, specify bluebird as Promise
  const connection = await mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'gushihao',
    database: 'blockrpg',
    Promise: bluebird,
  });

  let list = [];
  for (let y = -50; y <= 50; ++y) {
    for (let x = -50; x <= 50; ++x) {
      let block = {
        mapId: '1',
        x: x,
        y: y,
        resData: JSON.stringify(Array(20 * 12).fill(0).map((value, index) => {
          const isTree = Math.floor(Math.random() * 25) === 0;
          return {
            resId: 1,
            resNum: isTree ? 9 : 1,
            pass: !isTree,
          };
        })),
      };
      list.push(block);
    }
  }

  list.sort((a, b) => {
    let adiff = Math.abs(a.x) + Math.abs(a.y);
    let bdiff = Math.abs(b.x) + Math.abs(b.y);
    return adiff - bdiff;
  });

  // query database
  // const [rows, fields] = await connection.execute('select * from map1Block');

  for (let i = 0; i < list.length; ++i) {
    let result = await connection.query('INSERT INTO mapBlock SET ?', list[i]);
    console.log(i);
  }

  console.log('over');
  // console.log(result);
}

main();





// for (let y = -50; y <= 50; ++y) {
//   for (let x = -50; x <= 50; ++x) {
//     let block = {
//       mapId: '1',
//       x: x,
//       y: y,
//       resData: Array(20 * 12).fill(0).map((value, index) => {
//         const isTree = Math.floor(Math.random() * 25) === 0;
//         return {
//           resId: 1,
//           resNum: isTree ? 9 : 1,
//           pass: !isTree,
//         };
//       })
//     };
//     console.log(block);
//   }
// }

// import Koa from 'koa';
// const app = new Koa();

// // response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

// app.listen(3000);


// const server = require('http').createServer();
// const io = require('socket.io')(server);
// io.on('connection', client => {
//   client.on('event', data => { /* … */ });
//   client.on('disconnect', () => { /* … */ });
// });
// server.listen(3000);