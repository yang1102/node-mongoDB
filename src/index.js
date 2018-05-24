const config = require('../config.json');
import {setupDB, setupDBViaMongoos} from './setup_db';

setupDB(config.mongoDB, 'example', 'students')
.then(() => {
  setupDBViaMongoos(config.mongoDB, 'example')
})
.catch(() => {
  console.log('Set up mongoDB failed');
});