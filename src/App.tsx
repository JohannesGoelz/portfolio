import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Sun,
  Moon,
  Menu,
  X,
  MapPin,
  Linkedin,
  Github,
  Plus,
  Minus,
  MoveUpRight,
} from "lucide-react";
import { useLanguage } from "./i18n/context";
import { profile } from "./config";
import s from "./App.module.css";

const sectionIds = [
  "education",
  "experience",
  "projects",
  "skills",
  "community",
  "contact",
];
const labelIndex = [3, 1, 2, 4, 5, 6];
function Languages() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={s.languages} aria-label="Sprache / Language">
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          lang={l}
          aria-pressed={language === l}
          onClick={() => setLanguage(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
function OutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
function Network({ theme }: { theme: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0,
      height = 0,
      frame = 0,
      time = 0,
      visible = true;
    const nodes = Array.from({ length: 27 }, (_, i) => ({
      x: ((i * 43 + 11) % 101) / 101,
      y: ((i * 61 + 17) % 103) / 103,
      phase: i * 1.7,
    }));
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((n) => ({
        x: n.x * width + Math.sin(time + n.phase) * 9,
        y: n.y * height + Math.cos(time * 0.8 + n.phase) * 10,
      }));
      for (let i = 0; i < points.length; i++)
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i],
            b = points[j],
            d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 180) {
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(200,196,186,${(1 - d / 180) * 0.14})`
                : `rgba(73,79,76,${(1 - d / 180) * 0.13})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      for (const p of points) {
        ctx.fillStyle = theme === "dark" ? "#b6b2a240" : "#56605c45";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const animate = () => {
      time += 0.002;
      render();
      frame = requestAnimationFrame(animate);
    };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(devicePixelRatio, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    };
    const start = () => {
      cancelAnimationFrame(frame);
      render();
      if (!media.matches && visible) frame = requestAnimationFrame(animate);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = () => {
      visible = !document.hidden;
      start();
    };
    resize();
    start();
    media.addEventListener("change", start);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      media.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [theme]);
  return <canvas ref={ref} className={s.network} aria-hidden="true" />;
}
function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <div className={s.sectionHeading}>
        <span>{num}</span>
        <h2 id={`${id}-title`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Project({
  title,
  kind,
  text,
  tags,
  href,
  hrefText,
  details,
  index,
}: {
  title: string;
  kind: string;
  text: string;
  tags: string[];
  href: string;
  hrefText: string;
  details: string;
  index: string;
}) {
  const [open, setOpen] = useState(false);
  const { language, t } = useLanguage();
  const detailId = `project-${index}`;
  return (
    <article className={s.project}>
      <div className={s.projectNumber}>{index}</div>
      <div className={s.projectContent}>
        <p className={s.kicker}>{kind}</p>
        <h3>{title}</h3>
        <p>{text}</p>
        <ul className={s.tags}>
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <button
          className={s.detailButton}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={detailId}
        >
          {language === "de" ? "Über das Projekt" : "About this project"}
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </button>
        <div id={detailId} hidden={!open} className={s.projectDetails}>
          <p>{details}</p>
          {href ? (
            <OutLink href={href}>{hrefText}</OutLink>
          ) : (
            <span className={s.todo}>{t.todoLink}</span>
          )}
        </div>
      </div>
      <MoveUpRight className={s.projectArrow} aria-hidden="true" size={26} />
    </article>
  );
}
export default function App() {
  const { t, language } = useLanguage();
  const de = language === "de";
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState("education");
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-editorial-theme");
      if (saved === "dark" || saved === "light") return saved;
    } catch {}
    return "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f7f7f4" : "#161a19");
    try {
      localStorage.setItem("portfolio-editorial-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    setMenu(false);
  }, [language]);
  useEffect(() => {
    if (!menu) return;
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menu]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-12% 0px -65% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div id="top" />
      <a className={s.skip} href="#main">
        {t.skip}
      </a>
      <header className={s.mobileHeader}>
        <a href="#profile" className={s.mobileBrand}>
          JG<span>Johannes Gölz</span>
        </a>
        <div className={s.mobileControls}>
          <Languages />
          <button
            ref={menuRef}
            className={s.iconButton}
            aria-expanded={menu}
            aria-controls="section-nav"
            aria-label={menu ? t.close : t.menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <aside className={s.profile} id="profile" aria-labelledby="profile-name">
        <Network theme={theme} />
        <div className={s.profileInner}>
          <div className={s.profileTop}>
            <span>JG / PORTFOLIO</span>
            <div className={s.desktopControls}>
              <Languages />
              <button
                className={s.iconButton}
                aria-label={theme === "light" ? t.dark : t.light}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>
          {profile.portrait ? (
            <img
              className={s.portrait}
              src={profile.portrait}
              alt="Johannes Gölz"
              width="240"
              height="240"
            />
          ) : (
            <div className={s.identityIntro}>
              <span>{de ? "Hallo, ich bin" : "Hello, I’m"}</span>
              <span className={s.identityMark} aria-hidden="true">
                jg.
              </span>
            </div>
          )}
          <div className={s.roleBand}>
            <span>
              {de
                ? "Informatik & Mathematik"
                : "Computer Science & Mathematics"}
            </span>
            <span className={s.roleDot} aria-hidden="true" />
          </div>
          <h1 id="profile-name">
            JOHANNES GÖLZ<span>.</span>
          </h1>
          <p className={s.bio} lang="en">
            Problemsolver who focuses on writing clean, extensible and efficient code.
            Trying to make the web a better place.
          </p>
          <a className={s.profileCta} href="#projects">
            {de ? "Ein Blick auf meine Arbeit" : "Explore my work"}
            <ArrowDown size={17} />
          </a>
          <div className={s.profileBottom}>
            <span className={s.location}>
              <MapPin size={14} />
              {t.location}
            </span>
            <div className={s.socials}>
              <a
                href={profile.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={profile.repository}
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          <p className={s.profileNote}>
            {de
              ? "Neugierig bleiben. Zusammenhänge verstehen."
              : "Stay curious. Connect the dots."}
          </p>
        </div>
      </aside>
      <div className={s.content}>
        <nav
          className={`${s.nav} ${menu ? s.navOpen : ""}`}
          id="section-nav"
          aria-label={de ? "Hauptnavigation" : "Main navigation"}
        >
          {sectionIds.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenu(false)}
            >
              {t.nav[labelIndex[i]]}
            </a>
          ))}
          <button
            className={`${s.iconButton} ${s.mobileTheme}`}
            aria-label={theme === "light" ? t.dark : t.light}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </button>
        </nav>
        <main id="main" className={s.main}>
          <Section id="education" num="01" title={t.nav[3]}>
            <p className={s.sectionLead}>
              {de
                ? "Zwei Disziplinen, eine gemeinsame Neugier."
                : "Two disciplines, one shared curiosity."}
            </p>
            <div className={s.timeline}>
              {t.education.map((item, i) => (
                <article
                  className={s.education}
                  key={item.degree + item.subject}
                >
                  <div className={s.entryHeading}>
                    <h3>{item.degree}</h3>
                    {i === 0 && (
                      <span className={s.current}>
                        {de ? "AKTUELL" : "CURRENT"}
                      </span>
                    )}
                  </div>
                  <h4>{item.subject}</h4>
                  <p>
                    {de
                      ? "Karlsruher Institut für Technologie"
                      : "Karlsruhe Institute of Technology"}
                  </p>
                  <span className={s.entryNote}>{item.note}</span>
                </article>
              ))}
            </div>
            <div className={s.note}>
              <span>∩</span>
              <p>
                {de
                  ? "Mathematische Grundlagen geben mir das Werkzeug, komplexe Zusammenhänge zu verstehen. Informatik gibt mir die Möglichkeit, daraus etwas zu entwickeln."
                  : "Mathematical foundations help me understand complex connections. Computer science gives me the means to build on them."}
              </p>
            </div>
          </Section>
          <Section id="experience" num="02" title={t.nav[1]}>
            <p className={s.sectionLead}>
              {de
                ? "Praxis, Perspektiven und Wissen, das weitergeht."
                : "Practical experience. Different perspectives. Shared knowledge."}
            </p>
            <div className={s.timeline}>
              {t.jobs.map((job) => (
                <article className={s.job} key={job.org}>
                  <div className={s.entryHeading}>
                    <h3>{job.role}</h3>
                    <span className={s.duration}>{job.duration}</span>
                  </div>
                  <h4>{job.org}</h4>
                  <p>{job.text}</p>
                  <ul className={s.plainTags}>
                    {job.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>
          <Section id="projects" num="03" title={t.nav[2]}>
            <p className={s.sectionLead}>
              {de
                ? "Von mobilen Ideen bis zur Software für die Forschung."
                : "From mobile ideas to software for research."}
            </p>
            <Project
              index="01"
              kind={de ? "MOBILE ENTWICKLUNG" : "MOBILE DEVELOPMENT"}
              title="Flutter App"
              text={t.appText}
              tags={["Flutter", "Dart", "Google Play"]}
              href={profile.playStore}
              hrefText={t.appLink}
              details={
                de
                  ? "Ein eigenes App-Projekt mit Flutter. Die App wurde im Google Play Store veröffentlicht. Der direkte Store-Link wird noch ergänzt."
                  : "An app project built with Flutter and published on Google Play. The direct store link will be added."
              }
            />
            <Project
              index="02"
              kind={de ? "WEB & BACKEND" : "WEB & BACKEND"}
              title="Fraunhofer WebApp"
              text={t.backendText}
              tags={["Java", "Backend", "WebApp"]}
              href={profile.fraunhofer}
              hrefText={t.backendLink}
              details={
                de
                  ? "Im Fraunhofer-WebApp-Projekt habe ich am Java-Backend mitgearbeitet. Ein öffentlicher Projektlink und weitere freigegebene Informationen werden noch ergänzt."
                  : "I contributed to the Java backend of a Fraunhofer web app project. A public project link and further approved information will be added."
              }
            />
          </Section>
          <Section
            id="skills"
            num="04"
            title={de ? "Skills & Schwerpunkte" : "Skills & interests"}
          >
            <p className={s.sectionLead}>
              {de
                ? "Die Themen und Werkzeuge, mit denen ich arbeite."
                : "The ideas and tools I work with."}
            </p>
            <div className={s.skills}>
              {t.skillGroups.map((group, i) => (
                <div className={s.skillGroup} key={group}>
                  <h3>{group}</h3>
                  <ul>
                    {t.skills[i].map((skill) => (
                      <li
                        className={
                          skill.startsWith("TODO") ? s.todo : undefined
                        }
                        key={skill}
                      >
                        {!skill.startsWith("TODO") && (
                          <span aria-hidden="true">/</span>
                        )}
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
          <Section id="community" num="05" title={t.nav[5]}>
            <p className={s.sectionLead}>
              {de
                ? "Gute Ideen wachsen im Austausch."
                : "Good ideas grow through collaboration."}
            </p>
            {t.engagement.map((item, i) => (
              <article className={s.engagement} key={item.title}>
                <span className={s.engagementNumber}>0{i + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className={s.entryNote}>{item.tag}</span>
                </div>
              </article>
            ))}
          </Section>
          <Section
            id="contact"
            num="06"
            title={de ? "Lass uns sprechen." : "Let’s talk."}
          >
            <p className={s.contactIntro}>{t.contactText}</p>
            <div className={s.contactLinks}>
              <OutLink href={profile.linkedin}>
                <Linkedin size={19} />
                LinkedIn
              </OutLink>
              <OutLink href={profile.repository}>
                <Github size={19} />
                GitHub
              </OutLink>
            </div>
            <p className={s.contactLocation}>
              <MapPin size={14} />
              {t.location}
            </p>
          </Section>
        </main>
        <footer className={s.footer}>
          <span>© {new Date().getFullYear()} Johannes Gölz</span>
          <span>Vite + React</span>
          <Languages />
          <a href="#top" aria-label={de ? "Nach oben" : "Back to top"}>
            <ArrowUp size={17} />
          </a>
        </footer>
      </div>
    </>
  );
}
