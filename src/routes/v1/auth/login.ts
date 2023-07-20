import express, { Request, Response } from 'express';
import { confirmUser, getUserInfo } from '@/db';
import { comparePasswords } from '@/utils/comparePasswords';
import { makeToken } from '@/utils/makeToken';

export const login = express.Router();

login.post('/', async (req: Request, res: Response) => {
  console.log('Received request:', req.method, req.url);
  console.log('Request body:', req.body);
  const { userId, password } = req.body;
  if (!(await confirmUser(userId, password))) {
    res.json({ success: false, token: "" });
    return;
  }
  const user = await getUserInfo(userId);
  if (user && await comparePasswords(password, user.password)) {
    const token = makeToken(user.id, user.userId);
    res.json({ success: true, token: token });
  } else {
    res.json({ success: false, token: "" });
  }
});
