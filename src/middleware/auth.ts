import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserInfo } from "@/db";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
      return res.sendStatus(401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string; userId: string };

    const userInfo = await getUserInfo(decoded.userId);

    if (!userInfo) {
      throw new Error("User not found");
    }

    req.user = {
      id: userInfo.id,
      userId: userInfo.userId,
      discordChannelId: userInfo.discordChannelId
    };

    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.sendStatus(403); // Forbidden
  }
};
