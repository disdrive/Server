import express, { Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { getFileData } from '../../../db';

export const getFile = express.Router();

getFile.get('/', async (req: Request, res: Response) => {
  const fileData = await getFileData(req.query.accountId as string, req.query.key as string);
  if (fileData === undefined || fileData === null) {
    res.status(404).send('Not found');
    return;
  }

  const dirPath = ".cache/downloads";
  const filePath = path.join(dirPath, fileData.accountId + "_" + fileData.key + "_" + fileData.name);

  const discordRes = await axios({
    url: fileData.discordUrl,
    method: 'GET',
    responseType: 'stream',
  });
  const writer = fs.createWriteStream(filePath);
  discordRes.data.pipe(writer);

  writer.on('finish', () => {
    // ファイルのダウンロードが完了したら、それをクライアントに送信する
    res.download(filePath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred.');
      }
      // ダウンロードが完了したら一時的なファイルを削除する
      fs.unlink(filePath, (err) => {
        if (err) console.error(err);
      });
    });
  });

  writer.on('error', (err) => {
    console.error(err);
    res.status(500).send('An error occurred.');
  });
});
