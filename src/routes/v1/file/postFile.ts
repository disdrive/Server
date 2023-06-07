import express, { Request, Response } from 'express';

export const postFile = express.Router();

postFile.post('/', async (req: Request, res: Response) => {
});
