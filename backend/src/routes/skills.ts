import { Router, Request, Response } from 'express';
import { Skill } from '../models/Skill';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
});

export default router;
