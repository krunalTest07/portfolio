import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, ExternalLink, Calendar, User, Tag, Bug } from 'lucide-react';

interface ProjectItem {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll when navigating to new page
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    fetch(`/api/projects/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-12 h-12 border-4 border-brand-purple border-t-brand-cyan rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-slate-800 dark:text-slate-200">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/" className="text-brand-cyan hover:underline flex items-center gap-2"><ArrowLeft size={16} /> Return Home</Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto"
    >
      <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors mb-12 font-medium">
        <ArrowLeft size={18} /> Back to Portfolio
      </Link>

      <div className="glass-card overflow-hidden shadow-2xl bg-white dark:bg-transparent">
        {/* Banner */}
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 flex items-center justify-center relative">
           <h1 className="text-5xl md:text-7xl font-extrabold text-slate-800 dark:text-white uppercase tracking-widest opacity-30 text-center px-4 mix-blend-overlay">
             {project.title}
           </h1>
           {/* Laptop Graphic Placeholder */}
           <motion.div 
             initial={{ y: 50, opacity: 0 }} 
             animate={{ y: 0, opacity: 1 }} 
             transition={{ delay: 0.3 }}
             className="absolute -bottom-24 md:-bottom-32 w-11/12 max-w-3xl aspect-[16/10] md:aspect-[21/9] bg-slate-900 rounded-t-3xl shadow-2xl border-[8px] md:border-[12px] border-b-0 border-slate-800 dark:border-slate-950 flex flex-col overflow-hidden z-10"
           >
             {/* Laptop Screen Webcam/Top Bar */}
             <div className="h-4 md:h-6 w-full flex items-center justify-center bg-slate-900 border-b border-slate-800 z-20">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
             </div>
             
             {/* IDE / Terminal Scanning Window */}
             <div className="flex-1 bg-slate-950 p-6 relative flex flex-col items-center justify-center font-mono overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
                
                {/* Red Bug Anomaly */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1, 1.1, 1], 
                    opacity: [0.5, 1, 0.5, 1, 0.5] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute"
                >
                  <Bug size={64} className="text-red-500 opacity-80" />
                </motion.div>
                
                {/* Holographic Scanner Line */}
                <motion.div
                  animate={{ y: [-120, 120, -120] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-full h-[2px] bg-brand-cyan shadow-[0_0_20px_var(--color-brand-cyan)] z-10 opacity-70"
                ></motion.div>
                
                {/* UI Overlay Targeting Box */}
                <div className="w-28 h-28 border-2 border-brand-cyan/20 rounded-xl flex items-center justify-center relative z-20">
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-cyan"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-cyan"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-cyan"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-cyan"></div>
                  
                  <span className="absolute -bottom-8 text-brand-cyan font-bold tracking-widest text-[#10px] md:text-xs uppercase animate-pulse drop-shadow-[0_0_5px_var(--color-brand-cyan)] whitespace-nowrap">
                    Executing E2E Tests...
                  </span>
                </div>
             </div>
           </motion.div>
        </div>

        <div className="p-8 md:p-16 pt-24 md:pt-24 flex flex-col gap-12">
          {/* Header Info */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-50 leading-tight">
              {project.title}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-2"><User size={18} className="text-brand-cyan" /> QA Test Engineer</span>
              <span className="flex items-center gap-2"><Calendar size={18} className="text-brand-purple" /> 2023 - 2024</span>
              <span className="flex items-center gap-2"><Tag size={18} className="text-brand-cyan" /> Automation Portfolio</span>
            </div>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* About Project */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-headings:text-slate-800 dark:prose-headings:text-slate-100">
            <h3>Overview</h3>
            <p className="leading-relaxed whitespace-pre-wrap">{project.description}</p>
            <p>
              In this role, simulating heavy user traffic via E2E capabilities directly improved the deployment confidence of the application.
              Rigorous manual and exploratory testing paths were condensed down into highly repeatable scripts managed actively in the pipeline repository.
            </p>
          </div>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Tech Stack */}
          <div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Technologies & Languages</h3>
             <div className="flex flex-wrap gap-3">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg font-semibold border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_cyan]"></span>
                    {tech}
                  </span>
                ))}
             </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 pt-8">
            {project.githubLink && project.githubLink !== "#" && (
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                <Code size={20} /> View Test Repo
              </a>
            )}
            {project.demoLink && project.demoLink !== "#" && (
              <a href={project.demoLink} target="_blank" rel="noreferrer" className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                <ExternalLink size={20} /> Live Application
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
