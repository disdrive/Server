import express, { Request, Response } from 'express';

export const testRoutes = express.Router();

// Test route
testRoutes.get('/test', (req: Request, res: Response) => {
  res.send('API is working!');
});
