import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const makeToken = (id: number, userId: string) => {
  return jwt.sign({ id, userId }, process.env.JWT_SECRET || "", { expiresIn: '30d' });
}
