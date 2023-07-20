import express, { Request, Response } from 'express';
import { confirmUser, getUserInfo } from '@/db';
import { makeToken, comparePasswords, Logger } from '@/utils';

export const login = express.Router();

login.post('/', async (req: Request, res: Response) => {

  const { userId, password } = req.body;
  if (!(await confirmUser(userId, password))) {
    res.json({ success: false, token: "" });
    Logger.getInstance().log(200, req);
    return;
  }
  const user = await getUserInfo(userId);
  if (user && await comparePasswords(password, user.password)) {
    const token = makeToken(user.id, user.userId);
    res.json({ success: true, token: token });
    Logger.getInstance().log(200, req);
  } else {
    res.json({ success: false, token: "" });
    Logger.getInstance().log(200, req);
  }
});
