import { Router, Request, Response } from 'express';
import { projects } from '../data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

export default router;
