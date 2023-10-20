import { Logger } from "@/utils";
import express, { Request, Response } from "express";

export const testRoutes = express.Router();

// Test route
testRoutes.get("/hello", (req: Request, res: Response) => {
  Logger.getInstance().log(200, req);
  res.header("Content-Type", "application/text");
  res.send("Hello World!");
});
