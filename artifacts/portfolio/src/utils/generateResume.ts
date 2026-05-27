import { jsPDF } from "jspdf";

export function generateResumePDF() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const margin = 18;
  const col2 = 130;
  let y = 0;

  const hex = (h: string) => {
    const r = parseInt(h.slice(1, 3), 16);
    const g = parseInt(h.slice(3, 5), 16);
    const b = parseInt(h.slice(5, 7), 16);
    return { r, g, b };
  };

  const violet = hex("#7c3aed");
  const dark = hex("#0f0f1a");
  const mid = hex("#475569");
  const light = hex("#f1f5f9");

  const setColor = (c: { r: number; g: number; b: number }) =>
    doc.setTextColor(c.r, c.g, c.b);
  const setFill = (c: { r: number; g: number; b: number }) =>
    doc.setFillColor(c.r, c.g, c.b);
  const setDraw = (c: { r: number; g: number; b: number }) =>
    doc.setDrawColor(c.r, c.g, c.b);

  // ── Header band ──────────────────────────────────────────────────────────
  setFill(dark);
  doc.rect(0, 0, W, 42, "F");

  // Violet accent strip
  setFill(violet);
  doc.rect(0, 0, 5, 42, "F");

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  setColor(light);
  doc.text("Kanchana M", margin, 16);

  // Role
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor({ r: 167, g: 139, b: 250 });
  doc.text("SOFTWARE DEVELOPER  ·  B.TECH INFORMATION TECHNOLOGY", margin, 23);

  // Contact line
  doc.setFontSize(8);
  setColor({ r: 148, g: 163, b: 184 });
  doc.text(
    "k4386228@gmail.com  ·  8526543130  ·  Tamil Nadu, Coimbatore",
    margin,
    30
  );
  doc.text(
    "github.com/mkanchana1412-cpu  ·  linkedin.com/in/kanchana-m-84178b316  ·  leetcode.com/u/D9tWJRJfxK",
    margin,
    36
  );

  y = 50;

  // ── Section helper ────────────────────────────────────────────────────────
  const section = (title: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor(violet);
    doc.text(title.toUpperCase(), margin, y);
    setDraw(violet);
    doc.setLineWidth(0.4);
    doc.line(margin + doc.getTextWidth(title.toUpperCase()) + 2, y - 0.8, W - margin, y - 0.8);
    y += 5;
  };

  const bodyText = (text: string, x = margin, maxW = W - margin * 2) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(mid);
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, y);
    y += lines.length * 4.5;
  };

  const label = (text: string, x = margin) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    setColor(dark);
    doc.text(text, x, y);
  };

  const badge = (text: string, x: number) => {
    const tw = doc.getTextWidth(text) + 4;
    const bh = 4.5;
    setFill({ r: 237, g: 233, b: 254 });
    setDraw({ r: 167, g: 139, b: 250 });
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y - 3.2, tw, bh, 1, 1, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor(violet);
    doc.text(text, x + 2, y);
    return tw + 2;
  };

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  section("Education");

  label("B.Tech Information Technology");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(mid);
  doc.text("2023 – 2027", W - margin, y, { align: "right" });
  y += 4.5;
  bodyText("Rathinam Technical Campus, Coimbatore  ·  CGPA: 8.91");
  y += 1;

  label("Higher Secondary (HSC)");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(mid);
  doc.text("Pre-2023", W - margin, y, { align: "right" });
  y += 4.5;
  bodyText("GMHSSC, Hosur  ·  83%");
  y += 4;

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  section("Experience");

  label("Frontend Developer Intern  —  Appin Technology, Coimbatore");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  setColor(mid);
  doc.text("Feb 2025 – Apr 2025", W - margin, y, { align: "right" });
  y += 4.5;
  bodyText(
    "Developed and deployed a fully responsive client website using HTML5, CSS3, and JavaScript. " +
    "Optimised for cross-browser compatibility and mobile-first design. Participated in code reviews " +
    "and collaborated with senior developers to refine UI/UX standards."
  );
  y += 2;

  const bullets = [
    "Responsive client website (HTML, CSS, JS)",
    "Cross-browser & mobile-first development",
    "Improved page load speed through optimisation",
    "Collaborated in Agile code reviews",
  ];
  bullets.forEach((b) => {
    setFill(violet);
    doc.circle(margin + 1.5, y - 1.2, 0.8, "F");
    bodyText(b, margin + 4.5, W - margin * 2 - 4.5);
    y -= 0;
  });
  y += 3;

  // ── PROJECTS ─────────────────────────────────────────────────────────────
  section("Projects");

  label("Unified Loan Intelligence System");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  setColor(mid);
  doc.text("Academic Project", W - margin, y, { align: "right" });
  y += 4.5;
  bodyText(
    "Full-stack intelligent system integrating borrower data, automating credit risk analysis, and " +
    "enabling real-time loan portfolio monitoring. Delivers scalable, data-driven decision-making " +
    "with improved approval speed and accuracy."
  );
  y += 1;
  const loanTags = ["Java", "SQL", "Data Analysis", "System Design"];
  let bx = margin;
  loanTags.forEach((t) => { bx += badge(t, bx); });
  y += 5;

  label("Responsive Web Application  —  Appin Technology Internship");
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  setColor(mid);
  doc.text("Professional Project", W - margin, y, { align: "right" });
  y += 4.5;
  bodyText(
    "Built a production-grade responsive website for a real client during the Appin Technology internship. " +
    "Implemented semantic HTML, modern CSS layouts, and vanilla JavaScript for interactive components."
  );
  y += 1;
  const webTags = ["HTML5", "CSS3", "JavaScript", "Responsive Design"];
  bx = margin;
  webTags.forEach((t) => { bx += badge(t, bx); });
  y += 6;

  // ── SKILLS ───────────────────────────────────────────────────────────────
  section("Technical Skills");

  const skillGroups = [
    { label: "Languages", items: ["Java", "Python", "C"] },
    { label: "Web", items: ["HTML5", "CSS3", "JavaScript"] },
    { label: "Databases", items: ["MySQL", "PostgreSQL"] },
    { label: "Concepts", items: ["OOP", "DSA", "DBMS", "OS", "CN", "Problem Solving"] },
  ];

  skillGroups.forEach((g) => {
    label(g.label + ":", margin);
    bx = margin + doc.getTextWidth(g.label + ": ") + 2;
    g.items.forEach((item) => { bx += badge(item, bx); });
    y += 6;
  });

  y += 2;

  // ── CERTIFICATIONS ───────────────────────────────────────────────────────
  section("Certifications");

  [
    { title: "Java Programming Certification", issuer: "HackerRank" },
    { title: "SQL (Advanced) Certification", issuer: "HackerRank" },
  ].forEach((cert) => {
    setFill(violet);
    doc.circle(margin + 1.5, y - 1.2, 0.8, "F");
    label(cert.title, margin + 4.5);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(mid);
    doc.text("  ·  " + cert.issuer, margin + 4.5 + doc.getTextWidth(cert.title), y);
    y += 5.5;
  });

  y += 3;

  // ── Footer ───────────────────────────────────────────────────────────────
  setFill(dark);
  doc.rect(0, 285, W, 12, "F");
  setFill(violet);
  doc.rect(0, 285, 5, 12, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  setColor({ r: 148, g: 163, b: 184 });
  doc.text(
    "Kanchana M  ·  B.Tech IT, Rathinam Technical Campus, Coimbatore  ·  Graduating 2027",
    W / 2,
    292,
    { align: "center" }
  );

  doc.save("Kanchana_M_Resume.pdf");
}
