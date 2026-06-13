import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Terminal,
  Code2,
  Cpu,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  Layers,
  GitBranch,
  Star,
  FolderGit2,
  Rocket,
  Brain,
  Shield,
  Monitor,
  Play,
  X,
  Menu,
  ArrowUpRight,
  Circle,
  Hash,
  Command,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const PROFILE = {
  name: 'Rishi Desai',
  title: 'Software Engineer & AI Researcher',
  subtitle: 'B.S. Computer Science @ Georgia Tech · GPA 3.88',
  email: 'rdesai317@gatech.edu',
  phone: '(470) 881-0768',
  location: 'Atlanta, GA',
  github: 'https://github.com/rdesai14',
  linkedin: 'https://www.linkedin.com/in/rishi-desai-16964a290/',
  tagline: 'Researching evolutionary neural architecture search on HPC clusters while building full-stack platforms, computer vision pipelines, and cloud infrastructure.',
  education: 'Georgia Institute of Technology · Expected Dec 2027',
  concentration: 'Artificial Intelligence · Systems & Architecture',
};

const SPECIALIZATIONS = [
  'Automated Algorithm Design Researcher',
  'Full-Stack Software Engineer',
  'Computer Vision & Edge AI Engineer',
  'Cloud Infrastructure Architect',
  'Distributed Geospatial Systems Builder',
  'Evolutionary ML Pipeline Engineer',
];

const SKILLS = {
  languages: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'C', 'SQL', 'Assembly'],
  frontend: ['React', 'Vue.js', 'Vite', 'Node.js', 'Bootstrap', 'MVVM'],
  cloud: ['Google Cloud', 'AWS EC2', 'IAM', 'S3', 'Firebase', 'Docker', 'CI/CD'],
  data: ['PostgreSQL', 'MongoDB', 'PostGIS', 'Git', 'Bash', 'Linux', 'ETL'],
  ml: ['PyTorch', 'Scikit-Learn', 'YOLOv8', 'PaddleOCR', 'DEAP', 'CUDA', 'LLMs'],
};

const METRICS = [
  { label: 'GPA', value: '3.88', icon: Star },
  { label: 'Repositories', value: '18', icon: FolderGit2 },
  { label: 'Contributions', value: '83+', icon: GitBranch },
  { label: 'Languages', value: '8', icon: Code2 },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Evolutionary NAS Pipeline',
    category: 'ai',
    description: 'Distributed neural architecture search on a 500+ node HPC cluster, parallelizing SLURM jobs to evolve YOLOv3 variants on COCO 2017. Patched genetic algorithm diversity bugs and extended GitHub Actions CI to validate evolutionary runs.',
    tech: ['Python', 'PyTorch', 'SLURM', 'YOLO', 'DEAP', 'GitHub Actions'],
    metrics: { speedup: '50%', mAP: '0.377–0.433', cluster: '500+ nodes' },
    color: 'from-purple-500/20 to-blue-500/20',
    featured: true,
    github: 'https://github.com/rdesai14/VIP',
  },
  {
    id: 2,
    title: 'iVue Geofencing Engine',
    category: 'systems',
    description: 'Geofencing engine for autonomous drone navigation with PostgreSQL/PostGIS pipelines managing region-scale FAA airspace datasets. Real-time distributed validation reduced geofence violations by 28%.',
    tech: ['PostgreSQL', 'PostGIS', 'Vue.js', 'REST', 'Cesium'],
    metrics: { violations: '-28%', scale: 'Region-scale', latency: 'Real-time' },
    color: 'from-orange-500/20 to-red-500/20',
    featured: true,
    github: 'https://github.com/rdesai14/iVue-Data-Storage',
  },
  {
    id: 3,
    title: 'HexLabs Cloud Platform',
    category: 'fullstack',
    description: 'Managed GCP infrastructure cutting monthly spend by 50%, deployed MongoDB-backed REST APIs in Docker, and built hackathon judging software with React for real-time submission tracking.',
    tech: ['React', 'MongoDB', 'Docker', 'GCP', 'REST'],
    metrics: { cost: '-50%', issues: '-40%', apis: 'REST' },
    color: 'from-emerald-500/20 to-teal-500/20',
    featured: true,
    github: 'https://github.com/rdesai14/HexLabs',
  },
  {
    id: 4,
    title: 'F1 Lap Time Prediction',
    category: 'ai',
    description: 'ML pipeline predicting Formula 1 lap times across 5+ seasons of telemetry. Feature engineering and ensemble modeling in Scikit-Learn with automated ETL eliminating 80% of manual preprocessing.',
    tech: ['Scikit-Learn', 'React', 'Pandas', 'NumPy', 'ETL'],
    metrics: { accuracy: '+20%', error: '-15%', etl: '80% automated' },
    color: 'from-cyan-500/20 to-indigo-500/20',
    featured: false,
    github: 'https://github.com/rdesai14/F1_HungarianGrandPrixQualifying',
  },
  {
    id: 5,
    title: 'Apago Vision Systems',
    category: 'ai',
    description: 'Real-time computer vision with YOLO and OCR for rail detection and license plate tracking. CUDA-accelerated inference deployed on NVIDIA Jetson for low-latency edge detection.',
    tech: ['YOLO', 'PaddleOCR', 'CUDA', 'Jetson', 'Python'],
    metrics: { deployment: 'Edge', inference: 'Real-time', domain: 'CV + OCR' },
    color: 'from-amber-500/20 to-yellow-500/20',
    featured: false,
  },
  {
    id: 6,
    title: 'AvengerRobotics FRC',
    category: 'systems',
    description: 'Head of Programming for FIRST Robotics Team 7777. Command-based robot control, finite state machines for autonomous sequences, and AprilTag vision with sensor fusion for pose estimation.',
    tech: ['Java', 'Odometry', 'AprilTag', 'FSM', 'Path Planning'],
    metrics: { role: 'Head of Prog.', team: 'FRC 7777', seasons: '2023–2025' },
    color: 'from-pink-500/20 to-rose-500/20',
    featured: false,
    github: 'https://github.com/rdesai14/FRC2024',
  },
];

