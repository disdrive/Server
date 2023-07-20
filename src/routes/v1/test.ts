import { Logger } from '@/utils';
import express, { Request, Response } from 'express';

export const testRoutes = express.Router();

// Test route
testRoutes.get('/test', (req: Request, res: Response) => {
  Logger.getInstance().log(200, req);
  res.send('API is working!');
});
