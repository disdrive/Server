import express from 'express';
import dotenv from 'dotenv';
import { client } from './discord';
dotenv.config();

import { authRoutes } from './routes/v1/auth/index';
import { fileRoutes } from './routes/v1/file/index';
import { testRoutes } from './routes/v1/test';

const app = express();

// JSONオブジェクトの受信設定
app.use(express.json());

// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use('/v1', testRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/file', fileRoutes);

// 3010ポートで受信
const port = process.env.PORT || 3010;

// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);
client.login(process.env.DISCORD_TOKEN);
