const config = require('../config.json');
const setupDB = require('./setup_db');

setupDB(config.mongoDB, 'example', 'students').then(() => {
  console.log('Set up mongoDB success');
}).catch(() => {
  console.log('Set up mongoDB failed');
})