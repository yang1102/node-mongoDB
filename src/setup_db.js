const readData = require('./read_data');
const mgclient = require('mongodb').MongoClient;

module.exports = async function setupDB(dbConfig, dbName, colName) {
  try {
    const client = await mgclient.connect(`${dbConfig.url}:${dbConfig.port}`, {useNewUrlParser: true});
    console.log('connect to data base correctly');
    const db = client.db(dbName);
    const collection = await db.collection(colName);
    const isColEmpty  = await collection.count() === 0;

    if (!isColEmpty) {
      await collection.remove({});
    }

    collection.insertOne({
      name: "Jason",
      birth_day: new Date(2000,1,1),
      major: ["computer science", "math"],
    });
    const data = readData('../MOCK_STUDENT_DATA.csv');
    collection.insertMany(data);
  } catch (err) {
    console.error('setup DB failded', err);
    throw err;
  }
}
