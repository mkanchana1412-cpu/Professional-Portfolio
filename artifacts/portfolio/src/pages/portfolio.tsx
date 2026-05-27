import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import {
  Mail, Phone, MapPin, ExternalLink, ChevronDown,
  Code2, Database, Layers, Brain, GraduationCap,
  Briefcase, Award, Globe, Terminal
} from "lucide-react";

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 mb-10">
      <span className="h-px w-8 bg-primary block" />
      <span className="text-primary font-mono text-sm tracking-widest uppercase font-medium">
        {children}
      </span>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      variants={fadeUp}
      className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-12 leading-tight"
    >
      {children}
    </motion.h2>
  );
}

const skills = [
  {
    category: "Frontend",
    icon: <Layers className="w-5 h-5" />,
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend & Languages",
    icon: <Terminal className="w-5 h-5" />,
    items: ["Java", "Python", "C"],
  },
  {
    category: "Databases",
    icon: <Database className="w-5 h-5" />,
    items: ["MySQL", "PostgreSQL", "Database Management"],
  },
  {
    category: "Computer Science",
    icon: <Brain className="w-5 h-5" />,
    items: ["Data Structures & Algorithms", "Problem Solving"],
  },
  {
    category: "Soft Skills",
    icon: <Code2 className="w-5 h-5" />,
    items: ["Time Management", "Adaptability", "Leadership"],
  },
];

