import express from 'express';
import router from './routes/v1/index';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// JSONオブジェクトの受信設定
app.use(express.json())
// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/v1', router);

// 3010ポートで受信
const port = process.env.PORT || 3010;

// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);
