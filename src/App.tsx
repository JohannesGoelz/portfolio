import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, ArrowDown, Sun, Moon, Menu, X, MapPin, Code2, Braces, GraduationCap, Sparkles, Users, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from './i18n/context';
import { profile } from './config';
import s from './App.module.css';

const ids = ['about','experience','projects','education','skills','community','contact'];
function LanguageSwitch() {
  const {language, setLanguage} = useLanguage();
  return <div className={s.languages} aria-label="Language / Sprache">{(['de','en'] as const).map(l => <button key={l} lang={l} aria-pressed={language === l} onClick={() => setLanguage(l)}>{l.toUpperCase()}</button>)}</div>;
}
function Section({id, number, title, children}: {id:string; number:string; title:string; children:ReactNode}) {
  const {t} = useLanguage();
  return <section id={id} className={s.section} aria-labelledby={`${id}-title`}><div className={s.sectionLabel}><span>{number}</span>{t.nav[ids.indexOf(id)]}</div><h2 id={`${id}-title`}>{title}</h2>{children}</section>;
}
function Tags({items}: {items:string[]}) { return <ul className={s.tags}>{items.map(item => <li key={item}>{item}</li>)}</ul>; }
function ExternalLink({href, children, className}: {href:string;children:ReactNode;className?:string}) {return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17} aria-hidden="true"/></a>;}

