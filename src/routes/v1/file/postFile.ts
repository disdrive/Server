import express, { Request, Response } from "express";
import { uploadFile } from "@/discord";
import { Logger, removeQueryAndFragment } from "@/utils";
import * as fs from "fs";
import { postFileData } from "@/db";

export const postFile = express.Router();

postFile.post("/", async (req: Request, res: Response) => {
  try {
    const url = await uploadFile(req.user?.discordChannelId || "", req.file?.path || "");
    const key = req.file?.filename || "";
    fs.unlinkSync(req.file?.path || "");
    postFileData(req.user?.userId || "", req.file?.originalname || "", key, removeQueryAndFragment(url) || "");
    Logger.getInstance().log(201, req);
    res.header("Content-Type", "application/json");
    res.status(201);
    res.send({ key });
  } catch (e) {
    Logger.getInstance().log(500, req);
    res.status(500).send();
  }
});
