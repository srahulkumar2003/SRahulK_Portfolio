import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Download,
  FileText,
  Globe2,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  X,
} from 'lucide-react';
import {
  certifications,
  education,
  experience,
  heroLogs,
  languages,
  navItems,
  profile,
  projects,
  proofPoints,
  research,
  roleRotation,
  skills,
  stats,
  techStack,
  workflow,
} from './data/portfolio';


function GitHubMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18A10.94 10.94 0 0 1 12 6c.98 0 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.91 1.64-1.86 3.37-1.86 3.61 0 4.27 2.38 4.27 5.46v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 38 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-35% 0px -50% 0px', threshold: [0.12, 0.35, 0.65] }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function IntroOverlay({ onEnter }) {
  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
    >
      <video className="intro-video" autoPlay muted playsInline loop poster={profile.introPoster}>
        <source src={profile.introVideo} type="video/mp4" />
      </video>
      <div className="intro-glass">
        <span>Engineering Portfolio</span>
        <h1>Rahul Kumar</h1>
        <p>Software Engineer focused on Backend, Cloud, DevOps, and AI-assisted systems.</p>
        <div className="intro-actions">
          <button onClick={onEnter}>Open Portfolio <ArrowRight size={17} /></button>
          <button className="quiet" onClick={onEnter}>Skip Intro</button>
        </div>
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="Rahul portfolio home">
          <span className="brand-mark">{profile.initials}</span>
          <span>{profile.displayName}</span>
        </a>
        <nav className="desktop-nav">
          {navItems.map((item) => (
            <a className={active === item.href.replace('#', '') ? 'active' : ''} key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="resume-btn" href={profile.resume} download>
          <FileText size={18} /> Resume
        </a>
        <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="mobile-panel" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
              ))}
              <a href={profile.resume} download>Download Resume</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RoleSwitcher() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((prev) => (prev + 1) % roleRotation.length), 1700);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="role-switcher">
      {roleRotation.map((role, index) => (
        <button key={role} className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
          <span>{index === 0 ? <Globe2 /> : index === 1 ? <Sparkles /> : index === 2 ? <Code2 /> : <Rocket />}</span>
          {role}
        </button>
      ))}
    </div>
  );
}