const EXPERIENCE = [
  {
    id: 1,
    role: 'Incoming Software Engineering & AI Solutions Intern',
    company: 'Quatrro / ContinuServe',
    period: 'May 2026 — Present',
    location: 'Marietta, GA',
    description: 'Incoming intern focused on software engineering and AI solutions at Quatrro Business Support Solutions.',
    tech: ['Python', 'AI/ML', 'Software Engineering'],
    highlights: ['Joining May 2026 to build production AI solutions'],
  },
  {
    id: 2,
    role: 'Undergraduate Researcher — Automated Algorithm Design Lab',
    company: 'Georgia Tech VIP Program',
    period: 'Dec 2025 — Present',
    location: 'Atlanta, GA',
    description: 'Built and deployed a distributed neural architecture search pipeline on a 500+ node HPC cluster, parallelizing SLURM jobs to evaluate evolved YOLOv3 variants on 118K-image COCO 2017.',
    tech: ['Python', 'PyTorch', 'SLURM', 'DEAP', 'YOLO', 'GitHub Actions'],
    highlights: [
      'Cut per-generation wall time by ~50% through hyperparameter tuning while preserving mAP50-95 of 0.377–0.433',
      'Patched population diversity bug in genetic algorithm that was cloning parent architectures',
      'Extended GitHub Actions CI/CD to parse output files and classify architectures as pass/fail',
    ],
  },
  {
    id: 3,
    role: 'Software Engineer',
    company: 'HexLabs Inc.',
    period: 'Dec 2025 — Present',
    location: 'Atlanta, GA',
    description: 'Managed GCP cloud infrastructure, built API-driven MongoDB applications in Docker, and developed hackathon judging software with React for automated submission tracking.',
    tech: ['React', 'MongoDB', 'Docker', 'GCP', 'REST', 'CI/CD'],
    highlights: [
      'Reduced monthly cloud spending by 50% while maintaining high availability',
      'Cut recurring issues by 40% through logging, monitoring, and automated testing',
      'Built REST APIs enabling reliable, scalable data exchange across services',
    ],
  },
  {
    id: 4,
    role: 'Software Engineering Intern',
    company: 'iVue Robotics',
    period: 'Jan 2024 — Mar 2025',
    location: 'Cumming, GA',
    description: 'Architected a geofencing engine for autonomous drone navigation and built a high-throughput geospatial pipeline with PostgreSQL/PostGIS for FAA airspace datasets.',
    tech: ['Vue.js', 'Cesium', 'PostgreSQL', 'PostGIS', 'REST'],
    highlights: [
      'Reduced geofence violations by 28% via real-time distributed FAA validation',
      'Built interactive drone control GUI with real-time flight path visualization',
      'Optimized spatial indexing for low-latency geofence validation at region scale',
    ],
  },
  {
    id: 5,
    role: 'Head of Programming',
    company: 'AvengerRobotics (FRC Team 7777)',
    period: 'Jun 2023 — May 2025',
    location: 'Cumming, GA',
    description: 'Led robot programming using command-based architecture, finite state machines for autonomous sequences, and AprilTag vision with sensor fusion for field localization.',
    tech: ['Java', 'Odometry', 'AprilTag', 'FSM', 'Path Planning'],
    highlights: [
      'Integrated odometry and AprilTag vision for real-time pose estimation',
      'Developed autonomous path planning with kinematic constraints and motion profiling',
      'Applied sensor fusion combining encoder, IMU, and vision data for navigation robustness',
    ],
  },
  {
    id: 6,
    role: 'Artificial Intelligence Intern',
    company: 'Apago, Inc.',
    period: 'Jul 2024 — Jan 2025',
    location: 'Cumming, GA',
    description: 'Developed real-time computer vision systems using YOLO and OCR for rail detection and license plate tracking, with CUDA-accelerated inference on NVIDIA Jetson.',
    tech: ['YOLO', 'PaddleOCR', 'CUDA', 'Jetson', 'Python'],
    highlights: [
      'Built license plate tracking system for automated vehicle identification',
      'Designed automated data labeling and preprocessing pipelines',
      'Deployed edge inference balancing performance, power, and hardware constraints',
    ],
  },
];

