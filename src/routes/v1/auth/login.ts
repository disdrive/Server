import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const login = express.Router();

login.post('/', async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  const user = await prisma.account.findUnique({ where: { userId } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username: user.userId, id: user.id }, process.env.JWT_SECRET || "", { expiresIn: '1h' });
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});
