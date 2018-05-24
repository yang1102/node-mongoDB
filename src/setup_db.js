import {readData} from './read_data';
import { MongoClient as mgclient} from 'mongodb';
import {Students} from './models/students';
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

export async function setupDB(dbConfig, dbName, colName) {
  try {
    const client = await mgclient.connect(`${dbConfig.url}:${dbConfig.port}`, {useNewUrlParser: true});
    console.log('connect to data base via Mongodb Driver correctly');
    const db = client.db(dbName);
    const collection = await db.collection(colName);
    const isColEmpty = await collection.count() === 0;

    if (!isColEmpty) {
      await collection.remove({});
    }

    const data = readData('../MOCK_STUDENT_DATA.csv');
    const insertOne = collection.insertOne({
      name: "Jason",
      birth_day: new Date(2000,1,1),
      major: ["computer science", "math"],
    });

    return Promise.all([insertOne, collection.insertMany(data)])
      .then(() => {
        console.log('insert via Mongodb Driver correct');
      });
  } catch (err) {
    console.error('setup DB via Mongodb Driver failded', err);
    throw err;
  }
}

export function setupDBViaMongoos(dbConfig, dbName) {
  return mongoose.connect(`${dbConfig.url}:${dbConfig.port}/${dbName}`)
  .then(async function(db) {
    console.log('connect to data base via Mongoose correctly');
    const data = readData('../MOCK_STUDENT_DATA2.csv');
    const isColEmpty = await Students.count() === 0;
    if (!isColEmpty) {
      await Students.remove({});
    }

    return Students.insertMany(data)
      .then(() => {
        console.log('insert via Mongoose correct');
        mongoose.connection.close();
      })
      .catch((err) => {
        console.error('setup DB via Mongoose failded', err);
        throw err;
      });
  });
}