import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Station from '../models/Station';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stations_db';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('MongoDBに接続しました。');
}).catch((error) => {
  console.error('MongoDB接続エラー:', error);
});

const results: any[] = [];

fs.createReadStream(path.join(__dirname, '../../stations.csv'))
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      id: Number(data.id),
      name: data.name,
      line_id: Number(data.line_id),
      pref_cd: Number(data.pref_cd),
      lon: Number(data.lon),
      lat: Number(data.lat),
      weight: Number(data.weight),
      e_sort: Number(data.e_sort),
      location: {
        type: 'Point',
        coordinates: [Number(data.lon), Number(data.lat)]
      }
    });
  })
  .on('end', async () => {
    try {
      await Station.insertMany(results);
      console.log('データのインポートが完了しました。');
      mongoose.connection.close();
    } catch (error) {
      console.error('データのインポート中にエラーが発生しました:', error);
    }
  });
