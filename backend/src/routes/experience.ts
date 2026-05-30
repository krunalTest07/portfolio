import { Router, Request, Response } from 'express';
import { experiences } from '../data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

export default router;
