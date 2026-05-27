import { useEffect, useRef, useState } from "react";
import profilePhoto from "@assets/WhatsApp_Image_2026-05-27_at_6.05.24_PM_1779885467705.jpeg";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SiGithub, SiLeetcode, SiMysql, SiPostgresql, SiJavascript, SiHtml5, SiCss, SiPython } from "react-icons/si";
import { FaLinkedin, FaJava } from "react-icons/fa";
import {
  Mail, Phone, MapPin, ExternalLink, ChevronDown,
  Sparkles, GraduationCap, Briefcase, Award, ArrowUpRight,
  Code2, Database, Cpu, Star
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function useReveal(margin = "-60px") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });
  return { ref, isInView };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isInView } = useReveal();
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

/* Floating orb background element */
function Orb({ className }: { className: string }) {
  return <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />;
}

/* Animated skill chip */
function SkillChip({ icon, label, color }: { icon?: React.ReactNode; label: string; color: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.06, y: -2 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 cursor-default ${color}`}
      data-testid={`skill-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      {label}
    </motion.div>
  );
}

/* Stat card in about section */
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card rounded-2xl p-5 flex flex-col gap-2 transition-all duration-300"
    >
      <div className="text-purple-400">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

const skillGroups = [
  {
    label: "Frontend",
    icon: <Code2 className="w-4 h-4" />,
    color: "from-violet-500/20 to-indigo-500/20 border-violet-500/30",
    chips: [
      { label: "HTML5", icon: <SiHtml5 className="text-orange-400" />, color: "border-orange-500/30 bg-orange-500/10 text-orange-300" },
      { label: "CSS3", icon: <SiCss className="text-blue-400" />, color: "border-blue-500/30 bg-blue-500/10 text-blue-300" },
      { label: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300" },
    ],
  },
  {
    label: "Languages",
    icon: <Cpu className="w-4 h-4" />,
    color: "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30",
    chips: [
      { label: "Java", icon: <FaJava className="text-red-400" />, color: "border-red-500/30 bg-red-500/10 text-red-300" },
      { label: "Python", icon: <SiPython className="text-sky-400" />, color: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
      { label: "C", icon: null, color: "border-slate-500/30 bg-slate-500/10 text-slate-300" },
    ],
  },
  {
    label: "Databases",
    icon: <Database className="w-4 h-4" />,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    chips: [
      { label: "MySQL", icon: <SiMysql className="text-cyan-400" />, color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300" },
      { label: "PostgreSQL", icon: <SiPostgresql className="text-indigo-400" />, color: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300" },
      { label: "DB Management", icon: null, color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
    ],
  },
  {
    label: "Core CS",
    icon: <Star className="w-4 h-4" />,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    chips: [
      { label: "DSA", icon: null, color: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
      { label: "Problem Solving", icon: null, color: "border-orange-500/30 bg-orange-500/10 text-orange-300" },
      { label: "System Design", icon: null, color: "border-rose-500/30 bg-rose-500/10 text-rose-300" },
    ],
  },
];

const softSkills = ["Time Management", "Adaptability", "Leadership"];

const projects = [
  {
    number: "01",
    title: "Unified Loan Intelligence System",
    type: "Academic Project",
    description:
      "Full-stack intelligent system that integrates borrower data, automates credit risk analysis, and enables real-time monitoring of loan portfolios. Delivers scalable, data-driven decision-making with improved approval speed and accuracy.",
    highlights: ["Automated credit risk analysis", "Real-time monitoring dashboard", "Data-driven decision engine", "Scalable architecture"],
    tags: ["Java", "SQL", "Data Analysis", "System Design"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/20 hover:border-violet-500/50",
    dotColor: "bg-violet-400",
    tagColor: "bg-violet-500/10 text-violet-300 border-violet-500/25",
  },
  {
    number: "02",
    title: "Responsive Portfolio Website",
    type: "Front End Intern — Appin Technology",
    description:
      "Professional internship project building a fully responsive portfolio website using HTML, CSS, and JavaScript. Implemented optimized layouts and polished interactive UI components for seamless cross-device experiences.",
    highlights: ["Cross-device responsive design", "Interactive UI components", "Performance-optimized", "Delivered in production"],
    tags: ["HTML", "CSS", "JavaScript", "UX Design"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20 hover:border-emerald-500/50",
    dotColor: "bg-emerald-400",
    tagColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
  },
];

const certifications = [
  {
    title: "Design Thinking & Innovation",
    issuer: "Coursera",
    gradient: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/25 hover:border-pink-500/50",
    icon: "✦",
    iconColor: "text-pink-400",
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    gradient: "from-sky-500/20 to-cyan-500/10",
    border: "border-sky-500/25 hover:border-sky-500/50",
    icon: "⬡",
    iconColor: "text-sky-400",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 60], ["rgba(8,8,20,0)", "rgba(8,8,20,0.85)"]);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { threshold: 0.35 }
    );
    ["home", ...navLinks.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#060612] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
        data-testid="nav-bar"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-sm font-bold gradient-text-purple tracking-widest"
          >
            KM
          </motion.span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                data-testid={`nav-link-${id}`}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  activeSection === id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-violet-500 to-teal-400 transition-all duration-300 ${activeSection === id ? "w-full" : "w-0 group-hover:w-full"}`} />
              </motion.a>
            ))}
            <motion.a
              href="mailto:k4386228@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-1.5 text-sm font-medium rounded-full border border-violet-500/50 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-200"
              data-testid="nav-contact"
            >
              Hire Me
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background orbs */}
        <Orb className="w-[600px] h-[600px] bg-violet-600/20 top-[-100px] right-[-100px]" />
        <Orb className="w-[400px] h-[400px] bg-teal-500/15 bottom-[-50px] left-[-50px]" />
        <Orb className="w-[300px] h-[300px] bg-fuchsia-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* LEFT — text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex-1 min-w-0"
            >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300">
                <Sparkles className="w-3 h-3" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-[1.0] mb-2 tracking-tight"
              data-testid="hero-name"
            >
              <span className="text-white">Kanchana</span>
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-bold leading-[1.0] mb-6 tracking-tight gradient-text"
            >
              M.
            </motion.h1>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-violet-500 to-transparent" />
              <span className="font-mono text-sm text-slate-400 tracking-widest uppercase">
                Software Developer
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
            >
              B.Tech Information Technology student at Rathinam Technical Campus with a{" "}
              <span className="text-white font-semibold">CGPA of 8.91</span>. Passionate about
              building clean, efficient software with Java, SQL, and modern web technologies.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
              <a
                href="https://github.com/mkanchana1412-cpu"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-github-hero"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10"
              >
                <SiGithub className="w-4 h-4" />
                GitHub Profile
              </a>
              <a
                href="https://linkedin.com/in/kanchana-m-84178b316"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin-hero"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-slate-200 text-sm font-medium hover:border-violet-500/60 hover:text-violet-300 hover:bg-violet-500/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FaLinkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/D9tWJRJfxK"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-leetcode-hero"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/15 text-slate-200 text-sm font-medium hover:border-amber-500/60 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200 hover:-translate-y-0.5"
              >
                <SiLeetcode className="w-4 h-4" />
                LeetCode
              </a>
            </motion.div>

            {/* Hero stats bar */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-8 pt-8 border-t border-white/8"
            >
              {[
                { value: "8.91", label: "CGPA" },
                { value: "2+", label: "Projects" },
                { value: "2", label: "Certifications" },
                { value: "6+", label: "Technologies" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5" data-testid={`hero-stat-${stat.label.toLowerCase()}`}>
                  <span className="text-2xl font-bold gradient-text-purple">{stat.value}</span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">{stat.label}</span>
                </div>
              ))}
            </motion.div>
            </motion.div>

            {/* RIGHT — photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 flex items-center justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-teal-400 blur-2xl opacity-40 scale-110" />
                {/* Spinning gradient border */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-[3px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-teal-400">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 ring-4 ring-slate-900">
                    <img
                      src={profilePhoto}
                      alt="Kanchana M"
                      className="w-full h-full object-cover object-top"
                      data-testid="profile-photo"
                    />
                  </div>
                </div>
                {/* Floating badge — CGPA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -bottom-3 -right-3 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-violet-500/40 shadow-xl shadow-violet-500/20"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-white">8.91 CGPA</span>
                </motion.div>
                {/* Floating badge — B.Tech */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="absolute -top-3 -left-3 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-teal-500/40 shadow-xl shadow-teal-500/10"
                >
                  <span className="text-xs font-mono text-teal-400 font-semibold">B.Tech IT</span>
                </motion.div>
              </div>
            </motion.div>

          </div>{/* end flex row */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <a href="#about" data-testid="scroll-down" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors group">
              <span className="text-xs font-mono tracking-widest">SCROLL</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="relative py-28 overflow-hidden">
        <Orb className="w-[500px] h-[500px] bg-violet-600/10 top-0 left-1/2" />
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-violet-500" />
              <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">About Me</span>
            </motion.div>
            <div className="grid lg:grid-cols-2 gap-14 items-start">
              <div>
                <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Turning ideas into{" "}
                  <span className="gradient-text">working software.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-5">
                  I'm an Information Technology student passionate about software development.
                  My journey has taken me from academic projects like the Unified Loan Intelligence
                  System to a professional internship at Appin Technology, where I delivered
                  real-world frontend solutions.
                </motion.p>
                <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed mb-8">
                  I believe great software is built at the intersection of technical rigor and
                  creative problem-solving. I'm fluent in Tamil and English, and bring strong
                  soft skills — leadership, adaptability, and time management — to every team.
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  {softSkills.map((s) => (
                    <span
                      key={s}
                      className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-slate-300"
                      data-testid={`soft-skill-${s.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {s}
                    </span>
                  ))}
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <GraduationCap className="w-5 h-5" />, value: "8.91", label: "Current CGPA" },
                  { icon: <Briefcase className="w-5 h-5" />, value: "2024", label: "Internship Year" },
                  { icon: <Award className="w-5 h-5" />, value: "2027", label: "Graduation Year" },
                  { icon: <MapPin className="w-5 h-5" />, value: "CBE", label: "Coimbatore, TN" },
                ].map((s) => (
                  <StatCard key={s.label} icon={s.icon} value={s.value} label={s.label} />
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />
        <Orb className="w-[400px] h-[400px] bg-teal-600/10 bottom-0 right-0" />
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-teal-400" />
              <span className="font-mono text-xs text-teal-400 tracking-widest uppercase">Skills</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="gradient-text">toolkit.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 mb-12 max-w-xl">
              Technologies and tools I use to build things — organized by domain.
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skillGroups.map((group) => (
                <motion.div
                  key={group.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`relative p-6 rounded-2xl border glass-card transition-all duration-300 gradient-border`}
                  data-testid={`skill-group-${group.label.toLowerCase()}`}
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${group.color} opacity-40 pointer-events-none`} />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-5 text-slate-400">
                      {group.icon}
                      <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">{group.label}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {group.chips.map((chip) => (
                        <SkillChip key={chip.label} icon={chip.icon} label={chip.label} color={chip.color} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="relative py-28 overflow-hidden">
        <Orb className="w-[300px] h-[300px] bg-fuchsia-600/10 top-0 left-0" />
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-fuchsia-400" />
              <span className="font-mono text-xs text-fuchsia-400 tracking-widest uppercase">Experience</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-12">
              Where I've <span className="gradient-text">been.</span>
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-fuchsia-500/30 to-transparent hidden md:block" />

              <div className="space-y-6">
                {/* Internship */}
                <motion.div variants={fadeUp} className="md:pl-16 relative" data-testid="exp-internship">
                  <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-300 hidden md:block glow-purple" />
                  <div className="glass-card gradient-border rounded-2xl p-7 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="font-mono text-xs text-violet-400 tracking-wider">2024</span>
                        <h3 className="text-xl font-bold text-white mt-1">Front End Developer Intern</h3>
                        <p className="text-violet-300 font-medium mt-0.5">Appin Technology</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300">
                        <Briefcase className="w-3 h-3" />
                        Internship
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Developed a responsive portfolio website using HTML, CSS, and JavaScript.
                      Implemented optimized layouts and interactive UI components to enhance user
                      experience across different devices, delivering polished production work.
                    </p>
                  </div>
                </motion.div>

                {/* B.Tech */}
                <motion.div variants={fadeUp} className="md:pl-16 relative" data-testid="exp-btech">
                  <div className="absolute left-3.5 top-6 w-3 h-3 rounded-full bg-fuchsia-500/60 border-2 border-fuchsia-400/50 hidden md:block" />
                  <div className="glass-card gradient-border rounded-2xl p-7 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <span className="font-mono text-xs text-fuchsia-400 tracking-wider">2023 – 2027</span>
                        <h3 className="text-xl font-bold text-white mt-1">B.Tech Information Technology</h3>
                        <p className="text-fuchsia-300 font-medium mt-0.5">Rathinam Technical Campus, Coimbatore</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300">
                        <GraduationCap className="w-3 h-3" />
                        CGPA 8.91
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pursuing a full degree in Information Technology with a strong focus on
                      software development, data structures, database systems, and problem-solving.
                      Consistently maintaining a top academic record throughout.
                    </p>
                  </div>
                </motion.div>

                {/* HSC */}
                <motion.div variants={fadeUp} className="md:pl-16 relative" data-testid="exp-hsc">
                  <div className="absolute left-3.5 top-6 w-2.5 h-2.5 rounded-full bg-slate-600 border-2 border-slate-500 hidden md:block" />
                  <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.02]">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-xs text-slate-500 tracking-wider">Pre-2023</span>
                        <h3 className="text-base font-semibold text-slate-300 mt-1">HSC — GMHSSC, Hosur</h3>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/20 text-slate-400">
                        83%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-transparent pointer-events-none" />
        <Orb className="w-[500px] h-[500px] bg-violet-600/10 top-0 right-0" />
        <Orb className="w-[300px] h-[300px] bg-emerald-600/10 bottom-0 left-0" />
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-emerald-400" />
              <span className="font-mono text-xs text-emerald-400 tracking-widest uppercase">Projects</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-12">
              Things I've <span className="gradient-text">built.</span>
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className={`relative overflow-hidden rounded-3xl border glass-card p-8 flex flex-col gap-5 transition-all duration-400 ${p.borderColor}`}
                  data-testid={`project-card-${i}`}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} pointer-events-none`} />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`font-mono text-5xl font-black opacity-15 ${p.accentColor}`}>{p.number}</span>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-1">{p.type}</p>
                        <h3 className="text-xl font-bold text-white mt-2 leading-snug">{p.title}</h3>
                      </div>
                      <ArrowUpRight className={`w-5 h-5 ${p.accentColor} opacity-60 mt-1 flex-shrink-0`} />
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-xs text-slate-400">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.dotColor}`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1 rounded-full border font-medium ${p.tagColor}`}
                          data-testid={`tag-${tag.toLowerCase().replace(/\s/g, "-")}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-amber-400" />
              <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">Certifications</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-10">
              Always <span className="gradient-text">learning.</span>
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.title}
                  variants={fadeUp}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className={`relative overflow-hidden rounded-2xl border glass-card p-6 flex items-center gap-4 transition-all duration-300 ${cert.border}`}
                  data-testid={`cert-${cert.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} pointer-events-none`} />
                  <div className="relative">
                    <span className={`text-2xl font-black ${cert.iconColor}`}>{cert.icon}</span>
                  </div>
                  <div className="relative">
                    <p className="text-sm font-semibold text-white">{cert.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative py-28 overflow-hidden">
        <Orb className="w-[500px] h-[500px] bg-violet-600/15 top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-6xl mx-auto px-6">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-6 bg-violet-400" />
                <span className="font-mono text-xs text-violet-400 tracking-widest uppercase">Get In Touch</span>
                <span className="h-px w-6 bg-violet-400" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold mb-5">
                Let's <span className="gradient-text">connect.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-400 leading-relaxed">
                I'm actively looking for entry-level Software Developer opportunities.
                If you have a role that fits or just want to say hello, my inbox is always open.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
              {/* Email / Phone / Location */}
              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  { icon: <Mail className="w-4 h-4" />, label: "k4386228@gmail.com", href: "mailto:k4386228@gmail.com", testId: "contact-email", color: "hover:border-violet-500/50 hover:text-violet-300" },
                  { icon: <Phone className="w-4 h-4" />, label: "8526543130", href: "tel:8526543130", testId: "contact-phone", color: "hover:border-teal-500/50 hover:text-teal-300" },
                  { icon: <MapPin className="w-4 h-4" />, label: "Tamil Nadu, Coimbatore", href: null, testId: "contact-location", color: "" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-200 ${item.color}`}
                    data-testid={item.testId}
                  >
                    <span className="text-slate-500">{item.icon}</span>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">{item.label}</span>
                    )}
                  </div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div variants={fadeUp} className="space-y-3">
                {[
                  { icon: <SiGithub className="w-5 h-5" />, label: "GitHub", sub: "github.com/mkanchana1412-cpu", href: "https://github.com/mkanchana1412-cpu", testId: "contact-github", color: "hover:border-white/30 hover:bg-white/8" },
                  { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", sub: "kanchana-m-84178b316", href: "https://linkedin.com/in/kanchana-m-84178b316", testId: "contact-linkedin", color: "hover:border-blue-500/40 hover:bg-blue-500/8" },
                  { icon: <SiLeetcode className="w-5 h-5" />, label: "LeetCode", sub: "leetcode.com/u/D9tWJRJfxK", href: "https://leetcode.com/u/D9tWJRJfxK", testId: "contact-leetcode", color: "hover:border-amber-500/40 hover:bg-amber-500/8" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={link.testId}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm transition-all duration-200 group ${link.color}`}
                  >
                    <span className="text-slate-400 group-hover:text-white transition-colors">{link.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200">{link.label}</p>
                      <p className="text-xs text-slate-500 truncate">{link.sub}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-colors" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Big CTA */}
            <motion.div variants={fadeUp} className="text-center mt-12">
              <a
                href="mailto:k4386228@gmail.com"
                data-testid="cta-email"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/30 glow-purple"
              >
                <Mail className="w-4 h-4" />
                Send me an email
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-xs text-slate-600">Kanchana M — B.Tech IT, 2027</span>
          <span className="font-mono text-xs text-slate-600">Rathinam Technical Campus · Coimbatore</span>
        </div>
      </footer>

    </div>
  );
}