export default function App() {
  const {t, language} = useLanguage();
  const [open,setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const [theme,setTheme] = useState(() => {
    try {const saved=localStorage.getItem('portfolio-theme'); if(saved==='light'||saved==='dark') return saved;} catch { /* Optional storage. */ }
    return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {document.documentElement.dataset.theme=theme; try {localStorage.setItem('portfolio-theme',theme);} catch { /* Optional storage. */ }},[theme]);
  useEffect(() => {setOpen(false);},[language]);
  useEffect(() => {
    if (!open) return;
    const close = (e:KeyboardEvent) => {if(e.key==='Escape'){setOpen(false);menuRef.current?.focus();}};
    document.addEventListener('keydown',close);return ()=>document.removeEventListener('keydown',close);
  },[open]);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add(s.revealed);observer.unobserve(entry.target);}}),{threshold:0.06});
    document.querySelectorAll(`.${s.section}`).forEach(el=>{el.classList.add(s.reveal);observer.observe(el);});
    return ()=>observer.disconnect();
  },[]);
  return <>
    <a className={s.skip} href="#main">{t.skip}</a>
    <div className={s.ambient} aria-hidden="true"><i/><i/><i/></div>
    <header className={s.header}><a className={s.logo} href="#" aria-label="Johannes Gölz">jg<span>.</span></a>
      <nav className={`${s.nav} ${open?s.open:''}`} id="navigation" aria-label={language==='de'?'Hauptnavigation':'Main navigation'}>{ids.map((id,i)=><a href={`#${id}`} key={id} onClick={()=>setOpen(false)}>{t.nav[i]}</a>)}</nav>
      <div className={s.controls}><LanguageSwitch/><span className={s.divider}/><button className={s.iconButton} aria-label={theme==='dark'?t.light:t.dark} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button ref={menuRef} className={`${s.iconButton} ${s.menu}`} aria-controls="navigation" aria-expanded={open} aria-label={open?t.close:t.menu} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
    </header>
    <main id="main" className={s.main}>
      <section className={s.hero} aria-labelledby="hero-title"><div className={s.heroCopy}><p className={s.eyebrow}><span/>{t.eyebrow}</p><p className={s.greeting}>{t.hello}</p><h1 id="hero-title">Johannes<br/><span>Gölz<span className={s.period}>.</span></span></h1><h2 className={s.tagline}>{t.headline}</h2><p className={s.intro}>{t.intro}</p><div className={s.actions}><a className={s.primary} href="#contact">{t.contact}<ArrowUpRight size={18}/></a><ExternalLink href={profile.linkedin} className={s.secondary}>LinkedIn</ExternalLink></div><div className={s.heroMeta}><MapPin size={14}/>{t.location}<span>·</span><span>KIT</span></div></div>
        <div className={s.heroVisual}><div className={s.orbit} aria-hidden="true"/><div className={`${s.glass} ${s.profileCard}`}><div className={s.cardTop}><span className={s.tinyDots}><i/><i/><i/></span><span>hello_world</span><Code2 size={16}/></div><div className={s.portrait}>{profile.portrait?<img src={profile.portrait} alt="Johannes Gölz" width="320" height="320"/>:<div className={s.monogram}><span aria-hidden="true">JG</span><small>{t.portrait}</small></div>}</div><div className={s.profileCaption}><strong>Johannes Gölz</strong><span>{t.portraitNote}</span></div><div className={s.cardBottom}><span><i/>Karlsruhe, DE</span><span>49.01° N · 8.40° E</span></div></div><div className={`${s.glass} ${s.floating} ${s.floatingTop}`}><Braces size={19}/><span>Backend Development</span></div><div className={`${s.glass} ${s.floating} ${s.floatingBottom}`}><Sparkles size={18}/><span>Machine Learning</span></div><span className={s.formula} aria-hidden="true">∑ ideas → possibilities</span></div>
      </section>
      <div className={s.heroFoot}><a href="#about"><ArrowDown size={15}/>{t.scroll}</a><span>MATHEMATICS · CODE · CURIOSITY</span></div>
      <Section id="about" number="01" title={t.aboutTitle}><div className={s.aboutGrid}><div className={s.aboutText}>{t.about.map(p=><p key={p}>{p}</p>)}</div><aside className={`${s.glass} ${s.focus}`}><Sparkles/><p className={s.eyebrow}>{t.focus}</p><h3>{t.focusTitle}</h3><p>{t.focusText}</p><div className={s.focusSymbols} aria-hidden="true">∑ <span>×</span> {'{ }'} <span>→</span> ✧</div></aside></div></Section>
      <Section id="experience" number="02" title={t.experienceTitle}><p className={s.sectionIntro}>{t.experienceNote}</p><div className={s.timeline}>{t.jobs.map((job,i)=><article className={`${s.glass} ${s.job}`} key={job.org}><div className={s.jobIcon}>{i===2?<GraduationCap size={22}/>:<Code2 size={22}/>}</div><div><div className={s.jobHeader}><span>{job.org}</span><span className={s.duration}>{job.duration}</span></div><h3>{job.role}</h3><p>{job.text}</p><Tags items={job.tags}/></div></article>)}</div></Section>
      <Section id="projects" number="03" title={t.projectsTitle}><div className={s.projectGrid}><article className={`${s.glass} ${s.project}`}><div className={`${s.projectArt} ${s.appArt}`} role="img" aria-label={t.illustrative}><div className={s.phone}><div className={s.phoneNotch}/><div className={s.appLogo}><Braces size={26}/></div><div className={s.phoneLines}><i/><i/></div><div className={s.phoneTiles}><i/><i/><i/><i/></div><div className={s.phoneBar}/></div><span className={s.artWord}>flutter<span>01 / MOBILE</span></span></div><div className={s.projectBody}><Tags items={['Flutter','Dart','Google Play']}/><h3>{t.appTitle}</h3><p>{t.appText}</p>{profile.playStore?<ExternalLink href={profile.playStore}>{t.appLink}</ExternalLink>:<span className={s.todo}>{t.todoLink}</span>}</div></article><article className={`${s.glass} ${s.project}`}><div className={`${s.projectArt} ${s.backendArt}`} role="img" aria-label={t.illustrative}><div className={s.serverDiagram}><span>WEB APP</span><i/><div>{'{'}<b>Java</b>{'}'}</div><i/><span>BACKEND</span></div><span className={s.artWord}>connected<span>02 / WEB APP</span></span></div><div className={s.projectBody}><Tags items={['Java','Backend','Fraunhofer']}/><h3>{t.backendTitle}</h3><p>{t.backendText}</p>{profile.fraunhofer?<ExternalLink href={profile.fraunhofer}>{t.backendLink}</ExternalLink>:<span className={s.todo}>{t.todoLink}</span>}</div></article></div></Section>
      <Section id="education" number="04" title={t.educationTitle}><div className={s.educationGrid}>{t.education.map((item,i)=><article className={`${s.glass} ${s.education}`} key={item.degree+item.subject}><GraduationCap size={26}/><p className={s.degree}>{item.degree}</p><h3>{item.subject}</h3><p>KIT · Karlsruhe</p><span className={s.educationNote}>{i===0&&<i/>}{item.note}</span></article>)}</div></Section>
      <Section id="skills" number="05" title={t.skillsTitle}><div className={s.skillsGrid}>{t.skillGroups.map((group,i)=><article className={`${s.glass} ${s.skill}`} key={group}><span className={s.skillIndex}>0{i+1}</span><h3>{group}</h3><Tags items={t.skills[i]}/></article>)}</div></Section>
      <Section id="community" number="06" title={t.engagementTitle}><div className={s.communityGrid}>{t.engagement.map((item,i)=><article className={`${s.glass} ${s.community}`} key={item.title}><div className={s.communityIcon}>{i===0?<Sparkles/>:<Users/>}</div><div><span className={s.smallLabel}>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></Section>
      <section id="contact" className={`${s.section} ${s.contact} ${s.glass}`} aria-labelledby="contact-title"><p className={s.eyebrow}>07 / {t.nav[6]}</p><h2 id="contact-title">{t.contactTitle}</h2><p>{t.contactText}</p><div className={s.actions}>{profile.email?<a className={s.primary} href={`mailto:${profile.email}`}><Mail size={18}/>{profile.email}<ArrowUpRight size={17}/></a>:<span className={s.todo}>{t.emailTodo}</span>}<ExternalLink href={profile.linkedin} className={s.secondary}><Linkedin size={17}/>LinkedIn</ExternalLink></div><span className={s.contactLocation}><MapPin size={15}/>{t.location}</span><ArrowRight className={s.contactArrow} aria-hidden="true"/></section>
    </main>
    <footer className={s.footer}><div><a className={s.logo} href="#">jg<span>.</span></a><span>© {new Date().getFullYear()} Johannes Gölz</span><span>{t.footer}</span></div><div><span>Built with Vite + React</span>{profile.repository?<ExternalLink href={profile.repository}>GitHub</ExternalLink>:<span className={s.todo}>{t.repoTodo}</span>}<LanguageSwitch/></div></footer>
  </>;
}
