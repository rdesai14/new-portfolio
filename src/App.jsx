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
  title: 'Software Engineer · AI Researcher',
  subtitle: 'B.S. Computer Science (AI · Systems) @ Georgia Tech · GPA 3.88',
  email: 'rishi317@gatech.edu',
  phone: '(470) 881-0768',
  location: 'Atlanta, GA',
  github: 'https://github.com/rdesai14',
  linkedin: 'https://www.linkedin.com/in/rishi-desai-16964a290/',
  tagline: 'Building distributed ML pipelines, autonomous robotics stacks, and production full-stack systems — from HPC clusters to edge inference.',
  education: 'Georgia Institute of Technology · Expected Dec 2027',
  focus: 'Artificial Intelligence · Systems & Architecture',
};

const SPECIALIZATIONS = [
  'Automated Algorithm Design Researcher',
  'Computer Vision & Edge AI Engineer',
  'Full-Stack Software Engineer',
  'Robotics & Autonomous Systems Lead',
  'Cloud Infrastructure Engineer',
  'Geospatial Systems Developer',
];

const SKILLS = {
  languages: ['Python', 'Java', 'C++', 'TypeScript', 'JavaScript', 'C', 'SQL'],
  frontend: ['React', 'Vue.js', 'Vite', 'Bootstrap', 'Tailwind', 'CesiumJS'],
  backend: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL', 'PostGIS'],
  cloud: ['GCP', 'AWS EC2', 'Firebase', 'Docker', 'CI/CD', 'GitHub Actions'],
  ml: ['PyTorch', 'Scikit-Learn', 'YOLOv8', 'PaddleOCR', 'CUDA', 'DEAP', 'LLMs'],
};

const METRICS = [
  { label: 'GPA', value: '3.88', icon: Star },
  { label: 'GitHub Repos', value: '18+', icon: FolderGit2 },
  { label: 'FRC Worlds', value: '3×', icon: Rocket },
  { label: 'Languages', value: '10+', icon: Code2 },
];

