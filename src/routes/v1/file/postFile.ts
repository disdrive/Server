import express, { Request, Response } from 'express';
import { uploadFile } from '../../../discord';

export const postFile = express.Router();

postFile.post('/', async (req: Request, res: Response) => {
  try {
    uploadFile(req.user?.discordChannelId || "", req.file?.path || "");
    res.status(201).send();
  } catch (e) {
    res.status(500).send();
  }
});
