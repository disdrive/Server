import express, { Request, Response } from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import { getFileData } from "@/db";
import { Logger } from "@/utils";

export const getFile = express.Router();

getFile.get("/", async (req: Request, res: Response) => {
  try {
    const accountId = req.query.userId as string;
    if (accountId !== req.user?.userId) {
      Logger.getInstance().log(403, req);
      res.status(403).send("Forbidden");
      return;
    }

    const fileData = await getFileData(accountId, req.query.key as string);
    if (fileData === undefined || fileData === null) {
      Logger.getInstance().log(404, req);
      res.status(404).send("Not found");
      return;
    }

    const dirPath = path.join(".cache", "downloads");
    const filePath = path.join(dirPath, fileData.accountId + "_" + fileData.key + "_" + fileData.name);

    const discordRes = await axios({
      url: fileData.discordUrl,
      method: "GET",
      responseType: "stream"
    });
    const writer = fs.createWriteStream(filePath);
    discordRes.data.pipe(writer);

    writer.on("finish", () => {
      res.download(filePath, fileData.name, (err) => {
        if (err) {
          console.error(err);
          Logger.getInstance().log(500, req);
          res.status(500).send("An error occurred.");
        }
        fs.unlink(filePath, (err) => {
          if (err) console.error(err);
        });
      });
      Logger.getInstance().log(200, req);
    });

    writer.on("error", (err) => {
      console.error(err);
      Logger.getInstance().log(500, req);
      res.status(500).send("An error occurred.");
    });
  } catch (e) {
    Logger.getInstance().log(500, req);
    res.status(500).send();
  }
});