const PROJECTS = [
  {
    id: 1,
    title: 'Automated NAS Pipeline',
    category: 'ai',
    github: 'https://github.com/rdesai14/VIP',
    hook: 'Distributed neural architecture search pipeline that evolves and evaluates YOLO variants at scale on a 500+ node HPC cluster.',
    context: 'Georgia Tech VIP research lab focused on automated algorithm design. The team runs evolutionary search over object-detection architectures against COCO-scale datasets under tight compute budgets on shared SLURM infrastructure.',
    impact: [
      'Parallelized SLURM job orchestration across a 500+ node cluster to evaluate evolved YOLOv3 variants on 118K-image COCO 2017, enabling generation-scale NAS experiments.',
      'Cut per-generation wall time by ~50% (mAP50-95 held at 0.377–0.433) by tuning the PyTorch DDP training harness and hyperparameters across distributed workers.',
      'Extended GitHub Actions CI/CD to parse run outputs, classify architectures as pass/fail from fitness scores and runtime errors, and fast-track viable individuals without recomputation.',
      'Patched a population diversity bug in the genetic algorithm that was cloning parent architectures, restoring meaningful evolutionary pressure across generations.',
    ],
    challenge: 'PyTorch DDP workers were failing silently across heterogeneous cluster nodes due to mismatched editable installs and submodule paths. Migrated the environment toolchain to an editable submodule install pattern so every SLURM worker resolved identical package versions before launching distributed training.',
    tech: ['Python', 'PyTorch', 'SLURM', 'YOLOv3', 'GitHub Actions', 'DEAP'],
    metrics: { cluster: '500+ nodes', speedup: '~50%', dataset: '118K imgs' },
    color: 'from-purple-500/20 to-blue-500/20',
    featured: true,
  },
  {
    id: 2,
    title: 'iVue Geofencing Engine',
    category: 'systems',
    github: 'https://github.com/rdesai14/iVue-Data-Storage',
    hook: 'Real-time geofencing engine and PostGIS pipeline that keeps autonomous drones inside FAA-regulated airspace during live missions.',
    context: 'iVue Robotics builds drone prototyping platforms for students and operators who need FAA-compliant flight boundaries. The system must validate geofences against region-scale airspace datasets with low latency during mission planning and execution.',
    impact: [
      'Architected a geofencing engine with user-defined flight zones and real-time boundary enforcement, preventing unauthorized airspace entry during autonomous missions.',
      'Built a high-throughput PostGIS pipeline for region-scale FAA datasets, optimizing spatial indexing to support low-latency validation across large geographic areas.',
      'Reduced geofence violations by 28% by integrating FAA geospatial data into a distributed real-time validation workflow with Vue/Cesium mission visualization.',
      'Shipped REST APIs and a flat-file server to deliver spatial data to the drone control GUI with reduced latency and improved navigation reliability.',
    ],
    challenge: 'FAA boundary datasets arrived in inconsistent formats with overlapping polygons that produced false-positive violations at zone edges. Built a preprocessing and validation layer with spatial indexing in PostgreSQL/PostGIS and cross-checked boundaries through distributed workflows before enforcing constraints in the live navigation loop.',
    tech: ['PostgreSQL', 'PostGIS', 'Vue.js', 'CesiumJS', 'REST', 'Node.js'],
    metrics: { violations: '-28%', scope: 'FAA-scale', stack: 'PostGIS' },
    color: 'from-orange-500/20 to-red-500/20',
    featured: true,
  },
  {
    id: 3,
    title: 'SnapShelf',
    category: 'fullstack',
    github: 'https://github.com/rdesai14/SnapShelf',
    hook: 'AI-powered virtual fridge that recognizes food from photos, tracks expiration dates, and cuts household food waste.',
    context: 'Hackathon-built consumer app targeting the 90M+ tons of annual U.S. food waste. Built for users who need frictionless inventory tracking without manual data entry — snap a photo and the system handles categorization and expiry inference.',
    impact: [
      'Shipped a full-stack MVP with React/Tailwind frontend and Node/Express backend, integrating Google Gemini for image recognition and automatic expiration inference.',
      'Designed MongoDB schemas for virtual fridge inventory and grocery lists, enabling category sorting, expiry alerts, and location tracking inside the fridge.',
      'Automated food categorization and expiration labeling from camera input, eliminating manual entry for core inventory workflows.',
      'Delivered a production-ready hackathon product with AI-driven recognition, real-time backend sync, and a polished mobile-friendly UI in a compressed build window.',
    ],
    challenge: 'Gemini API responses for expiration dates were inconsistent across food categories and image quality levels. Wrapped inference calls with structured prompt templates, validation rules per category, and fallback defaults so the backend always persisted clean records even when the model returned ambiguous dates.',
    tech: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Gemini'],
    metrics: { ai: 'Gemini', db: 'MongoDB', focus: 'Food waste' },
    color: 'from-emerald-500/20 to-teal-500/20',
    featured: true,
  },
  {
    id: 4,
    title: 'F1 Lap Time Prediction',
    category: 'ai',
    github: 'https://github.com/rdesai14/F1_HungarianGrandPrixQualifying',
    hook: 'ML regression pipeline that predicts F1 lap times from multi-season telemetry with automated ETL and ensemble model tuning.',
    context: 'Personal analytics project combining a passion for Formula 1 with applied ML. The goal was to turn raw race telemetry across 5+ seasons into reliable lap time predictions with minimal manual preprocessing.',
    impact: [
      'Improved lap time prediction accuracy by 20% through feature engineering and statistical analysis across 5+ seasons of race telemetry using Pandas and NumPy.',
      'Reduced regression model error by 15% by comparing ensemble models and optimizing hyperparameters in Scikit-Learn.',
      'Eliminated 80% of manual preprocessing effort by building automated ETL pipelines for dataset ingestion, cleaning, and transformation.',
      'Built an interactive React frontend to visualize qualifying predictions and model outputs for the Hungarian Grand Prix dataset.',
    ],
    challenge: 'Telemetry features varied widely across seasons due to format changes and missing sensor channels. Standardized inputs through a modular ETL layer that imputed missing values, normalized track-specific features, and versioned cleaned datasets so model experiments stayed reproducible across pipeline runs.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'React', 'ETL'],
    metrics: { accuracy: '+20%', error: '-15%', etl: '-80% manual' },
    color: 'from-cyan-500/20 to-indigo-500/20',
    featured: true,
  },
  {
    id: 5,
    title: 'Bit Bounty',
    category: 'systems',
    github: 'https://github.com/rdesai14/crypto-bounty-hackathon',
    hook: 'Decentralized bug bounty platform where cryptographic proof triggers atomic ETH payouts for verified smart contract exploits.',
    context: 'MIT Bitcoin Hackathon project building trustless security incentives for Solidity developers. Hunters submit exploits against published invariants; rewards release atomically in the same reverting sub-call if the invariant breaks.',
    impact: [
      'Built a sandbox that deploys hunter-submitted exploit bytecode via CREATE, funds it, and executes it inside an always-reverting EVM sub-call with atomic reward release on invariant violation.',
      'Designed challenge-specific checker contracts supporting ERC-20, ETH, and NFT postconditions across heterogeneous bounty targets.',
      'Integrated a frontend for exploit submission with contract source, descriptions, and before/after storage snapshots for on-chain verification.',
      'Architected Tier 2 AI verdict flow analyzing NatSpec documentation against observed contract behavior with severity classification.',
    ],
    challenge: 'Getting the sandbox to correctly deploy arbitrary hunter bytecode, fund it, and invoke it within a reverting call frame required careful EVM reasoning about state rollback, call depth, and revert data encoding. Each checker had to remain generic enough for arbitrary exploits while enforcing challenge-specific asset and invariant constraints.',
    tech: ['Solidity', 'Foundry', 'TypeScript', 'EVM', 'React'],
    metrics: { payout: 'Atomic', chain: 'EVM', tier: 'AI verdicts' },
    color: 'from-amber-500/20 to-yellow-500/20',
    featured: false,
  },
  {
    id: 6,
    title: 'AvengerRobotics Autonomy',
    category: 'systems',
    github: 'https://github.com/rdesai14/FRC2024',
    hook: 'Competition-grade autonomous stack for FIRST Robotics with vision-localized path planning and sensor-fused odometry.',
    context: 'AvengerRobotics FIRST team in Forsyth County, GA — 3× World Championship qualifier. As Head of Programming, led software for a 120-lb competition robot operating under strict autonomous timing and reliability constraints on the field.',
    impact: [
      'Architected modular command-based robot control software enabling reusable concurrent subsystem actions, reducing integration conflicts during competition season.',
      'Implemented a finite state machine for deterministic autonomous sequences, eliminating unpredictable state behavior during matches.',
      'Integrated AprilTag vision and odometry for real-time pose estimation, significantly improving autonomous scoring accuracy.',
      'Developed motion-profiled path planning with kinematic constraints and encoder/IMU/vision sensor fusion for robust field navigation.',
    ],
    challenge: 'Autonomous reliability broke down when vision targets were ocated or lighting shifted on the competition field. Combined AprilTag detections with encoder and IMU data through a sensor fusion layer and fallback state transitions so the robot maintained usable pose estimates even when individual sensors degraded mid-match.',
    tech: ['Java', 'WPILib', 'AprilTags', 'Odometry', 'FSM', 'Sensor Fusion'],
    metrics: { worlds: '3×', award: 'Autonomous', role: 'Head of Prog' },
    color: 'from-pink-500/20 to-rose-500/20',
    featured: false,
  },
];

