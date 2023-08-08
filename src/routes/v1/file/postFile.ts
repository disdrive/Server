import express, { Request, Response } from "express";
import { uploadFile } from "@/discord";
import { Logger } from "@/utils";

export const postFile = express.Router();

postFile.post("/", async (req: Request, res: Response) => {
  try {
    uploadFile(req.user?.discordChannelId || "", req.file?.path || "");
    Logger.getInstance().log(201, req);
    res.status(201).send();
  } catch (e) {
    Logger.getInstance().log(500, req);
    res.status(500).send();
  }
});
