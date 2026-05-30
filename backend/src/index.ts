import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import projectsRouter from './routes/projects';
import skillsRouter from './routes/skills';
import experienceRouter from './routes/experience';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/experience', experienceRouter);

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend Express server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
