import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserInfo } from "@/db";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Take the second part of the string after 'Bearer'

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
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