const FILTER_CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'systems', label: 'Systems' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
];

const TERMINAL_COMMANDS = {
  help: () => `Available commands:
  about      — Personal introduction
  skills     — Technical skill matrix
  experience — Work & research history
  projects   — Project portfolio
  contact    — Contact information
  clear      — Clear terminal
  whoami     — Identity check
  neofetch   — System info banner`,
  about: () => `${PROFILE.name}
${PROFILE.subtitle}
${PROFILE.tagline}

${PROFILE.education}
Concentration: ${PROFILE.concentration}
Location: ${PROFILE.location}`,
  skills: () => Object.entries(SKILLS)
    .map(([cat, items]) => `[${cat.toUpperCase()}]\n  ${items.join(' · ')}`)
    .join('\n\n'),
  experience: () => EXPERIENCE
    .map((e) => `▸ ${e.role} @ ${e.company}\n  ${e.period} · ${e.location}\n  ${e.description}`)
    .join('\n\n'),
  projects: () => PROJECTS
    .filter((p) => p.featured)
    .map((p) => `◆ ${p.title} [${p.category}]\n  ${p.description}\n  Stack: ${p.tech.join(', ')}`)
    .join('\n\n'),
  contact: () => `Email:    ${PROFILE.email}
Phone:    ${PROFILE.phone}
GitHub:   ${PROFILE.github}
LinkedIn: ${PROFILE.linkedin}
Location: ${PROFILE.location}`,
  whoami: () => PROFILE.name,
  neofetch: () => `     ██████╗ ██╗███████╗██╗  ██╗██╗
     ██╔══██╗██║██╔════╝██║  ██║██║
     ██████╔╝██║███████╗███████║██║
     ██╔══██╗██║╚════██║██╔══██║██║
     ██║  ██║██║███████║██║  ██║██║
     ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝

  OS: Georgia Tech CS x64
  Host: ${PROFILE.name}
  Kernel: Software Engineer & AI Researcher
  GPA: 3.88 · Expected Dec 2027
  Shell: ambition.sh
  Terminal: portfolio-v2`,
};

const TERMINAL_ALIASES = {
  'neo fetch': 'neofetch',
  'who am i': 'whoami',
};

function resolveTerminalCommand(raw) {
  const trimmed = raw.trim().toLowerCase().replace(/\s+/g, ' ');
  if (TERMINAL_COMMANDS[trimmed]) return trimmed;
  if (TERMINAL_ALIASES[trimmed]) return TERMINAL_ALIASES[trimmed];
  const compact = trimmed.replace(/\s+/g, '');
  if (TERMINAL_COMMANDS[compact]) return compact;
  return null;
}

const BOOT_LINES = [
  'INITIALIZING NEURAL INTERFACE...',
  'LOADING GEORGIA TECH MODULES...',
  'COMPILING CREATIVE ENGINE...',
  'MOUNTING PORTFOLIO FILESYSTEM...',
  'ESTABLISHING VISUAL PIPELINE...',
  'SYSTEM READY.',
];

