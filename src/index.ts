import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { client } from "@/discord";
import { authRoutes } from "@/routes/v1/auth/index";
import { fileRoutes } from "@/routes/v1/file/index";
import { testRoutes } from "@/routes/v1/test";
dotenv.config();

const app = express();

// JSONオブジェクトの受信設定
app.use(express.json());

// 配列側のオブジェクトの受信設定
app.use(express.urlencoded({ extended: true }));

// ルーティング
app.use("/v1", testRoutes);
app.use("/v1/auth", authRoutes);
app.use("/v1/file", fileRoutes);

// 3010ポートで受信
const port = process.env.PORT || 3010;

//キャッシュディレクトリ作成

const cacheDir = path.join(".cache");
const uploadDir = path.join(cacheDir, "uploads");
const downloadDir = path.join(cacheDir, "downloads");

try {
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
} catch (err) {
  console.error("An error occurred:", err);
}

//ログディレクトリ作成

const logDir = path.join("logs");
const logFile = path.join(logDir, "log.txt");
const newLogFile = (i: number): string => path.join(logDir, `log${i}.txt`);
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    console.log(`${logDir} created.`);
  } else {
    console.log(`${logDir} already exists.`);
    if (fs.existsSync(logFile)) {
      const files = fs.readdirSync(logDir);
      let fileCount = 0;
      files.forEach((file) => {
        const filePath = path.join(logDir, file);

        if (fs.lstatSync(filePath).isFile()) {
          fileCount++;
        }
      });
      console.log("number of log files:", fileCount);
      fs.renameSync(logFile, newLogFile(fileCount));
      console.log(`${logFile} renamed to ${newLogFile(fileCount)}.`);
    }
  }
  fs.writeFileSync(logFile, "");
  console.log(`${logFile} created.`);
} catch (err) {
  console.error("An error occurred:", err);
}

// APIサーバ起動
app.listen(port);
console.log("Express WebApi listening on port " + port);
client.login(process.env.DISCORD_TOKEN);
