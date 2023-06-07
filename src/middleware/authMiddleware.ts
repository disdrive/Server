import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Take the second part of the string after 'Bearer'

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { id: string; userId: string };

    // Add the decoded data to the request object
    req.user = {
      id: decoded.id,
      userId: decoded.userId,
    };

    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.sendStatus(403); // Forbidden
  }
};

