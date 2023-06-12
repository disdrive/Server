import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
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

//キャッシュディレクトリ作成

const cacheDir = './.cache';
const uploadDir = cacheDir + '/uploads';
const downloadDir = cacheDir + '/downloads';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`${uploadDir} created.`);
} else {
  console.log(`${uploadDir} already exists.`);
}

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
  console.log(`${downloadDir} created.`);
} else {
  console.log(`${downloadDir} already exists.`);
}

// APIサーバ起動
app.listen(port);
console.log('Express WebApi listening on port ' + port);
client.login(process.env.DISCORD_TOKEN);