function ArchitectureDiagram() {
  const topNodes = [
    ['Client', 'React'],
    ['API Gateway', 'Spring Boot'],
    ['Business Services', 'Modules'],
    ['Data Layer', 'MySQL'],
  ];
  const pipeline = [
    ['Code', 'GitHub'],
    ['CI/CD', 'Actions'],
    ['Build & Test', 'Maven'],
    ['Deploy', 'Docker'],
    ['Cloud', 'AWS/Azure'],
  ];

  return (
    <div className="architecture-card">
      <p>Software Architecture Overview</p>
      <div className="arch-row arch-services">
        {topNodes.map(([title, sub], index) => (
          <div className="arch-node" key={title}>
            <span>{index === 0 ? <Code2 /> : index === 1 ? <Network /> : index === 2 ? <Layers3 /> : <Database />}</span>
            <strong>{title}</strong>
            <small>{sub}</small>
          </div>
        ))}
      </div>
      <div className="pipeline-label">DevOps Pipeline</div>
      <div className="arch-row arch-pipeline">
        {pipeline.map(([title, sub], index) => (
          <div className="pipeline-node" key={title}>
            <span>{index === 0 ? <GitHubMark /> : index === 1 ? <Network /> : index === 2 ? <ShieldCheck /> : index === 3 ? <Rocket /> : <Globe2 />}</span>
            <strong>{title}</strong>
            <small>{sub}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommandCenter() {
  return (
    <motion.aside
      className="command-center"
      initial={{ opacity: 0, x: 36, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="command-head">
        <span>Software Command Center</span>
        <div><i /><i /><i /></div>
      </div>
      <div className="command-grid">
        <div className="profile-panel">
          <img src={profile.photo} alt={profile.name} />
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
          <span>Java • Spring Boot • React</span>
          <span>Cloud • DevOps • AI</span>
        </div>
        <div className="terminal-panel">
          {heroLogs.map((line, index) => (
            <p key={line} className={index === 0 ? 'prompt' : index === heroLogs.length - 1 ? 'status' : ''}>
              {index === 0 ? '$' : index === heroLogs.length - 1 ? '→' : '✓'} <span>{line.replace(/^\$\s*/, '')}</span>
            </p>
          ))}
        </div>
        <ArchitectureDiagram />
      </div>
    </motion.aside>
  );
}

function TechStackStrip() {
  return (
    <motion.div className="tech-strip" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
      <span>Signature Stack</span>
      {techStack.map((tech) => (
        <motion.div key={tech.name} className="tech-logo-item" variants={fadeUp}>
          <img src={tech.logo} alt="" />
          <p>{tech.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section section-shell">
      <div className="hero-left">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.span className="micro-label" variants={fadeUp}>Software Engineering Portfolio</motion.span>
          <motion.h1 variants={fadeUp}>Rahul,<br />Software<br />Engineer.</motion.h1>
          <motion.h2 variants={fadeUp}>Cloud • DevOps • <em>AI</em> Systems.</motion.h2>
          <motion.div variants={fadeUp}><RoleSwitcher /></motion.div>
        </motion.div>
      </div>
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={stagger}>
        <motion.p variants={fadeUp}>{profile.summary}</motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a className="primary-action" href="#projects">View Work <ArrowRight size={18} /></a>
          <a className="secondary-action" href={profile.resume} download>Resume <Download size={17} /></a>
          <a className="secondary-action" href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn <LinkedInMark size={17} /></a>
          <a className="secondary-action" href={profile.github} target="_blank" rel="noreferrer">GitHub <GitHubMark size={17} /></a>
          <a className="secondary-action" href="#contact">Contact <Mail size={17} /></a>
        </motion.div>
      </motion.div>
      <CommandCenter />
      <TechStackStrip />
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, invert = false }) {
  return (
    <motion.div className={`section-title ${invert ? 'invert' : ''}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }} variants={fadeUp}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function QuickCards() {
  const cards = [
    { icon: Code2, label: 'Stack Snapshot', title: 'Software Stack', text: 'Java, Spring Boot, Cloud, DevOps, AI and modern web technologies I work with.', link: '#skills', cta: 'Explore all skills' },
    { icon: BriefcaseBusiness, label: 'Selected Work', title: 'Project Case Studies', text: 'Case studies of real-world software, DevOps, cloud and AI-focused solutions.', link: '#projects', cta: 'View all projects' },
    { icon: FileText, label: 'Research Proof', title: 'Research & Publications', text: 'Software quality, object-oriented metrics and AI-powered insights.', link: '#research', cta: 'View research' },
    { icon: Award, label: 'Professional Credentials', title: 'Verified Certificates', text: 'Cloud, AI, software and automation certifications.', link: '#certificates', cta: 'View certificates' },
  ];

  return (
    <section className="quick-cards section-shell">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.a className="quick-card" href={card.link} key={card.title} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div className={index % 2 ? 'icon red' : 'icon'}><Icon /></div>
            <span>{card.label}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <small>{card.cta} <ArrowRight size={15} /></small>
          </motion.a>
        );
      })}
    </section>
  );
}

function RecruiterSnapshot() {
  return (
    <section className="recruiter-snapshot section-shell" aria-label="Recruiter snapshot">
      <motion.div className="snapshot-intro" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.24 }} variants={fadeUp}>
        <span className="micro-label">Recruiter Snapshot</span>
        <h2>Clear proof for backend, cloud and DevOps fresher roles.</h2>
        <p>Fast scan section for HR and technical recruiters before they go deeper into projects, certificates and resume.</p>
      </motion.div>
      <motion.div className="snapshot-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.18 }} variants={stagger}>
        {proofPoints.map((item) => (
          <motion.article className="snapshot-card" key={item.label} variants={fadeUp}>
            <span>{item.label}</span>
            <h3>{item.value}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-section section-shell section-pad">
      <SectionTitle
        eyebrow="About"
        title="Backend, Cloud & AI Engineer building production-ready systems."
  text="This section gives a quick view of who I am, what I build, and the skills, projects, internships, and certifications that shape my software engineering journey."
      />
      <div className="about-grid">
        <motion.div className="about-panel dark-panel" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <span className="panel-label"><TerminalSquare size={16} /> Engineer Profile</span>
          <h3>{profile.name}</h3>
          <p>{profile.summary}</p>
          <div className="about-list">
            <span><MapPin size={16} /> {profile.location}</span>
            <span><Mail size={16} /> {profile.email}</span>
            <span><Code2 size={16} /> {profile.headline}</span>
          </div>
        </motion.div>
        <div className="stat-grid">
          {stats.map((item) => (
            <motion.div className="stat-card" key={item.label} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section-shell section-pad skills-section">
      <SectionTitle
        eyebrow="Skills"
        title="Skills built for backend, cloud, AI and real deployment."
  text="A practical stack covering programming, APIs, databases, cloud, DevOps, and frontend tools used to build, test, and deploy real software projects."
      />
      <motion.div className="skills-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
        {skills.map((skill) => (
          <motion.article className="skill-card" key={skill.group} variants={fadeUp}>
            <div className="skill-head">
              <img src={skill.icon} alt="" />
              <div>
                <h3>{skill.group}</h3>
                <p>{skill.label}</p>
              </div>
            </div>
            <div className="skill-chip-grid">
              {skill.items.map((item) => (
                <span key={item.name} className="logo-chip">
                  <img src={item.logo} alt="" />
                  {item.name}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Workflow() {
  return (
    <section id="workflow" className="workflow-section section-shell section-pad">
      <SectionTitle
        eyebrow="Workflow"
        title="Engineering Approach"
        text="From idea to deploy-ready engineering work."
      />
      <motion.div className="workflow-track" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        {workflow.map((item) => (
          <motion.article className="workflow-card" key={item.step} variants={fadeUp}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section section-pad">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Experience"
           title="Experience shaped through internships, projects and leadership."
  text="A clear view of my hands-on work, technical responsibilities, team contributions, and the tools I used to build real software systems."
  invert
        />
        <div className="timeline">
          {experience.map((item) => (
            <motion.article className="experience-card" key={`${item.role}-${item.company}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <div className="timeline-dot" />
              <div className="experience-content">
                <div className="experience-top">
                  <div>
                    <h3>{item.role}</h3>
                    <p>{item.company}</p>
                    <small>{item.type}</small>
                  </div>
                  <span>{item.period}</span>
                </div>
                <div className="impact-line"><strong>Impact</strong><p>{item.impact}</p></div>
                <div className="stack-line">{item.stack.map((s) => <span key={s}>{s}</span>)}</div>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLink({ href, children, className = '' }) {
  const isPlaceholder = !href || href === '#';
  const classes = `project-action ${className} ${isPlaceholder ? 'disabled' : ''}`.trim();

  if (isPlaceholder) {
    return <span className={classes} title="Add this link in src/data/portfolio.js" aria-disabled="true">{children}</span>;
  }

  return (
    <a className={classes} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function ProjectVisual({ project, index }) {
  return (
    <div className="project-visual" aria-label={`${project.title} preview`}>
      <div className="mock-top"><span /><span /><span /></div>
      {project.image ? (
        <img src={project.image} alt={`${project.title} visual`} />
      ) : (
        <div className="mock-chart">
          <b style={{ height: `${40 + index * 12}%` }} />
          <b style={{ height: `${74 - index * 8}%` }} />
          <b style={{ height: `${55 + index * 5}%` }} />
          <b style={{ height: `${88 - index * 6}%` }} />
        </div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="projects-section section-shell section-pad">
      <SectionTitle
        eyebrow="Projects"
        title="Real projects built with backend, cloud, AI and deployment focus."
  text="A selected collection of my software projects showing problem solving, architecture, implementation, tech stack, and practical engineering experience."
      />
      <motion.div className="projects-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
        {projects.map((project, index) => (
          <motion.article className="project-card" key={project.title} variants={fadeUp}>
            <div className="project-copy">
              <div className="project-meta"><span>{String(index + 1).padStart(2, '0')}</span><small>{project.type}</small><em>{project.year}</em></div>
              <h3>{project.title}</h3>
              <p className="project-category">{project.category}</p>
              <p>{project.description}</p>
              <div className="focus-box"><strong>Implementation Focus</strong><span>{project.focus}</span></div>
              {project.outcome && <div className="outcome-line"><strong>Outcome</strong><span>{project.outcome}</span></div>}
              {project.proof && (
                <ul className="project-proof-list">
                  {project.proof.map((point) => <li key={point}>{point}</li>)}
                </ul>
              )}
              <div className="project-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
              <div className="project-action-row">
                <ProjectLink href={project.live}>Live Demo <ArrowRight size={15} /></ProjectLink>
                <ProjectLink href={project.github}>GitHub <GitHubMark size={15} /></ProjectLink>
                <a className="project-action ghost" href="#contact">Discuss Project <ArrowRight size={15} /></a>
              </div>
            </div>
            <ProjectVisual project={project} index={index + 1} />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Research() {
  return (
    <section id="research" className="research-section section-pad">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Research"
          title="Research focused on software quality, metrics and intelligent design analysis."
  text="A dedicated section for my research work on object-oriented design quality, class-level metrics, dashboard-based analysis, and AI-assisted improvement suggestions."
        />
        <div className="research-grid">
          <motion.div className="research-image" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <img src={research.certificate} alt="CIET 2026 certificate" />
          </motion.div>
          <motion.div className="research-card" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <span className="panel-label"><Award size={16} /> CIET 2026</span>
            <h3>{research.title}</h3>
            <p>{research.summary}</p>
            <div className="metric-row">{research.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
            <a className="secondary-action" href={research.presentation} download>Download Research Deck <Download size={17} /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const filters = useMemo(() => ['All', ...Array.from(new Set(certifications.map((cert) => cert.tag)))], []);
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? certifications : certifications.filter((cert) => cert.tag === active);

  return (
    <section id="certificates" className="cert-section section-shell section-pad">
      <SectionTitle
        eyebrow="Certificates"
        title="Certifications that support my cloud, AI and software engineering skills."
  text="A collection of verified learning achievements that show my foundation in cloud platforms, automation, AI concepts, backend development and industry-ready tools."
      />
      <div className="filter-row">
        {filters.map((filter) => (
          <button key={filter} onClick={() => setActive(filter)} className={active === filter ? 'active' : ''}>{filter}</button>
        ))}
      </div>
      <motion.div className="cert-grid" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>
        {visible.map((cert) => (
          <motion.a className="cert-card" href={cert.link} target="_blank" rel="noreferrer" key={cert.name} variants={fadeUp}>
            <img src={cert.image} alt={cert.name} />
            <div><span>{cert.tag}</span><h3>{cert.name}</h3><p>{cert.issuer} • {cert.date}</p></div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section id="resume" className="resume-section section-shell section-pad">
      <SectionTitle
        eyebrow="Resume"
        title="Resume, education and language profile in one place."
  text="A quick access section for my resume, academic background, language skills, and career documents prepared for software engineering and global opportunities."
      />
      <div className="resume-grid">
        <motion.div className="resume-card" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <span className="panel-label"><GraduationCap size={16} /> Education</span>
          {education.map((item) => (
            <div className="edu-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.place}</p>
              <span>{item.period} • {item.meta}</span>
            </div>
          ))}
        </motion.div>
        <motion.div className="resume-card dark" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <span className="panel-label"><BookOpen size={16} /> Documents</span>
          <h3>Download my resume and Japan profile.</h3>
          <p>The main resume is positioned for Software Engineering, DevOps, Cloud and Full Stack roles. The Japan profile is included for Japan-focused applications.</p>
          <div className="doc-actions">
            <a className="primary-action" href={profile.resume} download>Resume PDF <Download size={17} /></a>
            <a className="secondary-action light" href={profile.japaneseProfile} download>Japan Profile <Download size={17} /></a>
          </div>
          <div className="language-row">{languages.map((lang) => <span key={lang}>{lang}</span>)}</div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section section-pad">
      <div className="section-shell contact-card">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <span className="panel-label"><CheckCircle2 size={16} /> Contact</span>
          <h2>Let’s connect for software engineering and technology opportunities.</h2>
          <p>Open to backend, cloud, DevOps, AI and full-stack roles where I can build
  reliable systems, contribute to real projects, and grow as a software engineer.
</p>
        </motion.div>
        <motion.div className="contact-actions" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.a variants={fadeUp} href={`mailto:${profile.email}`}><Mail size={18} /> {profile.email}</motion.a>
          <motion.a variants={fadeUp} href={profile.linkedIn} target="_blank" rel="noreferrer"><LinkedInMark size={18} /> LinkedIn</motion.a>
          <motion.a variants={fadeUp} href={profile.github} target="_blank" rel="noreferrer"><GitHubMark size={18} /> GitHub</motion.a>
          <motion.a variants={fadeUp} href={profile.resume} download><Download size={18} /> Download Resume</motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollRail() {
  const active = useActiveSection();
  return (
    <div className="scroll-rail" aria-hidden="true">
      {navItems.map((item) => {
        const id = item.href.replace('#', '');
        return <a key={item.href} className={active === id ? 'active' : ''} href={item.href}><span>{item.label}</span></a>;
      })}
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    return !reducedMotion && window.localStorage.getItem('rahul-portfolio-intro-seen') !== 'true';
  });

  const closeIntro = () => {
    window.localStorage.setItem('rahul-portfolio-intro-seen', 'true');
    setShowIntro(false);
  };

  useEffect(() => {
    if (!showIntro) return undefined;
    const timer = window.setTimeout(closeIntro, 5200);
    return () => window.clearTimeout(timer);
  }, [showIntro]);

  useEffect(() => {
    document.body.style.overflow = showIntro ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showIntro]);

  useEffect(() => {
    gsap.to('.architecture-card', { y: -8, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.project-visual', { y: -6, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.18 });
    gsap.to('.tech-logo-item img', { rotate: 3, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 0.1 });
  }, []);

  return (
    <div className="app">
      <AnimatePresence>{showIntro && <IntroOverlay onEnter={closeIntro} />}</AnimatePresence>
      <Navbar />
      <ScrollRail />
      <main>
        <Hero />
        <QuickCards />
        <RecruiterSnapshot />
        <About />
        <Skills />
        <Workflow />
        <Experience />
        <Projects />
        <Research />
        <Certificates />
        <ResumeSection />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>© 2026 {profile.name}</span>
        <span>Built with precision.</span>
        <span>Systems ready.</span>
      </footer>
    </div>
  );
}

export default App;
