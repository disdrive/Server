import { Request } from "express";
import fs from "fs";
import path from "path";

const getCurrentDateTime = (): string => {
  const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());

  const now = new Date();
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const date = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export class Logger {
  private static instance: Logger;
  private constructor() {}
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log = (status: number, req: Request): void => {
    const text = `${req.ip} ${getCurrentDateTime()} ${status.toString()} ${req.method} ${req.originalUrl}`;
    console.log(text);
    const logDir = path.join("logs");
    const logFile = path.join(logDir, "log.txt");
    fs.appendFileSync(logFile, text + "\n");
  };
}
