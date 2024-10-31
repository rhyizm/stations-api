import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stations_db';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('接続に成功しました。');
}).catch((error) => {
  console.error('接続エラー:', error);
});

mongoose.connection.close();