const EXPERIENCE = [
  {
    id: 1,
    role: 'Software Engineering & AI Solutions Intern',
    company: 'Quatrro / ContinuServe',
    period: 'May 2026 — Present',
    location: 'Marietta, GA',
    hook: 'Incoming intern on AI-driven business support solutions at an IAOP Global 100 BPO firm.',
    context: 'ContinuServe (Quatrro Business Support Solutions) delivers outsourced finance, HR, and operations services at enterprise scale. The AI solutions team builds automation tooling that improves accuracy and throughput across client operations.',
    impact: [
      'Joining the AI solutions engineering team to build production automation systems for enterprise BPO workflows.',
    ],
    challenge: 'Role begins May 2026 — focused on applying distributed systems and ML experience to production business automation at enterprise client scale.',
    tech: ['Python', 'AI/ML', 'Cloud', 'Automation'],
  },
  {
    id: 2,
    role: 'Undergraduate Researcher',
    company: 'Georgia Tech VIP — Automated Algorithm Design Lab',
    period: 'Dec 2025 — Present',
    location: 'Atlanta, GA',
    hook: 'Research engineer running evolutionary NAS pipelines on Georgia Tech\'s HPC cluster to discover optimized object-detection architectures.',
    context: 'Vertically Integrated Projects (VIP) research program at Georgia Tech. The Automated Algorithm Design lab evolves neural architectures under compute constraints, comparing evolutionary search against traditional ML baselines on large-scale vision benchmarks.',
    impact: [
      'Deployed a distributed NAS pipeline on a 500+ node SLURM cluster, parallelizing evaluation of evolved YOLOv3 variants on 118K-image COCO 2017.',
      'Cut per-generation wall time by ~50% while preserving model quality (mAP50-95: 0.377–0.433) through targeted PyTorch DDP hyperparameter tuning.',
      'Automated evolutionary run validation in GitHub Actions CI/CD, parsing fitness scores and runtime errors to classify architectures without recomputation.',
      'Patched a genetic algorithm diversity bug cloning parent architectures, restoring effective search pressure across the population.',
    ],
    challenge: 'Distributed PyTorch workers on SLURM nodes hit silent failures from inconsistent package installs across the cluster. Resolved this by migrating to an editable submodule install pattern that guaranteed identical dependency resolution before every DDP launch.',
    tech: ['Python', 'PyTorch', 'SLURM', 'DEAP', 'YOLOv3', 'GitHub Actions'],
  },
  {
    id: 3,
    role: 'Software Engineer',
    company: 'HexLabs Inc.',
    period: 'Dec 2025 — Present',
    location: 'Atlanta, GA',
    hook: 'Engineer on the team behind HackGT — building hackathon infrastructure, judging software, and production web services.',
    context: 'HexLabs is a student-led nonprofit running large-scale hackathons (HackGT) for thousands of participants. The tech team maintains event infrastructure, participant databases, and internal tooling used across multiple annual events.',
    impact: [
      'Reduced monthly GCP spend by 50% by optimizing cloud resource allocation and deployment pipelines while maintaining system availability.',
      'Designed and deployed an API-driven application with MongoDB and Docker, improving service scalability through REST endpoints.',
      'Built hackathon judging software automating submission tracking and scoring workflows for event organizers.',
      'Reduced recurring production issues by 40% by implementing structured logging, monitoring, and automated testing across the stack.',
    ],
    challenge: 'Hackathon traffic spikes caused MongoDB connection pool exhaustion during peak submission windows. Introduced connection pooling limits, read-optimized query patterns, and containerized service restarts through Docker so the API stayed responsive under bursty load.',
    tech: ['React', 'Node.js', 'MongoDB', 'Docker', 'GCP', 'REST APIs'],
  },
  {
    id: 4,
    role: 'Software Engineering Intern',
    company: 'Worlds iVue Robotics',
    period: 'Jan 2024 — Mar 2025',
    location: 'Cumming, GA',
    hook: 'Full-stack intern building FAA-compliant geofencing and geospatial pipelines for autonomous drone navigation.',
    context: 'iVue Robotics builds drone prototyping platforms for students and commercial operators. The engineering team ships real-time flight visualization, spatial data services, and regulatory compliance tooling for autonomous aerial systems.',
    impact: [
      'Architected a geofencing engine with real-time boundary enforcement, preventing unauthorized airspace entry during autonomous drone missions.',
      'Built a PostGIS pipeline for region-scale FAA datasets with optimized spatial indexing for low-latency geofence validation.',
      'Reduced geofence violations by 28% through distributed validation workflows integrating FAA geospatial data into live navigation.',
      'Developed a Vue/Cesium drone control GUI and REST APIs delivering real-time spatial data to mission planning interfaces.',
    ],
    challenge: 'Region-scale FAA polygons overlapped inconsistently, producing false geofence triggers at zone boundaries during live flights. Built a preprocessing layer with spatial validation and indexed PostGIS queries so the enforcement engine only blocked genuinely restricted airspace.',
    tech: ['Vue.js', 'CesiumJS', 'PostgreSQL', 'PostGIS', 'REST', 'Node.js'],
  },
  {
    id: 5,
    role: 'Head of Programming',
    company: 'AvengerRobotics (FIRST)',
    period: 'Jun 2023 — May 2025',
    location: 'Cumming, GA',
    hook: 'Led a robotics software team building competition autonomous systems for a 3× World Championship qualifier.',
    context: 'AvengerRobotics is a FIRST Robotics Competition team providing students industrial robot programming experience. As Head of Programming, owned the full software stack for a 120-lb competition robot under strict match-time reliability requirements.',
    impact: [
      'Architected modular command-based control software with concurrent subsystem actions, improving code scalability across a multi-developer team.',
      'Implemented finite state machines for deterministic autonomous sequences, eliminating unpredictable behavior during competition matches.',
      'Integrated AprilTag vision and odometry for real-time pose estimation, significantly improving autonomous scoring accuracy.',
      'Built motion-profiled path planning with sensor fusion across encoders, IMU, and vision for robust field navigation.',
    ],
    challenge: 'Vision-only localization failed under varying field lighting and occlusions. Engineered a sensor fusion pipeline weighting encoder, IMU, and AprilTag inputs with fallback FSM transitions so autonomous routines degraded gracefully instead of halting mid-match.',
    tech: ['Java', 'WPILib', 'AprilTags', 'Odometry', 'FSM', 'Path Planning'],
  },
  {
    id: 6,
    role: 'AI Intern',
    company: 'Apago, Inc.',
    period: 'Jul 2024 — Jan 2025',
    location: 'Cumming, GA',
    hook: 'Built edge-deployed computer vision systems for real-time rail detection and license plate tracking on NVIDIA Jetson.',
    context: 'Apago develops enterprise productivity software and deploys custom computer vision solutions for clients. The AI team ships low-latency detection pipelines on embedded NVIDIA hardware for security and automation use cases.',
    impact: [
      'Developed real-time YOLO and OCR vision systems for rail detection and automated text recognition in production environments.',
      'Built a license plate tracking system for neighborhood security through automated vehicle identification pipelines.',
      'Deployed CUDA-accelerated inference on NVIDIA Jetson, balancing performance, power efficiency, and hardware constraints.',
      'Designed automated data labeling and preprocessing pipelines to improve dataset quality and model accuracy.',
    ],
    challenge: 'YOLO models trained on desktop GPUs missed detections on Jetson due to resolution and quantization differences at the edge. Retrained with Jetson-matched input sizes and built a preprocessing pipeline that normalized camera feeds before inference, recovering detection accuracy without exceeding thermal limits.',
    tech: ['Python', 'YOLO', 'PaddleOCR', 'CUDA', 'NVIDIA Jetson', 'OpenCV'],
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
Focus: ${PROFILE.focus}
GPA: 3.88 · ${PROFILE.location}`,
  skills: () => Object.entries(SKILLS)
    .map(([cat, items]) => `[${cat.toUpperCase()}]\n  ${items.join(' · ')}`)
    .join('\n\n'),
  experience: () => EXPERIENCE
    .map((e) => `▸ ${e.role} @ ${e.company}\n  ${e.period} · ${e.location}\n  ${e.hook}`)
    .join('\n\n'),
  projects: () => PROJECTS
    .filter((p) => p.featured)
    .map((p) => `◆ ${p.title} [${p.category}]\n  ${p.hook}\n  Stack: ${p.tech.join(', ')}`)
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

  OS: Georgia Tech CS x64 · GPA 3.88
  Host: ${PROFILE.name}
  Kernel: AI · Systems & Architecture
  Shell: ambition.sh
  Location: Atlanta, GA
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
                CS @ Georgia Tech (AI · Systems & Architecture). Research, robotics, full-stack, and edge AI — from SLURM clusters to competition fields.
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
              {['Python', 'PyTorch', 'React', 'TypeScript', 'PostGIS', 'Docker', 'GCP', 'YOLOv8'].map((tech, i) => (
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
              <p className="text-sm font-medium text-silver-bright">Open to Summer 2026+ opportunities</p>
              <p className="text-[10px] text-silver-muted">SWE · AI/ML · Research · Robotics</p>
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
            <p className="font-display text-xl font-bold text-gold-glow">1st</p>
            <p className="text-[9px] text-silver-muted uppercase">GA FBLA Code</p>
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
                        <ExternalLink className="h-4 w-4 text-silver-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    <p className="text-sm text-silver-bright/90 leading-relaxed mb-4 flex-1 font-medium">{project.hook}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-silver-bright border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className={`transition-all duration-500 ease-out-expo overflow-hidden ${
                      isSelected ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-3 border-t border-white/10 space-y-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Context</p>
                          <p className="text-sm text-silver-muted leading-relaxed">{project.context}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Impact</p>
                          <ul className="space-y-2">
                            {project.impact.map((item, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-silver-muted">
                                <ChevronRight className="h-4 w-4 text-gold/50 shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Engineering Challenge</p>
                          <p className="text-sm text-silver-muted leading-relaxed">{project.challenge}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {Object.entries(project.metrics).map(([key, val]) => (
                            <div key={key} className="text-center">
                              <p className="font-display text-lg font-bold text-gold-glow">{val}</p>
                              <p className="text-[9px] text-silver-muted uppercase tracking-wider">{key}</p>
                            </div>
                          ))}
                        </div>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs text-gold/70 hover:text-gold transition-colors duration-300"
                          >
                            <Github className="h-3.5 w-3.5" />
                            View on GitHub
                          </a>
                        )}
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

                    <p className="mt-3 text-sm text-silver-bright/90 leading-relaxed font-medium">{exp.hook}</p>
                  </button>

                  <div className={`transition-all duration-500 ease-out-expo overflow-hidden ${
                    isOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Context</p>
                        <p className="text-sm text-silver-muted leading-relaxed">{exp.context}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Impact</p>
                        <ul className="space-y-2">
                          {exp.impact.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-silver-muted">
                              <ChevronRight className="h-4 w-4 text-gold/50 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Engineering Challenge</p>
                        <p className="text-sm text-silver-muted leading-relaxed">{exp.challenge}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gold/60 mb-2 font-mono">Tech Stack</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-gold/5 border border-gold/15 text-gold-glow">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    className="mt-3 flex items-center gap-1 text-[11px] text-gold/60 hover:text-gold transition-colors duration-300"
                  >
                    {isOpen ? 'Collapse' : 'Expand details'}
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
  major: "Computer Science (AI · Systems)",
  gpa: 3.88,
  grad: "Dec 2027",
  focus: [
    "automated algorithm design",
    "computer vision & edge AI",
    "autonomous robotics",
    "full-stack systems",
  ],
};

console.log("Building at the frontier.");`;

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
                {['portfolio.config.ts', 'VIP/nas_pipeline.py', 'skills.yaml', 'projects/'].map((file, i) => (
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
            <p className="text-xs text-silver-muted">{PROFILE.education}</p>
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
