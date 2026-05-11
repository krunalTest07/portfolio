import { Router, Request, Response } from 'express';
import { Project } from '../models/Project';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project' });
  }
});

export default router;