const projects = [
  {
    title: "Unified Loan Intelligence System",
    type: "Academic Project",
    description:
      "A full-stack system that integrates borrower data, automates credit risk analysis using intelligent algorithms, and enables real-time monitoring of loan portfolios. Improved loan approval speed and accuracy through data-driven decision-making, with scalable architecture designed for enterprise reliability.",
    highlights: [
      "Automated credit risk analysis",
      "Real-time loan monitoring dashboard",
      "Scalable data-driven architecture",
      "Improved approval accuracy",
    ],
    tags: ["Java", "SQL", "Data Analysis", "System Design"],
    accent: "teal",
  },
  {
    title: "Responsive Portfolio Website",
    type: "Front End Developer Intern — Appin Technology",
    description:
      "Developed a fully responsive portfolio website during a professional internship, showcasing projects and technical skills across devices. Implemented optimized layouts and interactive UI components to deliver a polished user experience on desktop and mobile.",
    highlights: [
      "Cross-device responsive design",
      "Interactive UI components",
      "Performance-optimized layouts",
      "Professional internship delivery",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    accent: "amber",
  },
];

const certifications = [
  {
    title: "Design Thinking & Innovation",
    issuer: "Coursera",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    icon: <Terminal className="w-5 h-5" />,
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const navBlur = useTransform(scrollY, [0, 80], [0, 12]);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
        data-testid="nav-bar"
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm text-primary font-semibold tracking-wide">KM</span>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                data-testid={`nav-link-${id}`}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">
              Software Developer
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
            data-testid="hero-name"
          >
            Kanchana M
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            Building efficient, thoughtful software with Java, SQL, and modern web technologies.
            Currently pursuing B.Tech IT with a{" "}
            <span className="text-foreground font-medium">CGPA of 8.91</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="https://github.com/mkanchana1412-cpu"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-github-hero"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-all duration-200 hover:-translate-y-0.5"
            >
              <SiGithub className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kanchana-m-84178b316"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-linkedin-hero"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary hover:text-primary transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/D9tWJRJfxK"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-leetcode-hero"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-medium hover:border-accent hover:text-accent transition-all duration-200 hover:-translate-y-0.5"
            >
              <SiLeetcode className="w-4 h-4" />
              LeetCode
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-6 flex flex-col items-start gap-1"
          >
            <a
              href="#about"
              data-testid="scroll-down"
              className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronDown className="w-4 h-4 animate-bounce" />
              scroll to explore
            </a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>About</SectionLabel>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <SectionTitle>
                  Thoughtful code,<br />real impact.
                </SectionTitle>
              </div>
              <div className="space-y-5">
                <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                  I'm an Information Technology student at Rathinam Technical Campus, Coimbatore,
                  with a current CGPA of 8.91. My goal is to contribute to meaningful software
                  projects where I can apply my knowledge of Java, SQL, and web technologies to
                  build practical, efficient applications.
                </motion.p>
                <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                  Through my internship at Appin Technology and academic projects, I've developed
                  an appreciation for clean architecture and user-centered design. I'm driven by
                  the challenge of turning complex problems into clear, maintainable solutions.
                </motion.p>
                <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { icon: <GraduationCap className="w-4 h-4" />, label: "B.Tech IT", sub: "Rathinam Technical Campus" },
                    { icon: <Award className="w-4 h-4" />, label: "CGPA 8.91", sub: "2023 – 2027" },
                    { icon: <MapPin className="w-4 h-4" />, label: "Coimbatore", sub: "Tamil Nadu" },
                    { icon: <Globe className="w-4 h-4" />, label: "Tamil & English", sub: "Languages" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50"
                      data-testid={`about-stat-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <span className="text-primary mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-muted/30 border-y border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>What I work with.</SectionTitle>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {skills.map((group) => (
                <motion.div
                  key={group.category}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
                  data-testid={`skill-card-${group.category.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-primary">{group.icon}</span>
                    <h3 className="text-sm font-semibold text-foreground">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground font-medium group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                        data-testid={`skill-tag-${skill.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>Experience</SectionLabel>
            <SectionTitle>Where I've worked and studied.</SectionTitle>
            <div className="space-y-8">
              {/* Internship */}
              <motion.div
                variants={fadeUp}
                className="grid md:grid-cols-[200px_1fr] gap-6 group"
                data-testid="experience-internship"
              >
                <div className="pt-1">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">2024</p>
                  <div className="w-2 h-2 rounded-full bg-primary mt-3 hidden md:block" />
                </div>
                <div className="p-6 rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 bg-card">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">Front End Developer Intern</h3>
                      <p className="text-primary text-sm font-medium mt-0.5">Appin Technology</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                      <Briefcase className="w-3 h-3" />
                      Internship
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Developed a responsive portfolio website using HTML, CSS, and JavaScript to showcase
                    projects and technical skills. Implemented optimized layouts and interactive UI
                    components to enhance user experience across different devices.
                  </p>
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                variants={fadeUp}
                className="grid md:grid-cols-[200px_1fr] gap-6"
                data-testid="experience-education"
              >
                <div className="pt-1">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">2023 – 2027</p>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground mt-3 hidden md:block" />
                </div>
                <div className="p-6 rounded-2xl border border-border/60 hover:border-primary/20 hover:shadow-md transition-all duration-300 bg-card">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">B.Tech Information Technology</h3>
                      <p className="text-primary text-sm font-medium mt-0.5">Rathinam Technical Campus, Coimbatore</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                      <GraduationCap className="w-3 h-3" />
                      CGPA 8.91
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Pursuing a full degree in Information Technology with a focus on software development,
                    data structures, database management, and problem-solving. Consistently maintaining a
                    strong academic record.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="grid md:grid-cols-[200px_1fr] gap-6"
                data-testid="experience-hsc"
              >
                <div className="pt-1">
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Pre-2023</p>
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40 mt-3 hidden md:block" />
                </div>
                <div className="p-6 rounded-2xl border border-border/40 bg-card/60">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">HSC</h3>
                      <p className="text-muted-foreground text-sm mt-0.5">GMHSSC, Hosur, Coimbatore</p>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full whitespace-nowrap">
                      83%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-muted/20 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>Projects</SectionLabel>
            <SectionTitle>Things I've built.</SectionTitle>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  className="flex flex-col p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
                  data-testid={`project-card-${i}`}
                >
                  <div className="mb-5">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {project.type}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-2 leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                        data-testid={`project-tag-${tag.toLowerCase().replace(/\s/g, "-")}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>Certifications</SectionLabel>
            <SectionTitle>Continuous learning.</SectionTitle>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  data-testid={`cert-card-${cert.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{cert.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <Section>
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Let's connect.</SectionTitle>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <motion.div variants={fadeUp} className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I'm actively looking for entry-level Software Developer opportunities. If you're
                  working on something interesting or have a role that fits, I'd love to hear from you.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: <Mail className="w-4 h-4" />, label: "k4386228@gmail.com", href: "mailto:k4386228@gmail.com", testId: "contact-email" },
                    { icon: <Phone className="w-4 h-4" />, label: "8526543130", href: "tel:8526543130", testId: "contact-phone" },
                    { icon: <MapPin className="w-4 h-4" />, label: "Tamil Nadu, Coimbatore", href: null, testId: "contact-location" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3" data-testid={item.testId}>
                      <span className="text-primary">{item.icon}</span>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                          {item.label}
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  {
                    icon: <SiGithub className="w-5 h-5" />,
                    label: "GitHub",
                    sub: "github.com/mkanchana1412-cpu",
                    href: "https://github.com/mkanchana1412-cpu",
                    testId: "contact-github",
                  },
                  {
                    icon: <FaLinkedin className="w-5 h-5" />,
                    label: "LinkedIn",
                    sub: "linkedin.com/in/kanchana-m-84178b316",
                    href: "https://linkedin.com/in/kanchana-m-84178b316",
                    testId: "contact-linkedin",
                  },
                  {
                    icon: <SiLeetcode className="w-5 h-5" />,
                    label: "LeetCode",
                    sub: "leetcode.com/u/D9tWJRJfxK",
                    href: "https://leetcode.com/u/D9tWJRJfxK",
                    testId: "contact-leetcode",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={link.testId}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border/60 hover:border-primary/50 hover:shadow-md transition-all duration-200 group bg-card"
                  >
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">
                      {link.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.sub}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            Kanchana M — B.Tech Information Technology
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Rathinam Technical Campus, Coimbatore
          </p>
        </div>
      </footer>
    </div>
  );
}
