import express, { Request, Response } from 'express';
import { confirmUser } from '../../../db';
import { getUserInfo } from '../../../db/queries/getUserInfo';
import { comparePasswords } from '../../../utils/comparePasswords';
import { makeToken } from '../../../utils/makeToken';

export const login = express.Router();

login.post('/', async (req: Request, res: Response) => {
  const { userId, password } = req.body;
  if (!(await confirmUser(userId, password))) {
    res.json({ success: false, message: 'Invalid credentials' });
    return;
  }
  const user = await getUserInfo(userId);
  if (user && await comparePasswords(password, user.password)) {
    const token = makeToken(user.id, user.userId);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});
