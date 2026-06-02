import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';

import projectsRouter from './routes/projects';
import skillsRouter from './routes/skills';
import experienceRouter from './routes/experience';

import { Project } from './models/Project';
import { Skill } from './models/Skill';
import { Experience } from './models/Experience';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

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

// Seed DB for QA Tester -> Future QA Automation Engineer
app.post('/api/seed', async (req: Request, res: Response) => {
  try {
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});

    await Project.insertMany([
      {
        title: "E2E E-Commerce Automation Suite",
        description: "Developed a comprehensive end-to-end testing suite for a massive e-commerce platform using Playwright and TypeScript. Orchestrated complex parallel execution environments and reduced critical business-flow failure rates by 35% before deployment.",
        techStack: ["Playwright", "TypeScript", "GitHub Actions", "Allure Reports"],
        githubLink: "#",
        demoLink: "#"
      },
      {
        title: "API Regressions Hub",
        description: "Built automated Postman collections leveraging Newman for Jenkins pipelines. Designed rigorous schema validations and chaining parameters to simulate advanced edge-case user registration data failures.",
        techStack: ["Postman", "Newman", "JavaScript", "Jenkins"],
        githubLink: "#",
        demoLink: "#"
      },
      {
        title: "Defect Management Dashboard Tracker",
        description: "React and Node.js-based application integrated with Jira webhook APIs for live defect triage mapping. Allows QA managers to see bug bottlenecks transparently.",
        techStack: ["React", "Express", "Jira API"],
        githubLink: "#",
        demoLink: "#"
      }
    ]);

    await Skill.insertMany([
      { name: "Manual Testing", category: "Core QA", level: 95 },
      { name: "API Testing (Postman)", category: "Core QA", level: 90 },
      { name: "Selenium", category: "Automation (Learning)", level: 60 },
      { name: "Playwright", category: "Automation (Learning)", level: 75 },
      { name: "JavaScript", category: "Programming", level: 70 },
      { name: "TypeScript", category: "Programming", level: 65 },
      { name: "Jira / Agile", category: "Tools & Methods", level: 95 },
      { name: "Git / CI/CD", category: "Tools & Methods", level: 80 }
    ]);

    await Experience.insertMany([
      {
        company: "Global Tech Solutions",
        role: "QA Tester",
        duration: "Jan 2023 - Present",
        responsibilities: [
          "Execute rigorous manual tests for cross-browser web interfaces.",
          "Perform API sanity checks via Postman prior to frontend integrations.",
          "Identify, document, and track high-severity regressions within Jira.",
          "Actively transitioning into writing automated UI scripts using Playwright."
        ]
      },
      {
        company: "Polyxer Systems Pvt Ltd",
        role: "Junior QA Analyst",
        duration: "Dec 2024 - june 2025",
        responsibilities: [
          "Performed end-to-end testing of web applications, ensuring functionality, reliability, and a seamless user experience.",
          "Created and maintained test cases, reported defects, and verified fixes through continuous collaboration with cross-functional teams.",
          "Contributed to quality assurance processes, release validation, and test execution to deliver high-quality software products."
        ]
      },
    ]);

    res.json({ message: 'Database seeded successfully with QA Automation profile!' });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ message: 'Error seeding database' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