const NAV_ITEMS = [
  { id: 'matrix', label: 'Matrix' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'terminal', label: 'Terminal' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════════════ */

function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return pos;
}

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, display.length + 1));
        if (display.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        setDisplay(current.slice(0, display.length - 1));
        if (display.length === 0) {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useBootSequence(onComplete) {
  const [phase, setPhase] = useState('boot');
  const [bootProgress, setBootProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState([]);
  const [shatter, setShatter] = useState(false);

  useEffect(() => {
    if (phase !== 'boot') return;
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev.length >= BOOT_LINES.length) {
          clearInterval(lineInterval);
          setTimeout(() => setShatter(true), 400);
          setTimeout(() => {
            setPhase('exit');
            setTimeout(() => {
              setPhase('done');
              onComplete?.();
            }, 800);
          }, 1200);
          return prev;
        }
        return [...prev, BOOT_LINES[prev.length]];
      });
    }, 350);

    const progressInterval = setInterval(() => {
      setBootProgress((p) => Math.min(p + Math.random() * 12 + 3, 100));
    }, 200);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [phase, onComplete]);

  return { phase, bootProgress, visibleLines, shatter };
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function BootSequence({ onComplete }) {
  const { phase, bootProgress, visibleLines, shatter } = useBootSequence(onComplete);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep transition-all duration-700 ease-in-out-expo ${
        phase === 'exit' ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 w-full max-w-lg px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-gold animate-glow-pulse" />
          <span className="font-mono text-xs tracking-[0.3em] text-gold/70 uppercase">
            GT Portfolio OS v2.0
          </span>
        </div>

        <div className="mb-6 font-mono text-sm space-y-1.5 min-h-[144px]">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-silver-muted animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <ChevronRight className="h-3 w-3 text-gold/50" />
              <span className={i === visibleLines.length - 1 ? 'text-gold-glow' : 'text-silver/60'}>
                {line}
              </span>
            </div>
          ))}
          {phase === 'boot' && visibleLines.length < BOOT_LINES.length && (
            <span className="inline-block h-4 w-2 bg-gold animate-cursor-blink ml-5" />
          )}
        </div>

        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-dim via-gold to-gold-glow transition-all duration-300 ease-out-expo"
            style={{ width: `${bootProgress}%` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
        </div>
        <p className="mt-2 text-right font-mono text-[10px] text-gold/40">
          {Math.min(Math.round(bootProgress), 100)}%
        </p>

        {shatter && (
          <div className="mt-10 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight">
              {PROFILE.name.split('').map((char, i) => (
                <span
                  key={i}
                  className="shatter-char text-gradient-gold"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

function CursorGlow() {
  const { x, y } = useMousePosition();
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(179,163,105,0.06), transparent 40%)`,
      }}
    />
  );
}

function MagneticButton({ children, onClick, className = '', variant = 'primary' }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.15, y: y * 0.15 });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  const variants = {
    primary: 'bg-gold/10 border-gold/30 text-gold-glow hover:bg-gold/20 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(179,163,105,0.3)]',
    ghost: 'bg-white/5 border-white/10 text-silver-bright hover:bg-white/10 hover:border-gold/30',
    solid: 'bg-gold text-navy-deep border-gold hover:bg-gold-glow hover:shadow-[0_0_40px_rgba(179,163,105,0.5)]',
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border px-5 py-2.5 font-medium transition-all duration-500 ease-out-expo ${variants[variant]} ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-0.5">
        {children}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  );
}

function GlowCard({ children, className = '', span = '', onClick, mouseGlow = true }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMove = (e) => {
    if (!mouseGlow || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      className={`group relative overflow-hidden rounded-2xl glass glow-gold transition-all duration-500 ease-out-expo hover:scale-[1.02] hover:border-gold/30 hover:glow-gold-intense ${span} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: glow.active
          ? `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(179,163,105,0.12) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)`
          : undefined,
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(179,163,105,0.05) 0%, transparent 50%, rgba(179,163,105,0.03) 100%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Navigation({ activeSection, onNavigate, mobileOpen, setMobileOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled ? 'glass backdrop-blur-2xl py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => onNavigate('hero')}
          className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 border border-gold/30 transition-all duration-500 group-hover:bg-gold/20 group-hover:shadow-[0_0_20px_rgba(179,163,105,0.3)]">
            <span className="text-gradient-gold text-sm font-bold">R</span>
          </div>
          <span className="hidden sm:block text-silver-bright group-hover:text-gold-glow transition-colors duration-500">
            {PROFILE.name.split(' ')[0]}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ease-out-expo rounded-lg ${
                activeSection === item.id
                  ? 'text-gold-glow'
                  : 'text-silver-muted hover:text-silver-bright'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gold transition-all duration-500" />
              )}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <MagneticButton variant="ghost" onClick={() => window.open(PROFILE.github, '_blank')}>
            <Github className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton variant="primary" onClick={() => onNavigate('terminal')}>
            <Terminal className="h-4 w-4" />
            Launch Terminal
          </MagneticButton>
        </div>

        <button
          className="md:hidden p-2 text-silver-bright"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out-expo ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass mx-4 mt-2 rounded-xl p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-3 text-sm text-silver-bright hover:text-gold-glow hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ visible }) {
  const typed = useTypewriter(SPECIALIZATIONS, 70, 35, 1800);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-gold/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-navy-light/30 blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      <div
        className={`relative z-10 mx-auto max-w-5xl px-6 text-center transition-all duration-1000 ease-out-expo ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-gold px-4 py-1.5 text-xs font-medium text-gold-glow animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          {PROFILE.subtitle}
        </div>

        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="block text-silver-bright">{PROFILE.name.split(' ')[0]}</span>
          <span className="block text-gradient-gold mt-1">{PROFILE.name.split(' ')[1]}</span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg sm:text-xl text-silver-muted leading-relaxed mb-4">
          {PROFILE.tagline}
        </p>

        <div className="flex items-center justify-center gap-2 mb-10 font-mono text-sm sm:text-base">
          <span className="text-gold/60">&gt;</span>
          <span className="text-gold-glow">{typed}</span>
          <span className="inline-block h-5 w-0.5 bg-gold animate-cursor-blink" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton variant="solid" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })}>
            <Play className="h-4 w-4" />
            Run Terminal
          </MagneticButton>
        </div>

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 text-silver-muted hover:text-gold transition-colors duration-500"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Explore</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}

function BentoMatrix({ visible }) {
  const [expandedCard, setExpandedCard] = useState(null);
  const { x: mouseX, y: mouseY } = useMousePosition();
  const gridRef = useRef(null);
  const [gridOffset, setGridOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setGridOffset({
      x: (mouseX - cx) * 0.01,
      y: (mouseY - cy) * 0.01,
    });
  }, [mouseX, mouseY]);

  const allSkills = useMemo(() => Object.entries(SKILLS), []);

  return (
    <section id="matrix" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className={`mb-16 transition-all duration-700 ease-out-expo ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Layers className="h-5 w-5 text-gold" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold/60 uppercase">The Matrix</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-silver-bright">
            Skill <span className="text-gradient-gold">Intelligence</span> Grid
          </h2>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] transition-all duration-700 ease-out-expo ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transform: `translate(${gridOffset.x}px, ${gridOffset.y}px)` }}
        >
          {/* Profile Card */}
          <GlowCard span="col-span-2 row-span-2" className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-silver-bright">{PROFILE.name}</h3>
                  <p className="text-xs text-silver-muted">{PROFILE.title}</p>
                </div>
              </div>
              <p className="text-sm text-silver-muted leading-relaxed">
                B.S. Computer Science at Georgia Tech — AI & Systems concentration. Research, full-stack engineering, and robotics.
              </p>
            </div>
            <div className="flex gap-2 mt-4">
              {[Github, Linkedin, Mail].map((Icon, i) => {
                const links = [PROFILE.github, PROFILE.linkedin, `mailto:${PROFILE.email}`];
                return (
                  <a
                    key={i}
                    href={links[i]}
                    target={i < 2 ? '_blank' : undefined}
                    rel={i < 2 ? 'noopener noreferrer' : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-silver-muted hover:text-gold hover:border-gold/30 hover:bg-gold/10 transition-all duration-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </GlowCard>

          {/* Metrics */}
          {METRICS.map((metric, i) => (
            <GlowCard
              key={metric.label}
              className="p-4 flex flex-col justify-between"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <metric.icon className="h-4 w-4 text-gold/60" />
              <div>
                <p className="font-display text-2xl font-bold text-gold-glow">{metric.value}</p>
                <p className="text-[10px] text-silver-muted uppercase tracking-wider">{metric.label}</p>
              </div>
            </GlowCard>
          ))}

          {/* Tech Stack Icons */}
          <GlowCard span="col-span-2 md:col-span-2 row-span-1" className="p-4">
            <p className="text-[10px] text-silver-muted uppercase tracking-wider mb-3">Active Stack</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Python', 'TypeScript', 'Java', 'Docker', 'GCP', 'PostgreSQL', 'PyTorch'].map((tech, i) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-silver-bright hover:border-gold/30 hover:text-gold-glow transition-all duration-300"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </GlowCard>

          {/* Skill Categories — expandable bento */}
          {allSkills.map(([category, items], catIndex) => (
            <GlowCard
              key={category}
              span={expandedCard === category ? 'col-span-2 md:col-span-3 row-span-2' : 'col-span-1 md:col-span-1'}
              className={`p-4 transition-all duration-700 ease-out-expo ${expandedCard === category ? '' : ''}`}
              onClick={() => setExpandedCard(expandedCard === category ? null : category)}
            >
              <div className="flex items-center justify-between mb-2">
                <Cpu className="h-4 w-4 text-gold/60" />
                {expandedCard === category ? (
                  <X className="h-3 w-3 text-silver-muted" />
                ) : (
                  <ChevronRight className="h-3 w-3 text-silver-muted" />
                )}
              </div>
              <p className="text-[10px] text-gold/60 uppercase tracking-wider font-mono mb-2">{category}</p>
              <div className={`transition-all duration-500 ease-out-expo overflow-hidden ${
                expandedCard === category ? 'max-h-48' : 'max-h-16'
              }`}>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill, i) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-gold/5 border border-gold/10 text-silver-bright transition-all duration-300 hover:bg-gold/15 hover:border-gold/30"
                      style={{
                        transitionDelay: expandedCard === category ? `${i * 40}ms` : '0ms',
                        opacity: expandedCard === category || i < 3 ? 1 : 0.4,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {expandedCard !== category && (
                <p className="text-[10px] text-silver-muted mt-1">+{items.length - 3} more</p>
              )}
            </GlowCard>
          ))}

          {/* Status Card */}
          <GlowCard span="col-span-2" className="p-4 flex items-center gap-4">
            <div className="relative">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-glow-pulse" />
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-emerald-400/50 animate-ping" />
            </div>
            <div>
              <p className="text-sm font-medium text-silver-bright">Open to internships & research</p>
              <p className="text-[10px] text-silver-muted">SWE · AI/ML · Full-Stack · May 2026 @ ContinuServe</p>
            </div>
          </GlowCard>

          {/* Performance Card */}
          <GlowCard className="p-4 flex flex-col justify-center items-center">
            <Zap className="h-5 w-5 text-gold mb-2" />
            <p className="font-display text-xl font-bold text-gold-glow">3.88</p>
            <p className="text-[9px] text-silver-muted uppercase">GPA</p>
          </GlowCard>

          <GlowCard className="p-4 flex flex-col justify-center items-center">
            <Shield className="h-5 w-5 text-gold mb-2" />
            <p className="font-display text-xl font-bold text-gold-glow">2027</p>
            <p className="text-[9px] text-silver-muted uppercase">Grad</p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ visible }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(
    () => (filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-transparent" />
      <div className="relative mx-auto max-w-7xl">
        <div className={`mb-12 transition-all duration-700 ease-out-expo ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Rocket className="h-5 w-5 text-gold" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold/60 uppercase">Project Showcase</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-silver-bright mb-8">
            Engineered <span className="text-gradient-gold">Excellence</span>
          </h2>

          <div className="flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-500 ease-out-expo ${
                  filter === cat.id
                    ? 'bg-gold/15 border-gold/40 text-gold-glow shadow-[0_0_20px_rgba(179,163,105,0.15)]'
                    : 'bg-white/5 border-white/10 text-silver-muted hover:border-gold/20 hover:text-silver-bright'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => {
            const isSelected = selectedProject === project.id;
            return (
              <div
                key={project.id}
                className={`transition-all duration-700 ease-out-expo ${
                  isSelected ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                style={{
                  animation: visible ? `fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms forwards` : 'none',
                  opacity: visible ? undefined : 0,
                }}
              >
                <GlowCard
                  className={`h-full p-6 flex flex-col ${isSelected ? 'ring-1 ring-gold/30' : ''}`}
                  onClick={() => setSelectedProject(isSelected ? null : project.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-50 rounded-2xl`} />
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-gold/10 text-gold/80 border border-gold/20 mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-display text-xl font-bold text-silver-bright">{project.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && <Star className="h-4 w-4 text-gold fill-gold/30" />}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-silver-muted hover:text-gold transition-colors duration-300"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-silver-muted leading-relaxed mb-4 flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-silver-bright border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className={`transition-all duration-500 ease-out-expo overflow-hidden ${
                      isSelected ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                        {Object.entries(project.metrics).map(([key, val]) => (
                          <div key={key} className="text-center">
                            <p className="font-display text-lg font-bold text-gold-glow">{val}</p>
                            <p className="text-[9px] text-silver-muted uppercase tracking-wider">{key}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline({ visible }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className={`mb-16 transition-all duration-700 ease-out-expo ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="h-5 w-5 text-gold" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold/60 uppercase">Experience Vector</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-silver-bright">
            Career <span className="text-gradient-gold">Trajectory</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          {EXPERIENCE.map((exp, i) => {
            const isOpen = expanded === exp.id;
            return (
              <div
                key={exp.id}
                className={`relative pl-12 pb-12 transition-all duration-700 ease-out-expo ${
                  visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : exp.id)}
                  className="absolute left-0 top-1 group"
                >
                  <div className={`relative h-10 w-10 rounded-full border-2 transition-all duration-500 ease-out-expo flex items-center justify-center ${
                    isOpen
                      ? 'border-gold bg-gold/20 shadow-[0_0_30px_rgba(179,163,105,0.4)]'
                      : 'border-gold/30 bg-navy-deep group-hover:border-gold/60 group-hover:shadow-[0_0_20px_rgba(179,163,105,0.2)]'
                  }`}>
                    <Circle className={`h-3 w-3 transition-all duration-500 ${isOpen ? 'text-gold fill-gold' : 'text-gold/50'}`} />
                  </div>
                </button>

                <GlowCard className="p-6" mouseGlow={false}>
                  <button
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-silver-bright">{exp.role}</h3>
                        <p className="text-gold/80 text-sm font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-mono text-silver-muted">{exp.period}</p>
                        <p className="text-[10px] text-silver-muted/60">{exp.location}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-silver-muted leading-relaxed">{exp.description}</p>
                  </button>

                  <div className={`transition-all duration-500 ease-out-expo overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Tech Spec</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-gold/5 border border-gold/15 text-gold-glow">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Highlights</p>
                        <ul className="space-y-2">
                          {exp.highlights.map((h, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-silver-muted">
                              <ChevronRight className="h-4 w-4 text-gold/50 shrink-0 mt-0.5" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    className="mt-3 flex items-center gap-1 text-[11px] text-gold/60 hover:text-gold transition-colors duration-300"
                  >
                    {isOpen ? 'Collapse' : 'Expand tech spec'}
                    <ChevronDown className={`h-3 w-3 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </GlowCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TerminalIDE({ visible }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Georgia Tech Portfolio Terminal v2.0 — Type "help" to begin.' },
    { type: 'system', text: '─────────────────────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('terminal');

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => { scrollToBottom(); }, [history, scrollToBottom]);

  const executeCommand = useCallback(async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((h) => [...h, { type: 'input', text: `$ ${cmd}` }]);
    setCommandHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
    setIsRunning(true);

    await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

    if (trimmed === 'clear') {
      setHistory([]);
      setIsRunning(false);
      return;
    }

    const resolved = resolveTerminalCommand(cmd);
    const handler = resolved ? TERMINAL_COMMANDS[resolved] : null;
    if (handler) {
      const output = handler();
      setHistory((h) => [...h, { type: 'output', text: output }]);
    } else {
      const hint = trimmed.replace(/\s+/g, '').includes('neo')
        ? ' Did you mean "neofetch"?'
        : '';
      setHistory((h) => [...h, {
        type: 'error',
        text: `Command not found: ${trimmed}.${hint} Type "help" for available commands.`,
      }]);
    }
    setIsRunning(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isRunning) return;
    executeCommand(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) { setHistoryIndex(-1); setInput(''); return; }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
    }
  };

  const sampleCode = `// rishi.desai — portfolio.config.ts
export const engineer = {
  name: "${PROFILE.name}",
  school: "Georgia Tech",
  major: "Computer Science (AI & Systems)",
  gpa: 3.88,
  graduation: "Dec 2027",
  email: "${PROFILE.email}",
  passions: [
    "evolutionary ML & NAS",
    "computer vision & edge AI",
    "full-stack & cloud infra",
  ],
  seeking: "SWE & AI internships",
};

console.log("Let's build something extraordinary.");`;

  return (
    <section id="terminal" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className={`mb-12 transition-all duration-700 ease-out-expo ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="h-5 w-5 text-gold" />
            <span className="font-mono text-xs tracking-[0.3em] text-gold/60 uppercase">Interactive Console</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-silver-bright">
            Mini <span className="text-gradient-gold">IDE</span> Terminal
          </h2>
          <p className="mt-3 text-silver-muted max-w-xl">
            Run commands to explore my resume. Try <code className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-gold text-sm">help</code>,{' '}
            <code className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-gold text-sm">about</code>, or{' '}
            <code className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-gold text-sm">neofetch</code>.
          </p>
        </div>

        <div
          className={`rounded-2xl overflow-hidden glass border border-white/10 shadow-2xl shadow-black/40 transition-all duration-700 ease-out-expo ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 font-mono text-[11px] text-silver-muted">portfolio — zsh</span>
            </div>
            <div className="flex gap-1">
              {['terminal', 'editor'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono capitalize transition-all duration-500 ease-out-expo ${
                    activeTab === tab
                      ? 'bg-gold/15 text-gold-glow border border-gold/30'
                      : 'text-silver-muted hover:text-silver-bright hover:bg-white/5'
                  }`}
                >
                  {tab === 'terminal' ? 'Terminal' : 'Editor'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[420px]">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1 bg-white/[0.02] border-r border-white/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-silver-muted mb-3 font-mono">Explorer</p>
              <div className="space-y-1 font-mono text-[11px]">
                {['portfolio.config.ts', 'resume.json', 'skills.yaml', 'projects/'].map((file, i) => (
                  <div
                    key={file}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-300 ${
                      i === 0 ? 'bg-gold/10 text-gold-glow border border-gold/20' : 'text-silver-muted hover:bg-white/5'
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    {file.endsWith('/') ? <FolderGit2 className="h-3 w-3" /> : <Hash className="h-3 w-3" />}
                    {file}
                  </div>
                ))}
              </div>
            </div>

            {/* Main panel */}
            <div className="lg:col-span-4 flex flex-col">
              {activeTab === 'terminal' ? (
                <>
                  <div
                    ref={outputRef}
                    className="flex-1 p-4 font-mono text-[13px] leading-relaxed overflow-y-auto terminal-scrollbar max-h-[360px] min-h-[360px] bg-navy-deep/50"
                    onClick={() => inputRef.current?.focus()}
                  >
                    {history.map((line, i) => (
                      <div
                        key={i}
                        className={`mb-1 whitespace-pre-wrap transition-all duration-300 animate-fade-in ${
                          line.type === 'input' ? 'text-gold/80' :
                          line.type === 'error' ? 'text-red-400/80' :
                          line.type === 'system' ? 'text-silver-muted/60' :
                          'text-silver-bright/90'
                        }`}
                      >
                        {line.text}
                      </div>
                    ))}
                    {isRunning && (
                      <div className="flex items-center gap-2 text-gold/60">
                        <Command className="h-3 w-3 animate-spin" />
                        Processing...
                      </div>
                    )}
                  </div>
                  <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
                    <span className="text-gold font-mono text-sm">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isRunning}
                      className="flex-1 bg-transparent font-mono text-sm text-silver-bright outline-none placeholder:text-silver-muted/40"
                      placeholder="Type a command..."
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </form>
                </>
              ) : (
                <div className="flex-1 p-4 font-mono text-[13px] leading-relaxed bg-navy-deep/50 min-h-[420px]">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <span className="text-silver-muted text-[11px]">portfolio.config.ts</span>
                    <MagneticButton variant="ghost" className="!px-3 !py-1.5 !text-[11px]" onClick={() => { setActiveTab('terminal'); executeCommand('about'); }}>
                      <Play className="h-3 w-3" />
                      Run
                    </MagneticButton>
                  </div>
                  <pre className="text-silver-bright/90 whitespace-pre-wrap">
                    {sampleCode.split('\n').map((line, i) => (
                      <div key={i} className="flex animate-fade-in" style={{ animationDelay: `${i * 30}ms`, opacity: 0 }}>
                        <span className="w-8 text-right text-silver-muted/30 mr-4 select-none shrink-0">{i + 1}</span>
                        <span className={
                          line.startsWith('//') ? 'text-silver-muted/50' :
                          line.startsWith('export') || line.startsWith('  ') && line.includes(':') ? 'text-purple-400/80' :
                          line.includes('console') ? 'text-blue-400/80' :
                          line.includes('"') ? 'text-emerald-400/80' :
                          'text-silver-bright/90'
                        }>{line}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center">
            <span className="text-gradient-gold text-sm font-bold">R</span>
          </div>
          <div>
            <p className="font-display font-bold text-silver-bright">{PROFILE.name}</p>
            <p className="text-xs text-silver-muted">{PROFILE.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: PROFILE.github },
            { Icon: Linkedin, href: PROFILE.linkedin },
            { Icon: Mail, href: `mailto:${PROFILE.email}` },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target={i < 2 ? '_blank' : undefined}
              rel={i < 2 ? 'noopener noreferrer' : undefined}
              className="flex h-10 w-10 items-center justify-center rounded-xl glass text-silver-muted hover:text-gold hover:border-gold/30 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(179,163,105,0.2)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-silver-muted/50 font-mono">
          © {new Date().getFullYear()} · Built with precision
        </p>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  const [heroRef, heroVisible] = useInView(0.1);
  const [matrixRef, matrixVisible] = useInView(0.1);
  const [projectsRef, projectsVisible] = useInView(0.1);
  const [experienceRef, experienceVisible] = useInView(0.1);
  const [terminalRef, terminalVisible] = useInView(0.1);

  useEffect(() => {
    if (!booted) return;
    const sections = NAV_ITEMS.map((n) => n.id).concat(['hero']);
    const handler = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [booted]);

  const navigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      <div className={`relative min-h-screen transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <CursorGlow />
        <div className="absolute inset-0 noise-overlay pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy to-navy-deep pointer-events-none z-0" />

        <Navigation
          activeSection={activeSection}
          onNavigate={navigate}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main className="relative z-10">
          <div ref={heroRef}>
            <HeroSection visible={booted && heroVisible} />
          </div>
          <div ref={matrixRef}>
            <BentoMatrix visible={matrixVisible} />
          </div>
          <div ref={projectsRef}>
            <ProjectShowcase visible={projectsVisible} />
          </div>
          <div ref={experienceRef}>
            <ExperienceTimeline visible={experienceVisible} />
          </div>
          <div ref={terminalRef}>
            <TerminalIDE visible={terminalVisible} />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
