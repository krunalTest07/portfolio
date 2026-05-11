import { Router, Request, Response } from 'express';
import { Experience } from '../models/Experience';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find({});
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
});

export default router;
