import express, { Request, Response } from 'express';

export const getFile = express.Router();

getFile.get('/', async (req: Request, res: Response) => {
});
