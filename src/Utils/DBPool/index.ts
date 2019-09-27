
import BlueBird from 'bluebird';
import Config from '../../../config.json';
const MySQL2 = require('mysql2/promise');

const Pool: any = MySQL2.createPool({
  ...Config.mysql,
  Promise: BlueBird,
});

export default Pool;