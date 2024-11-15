# stations-api

A demo application for searching the nearest station using latitude and longitude.

緯度と経度から最寄りの駅を検索するAPIデモアプリケーション。

## Structure / 構成

- `src/app.ts`: Entry point of the application / アプリケーションのエントリーポイント
- `src/scripts/importStations.ts`: Script to import station data into the database. / 駅情報をデータベースにインポートするスクリプト
- `src/scripts/checkConnection.ts`: Script to check the database connection. / データベース接続をチェックするスクリプト

## Environment Settings / 環境設定

Set the following environment variables in a `.env` file:

`.env`ファイルに以下の環境変数を設定してください:

  - `PORT=3000`: サーバーがリッスンするポート番号
  - `MONGODB_URI=mongodb://exampleuser:examplepassword@mongo.741fjiu.mongodb.net`: MongoDBの接続URI

## How to Run / 実行方法

Start the application with the following command:

以下のコマンドでアプリケーションを起動します。

```bash
npm run start
```

Test Command

テストコマンド

```bash
curl -X POST -H "Content-Type: application/json" -d '{"lat":41.8,"lon":143.7}' http://localhost:3000/nearest-station

# {"id":1110717,"name":"新吉野","line_id":11107,"pref_cd":1,"lon":143.608,"lat":42.7782,"weight":0,"e_sort":1110717}
```