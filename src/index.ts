import express from 'express';
import dotenv from 'dotenv';
import { client } from './discord';
dotenv.config();

import router from './routes/v1/index';

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
client.login(process.env.DISCORD_TOKEN);
