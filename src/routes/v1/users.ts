import express, { Request, Response } from 'express';

const router = express.Router();

// GETリクエスト
router.get('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({ userId: 'U001', userName: 'Yamada Taro' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// POSTリクエスト
router.post('/', (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: '登録しました' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
