
import BlueBird from 'bluebird';
import Config from '../../../db.json';
const MySQL2 = require('mysql2/promise');

const Pool: any = MySQL2.createPool({
  ...Config,
  Promise: BlueBird,
});

export default Pool;