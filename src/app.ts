import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Station from './models/Station';

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 33333;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stations_db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDBに接続しました。');
  })
  .catch((error: any) => {
    console.error('MongoDB接続エラー:', error);
  });

app.post('/nearest-station', async (req: Request, res: Response): Promise<void> => {
  const { lat, lon } = req.body;

  if (lat === undefined || lon === undefined) {
    res.status(400).json({ error: '緯度（lat）と経度（lon）は必須です。' });
    return;
  }

  try {
    const station = await Station.findOne({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lon, lat]
          }
        }
      }
    });

    console.log(station);

    if (!station) {
      res.status(404).json({ error: '最寄りの駅が見つかりませんでした。' });
      return;
    }

    res.json({
      id: station.id,
      name: station.name,
      line_id: station.line_id,
      pref_cd: station.pref_cd,
      lon: station.lon,
      lat: station.lat,
      weight: station.weight,
      e_sort: station.e_sort
    });
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).json({ error: 'サーバーエラーが発生しました。' });
  }
});

app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で起動しました。`);
});
