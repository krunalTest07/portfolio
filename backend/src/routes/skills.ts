import { Router, Request, Response } from 'express';
import { skills } from '../data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

export default router;
