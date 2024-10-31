# stations-api

緯度と経度から最寄りの駅を検索するAPIデモアプリケーション。

## 構成

- `src/app.ts`: アプリケーションのエントリーポイント
- `src/scripts/importStations.ts`: 駅情報をデータベースにインポートするスクリプト
- `src/scripts/checkConnection.ts`: データベース接続をチェックするスクリプト

## 必要な環境設定

`.env`ファイルに以下の環境変数を設定してください:

  - `PORT=3000`: サーバーがリッスンするポート番号
  - `MONGODB_URI=mongodb://exampleuser:examplepassword@mongo.741fjiu.mongodb.net`: MongoDBの接続URI

## 実行方法

以下のコマンドでアプリケーションを起動します。

```bash
npm run start
```

テストコマンド
```bash
curl -X POST -H "Content-Type: application/json" -d '{"lat":41.8,"lon":143.7}' http://localhost:3000/nearest-station

# {"id":1110717,"name":"新吉野","line_id":11107,"pref_cd":1,"lon":143.608,"lat":42.7782,"weight":0,"e_sort":1110717}
```