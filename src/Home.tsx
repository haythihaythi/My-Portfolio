import { useState, useEffect, useRef } from "react";
import "./index.css";
import LiquidEther from "./components/LiquidEther";
import ProfileCard from "./components/ProfileCard";
import TechText from "./components/TechText";

import BorderGlow from "./components/BorderGlow";
import DepthCarousel from "./components/DepthCarousel";
import Folder from "./components/Folder";
import heroPic from "./images/heropic.jpg";
import notePic from "./images/note.png";
import journeyPic from "./images/journey.png";
import hackathon1 from "./hackathon/1.JPG";
import hackathon2 from "./hackathon/2.JPG";
import hackathon3 from "./hackathon/3.JPG";
import hackathon4 from "./hackathon/4.JPG";
import graphic1 from "./graphic/1.jpg";

import graphic3 from "./graphic/3.png";
import graphic4 from "./graphic/4.jpg";
import graphic5 from "./graphic/5.jpg";
import graphic6 from "./graphic/6.jpg";
import graphic7 from "./graphic/7.jpg";
import logo1 from "./logo/IMG_4749.JPG";
import logo2 from "./logo/IMG_6100.JPG";
import logo3 from "./logo/IMG_7672.JPG";
import collegeProject1 from "./collegepj/IMG_7225.JPG";
import collegeProject2 from "./collegepj/IMG_7239.JPG";
import collegeProject3 from "./collegepj/IMG_7309 (2).JPG";
import collegeProject4 from "./collegepj/IMG_7323.JPG";
import projectMockup from "./pjsession/mockup/figmamockup.png";
import projectDescription from "./pjsession/textbox/text1.png";
import projectButton from "./pjsession/btn/btn1.png";
import flexMockup from "./pjsession/mockup/flexweb.png";
import flexDescription from "./pjsession/textbox/text2.png";
import flexButton from "./pjsession/btn/btn2.png";
import AURAmockup from "./pjsession/mockup/Auramockup.png";
import AURADescription from "./pjsession/textbox/text3.png";
import AURAButton from "./pjsession/btn/btn1.png";
import auraVideo from "./images/AURA/Aura AI By Vision Coders (Team-3).mp4";
import cvForm from "./images/CVform.jpg";
import linkedinQR from "./images/QR/linkedin-social.png";
import telegramQR from "./images/QR/telegram-social.png";
import facebookQR from "./images/QR/facebook-social.png";

const uiuxImageUrls = import.meta.glob("./images/UIUX/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const uiuxCarouselItems = Object.entries(uiuxImageUrls)
  .sort(([pathA], [pathB]) => {
    const nameA = pathA.split("/").pop() ?? "";
    const nameB = pathB.split("/").pop() ?? "";
    if (nameA === "UIUX pj.jpg") return nameB === nameA ? 0 : -1;
    if (nameB === "UIUX pj.jpg") return 1;
    return Number.parseInt(nameA, 10) - Number.parseInt(nameB, 10);
  })
  .map(([path, image]) => {
    const filename = path.split("/").pop() ?? "";
    const screenNumber = Number.parseInt(filename, 10);
    return {
      image,
      ...(filename === "UIUX pj.jpg" && { width: 420, height: 236 }),
      alt:
        filename === "UIUX pj.jpg"
          ? "UI/UX fashion e-commerce project cover"
          : `UI/UX app screen ${screenNumber + 1}`,
    };
  });

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const SKILL_CATEGORIES = [
  {
    title: "Frontend & Interface Design",
    skills: [
      "React & TypeScript",
      "Tailwind CSS & shadcn/ui",
      "Form Architecture (Zod & React Hook Form)",
      "Vite & Modern Bundling",
    ],
  },
  {
    title: "Backend & Data Management",
    skills: [
      "Node.js & Express.js",
      "PostgreSQL & Neon Database",
      "Prisma ORM",
      "Better-Auth & Auth Systems",
    ],
  },
  {
    title: "Design & Tooling Workflow",
    skills: [
      "Figma & UI/UX Design",
      "Git & GitHub Collaboration",
      "Vercel Deployments",
      "PowerShell & CLI Automation",
    ],
  },
] as const;

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [uiuxDialogOpen, setUIUXDialogOpen] = useState(false);
  const uiuxDialogRef = useRef<HTMLDialogElement>(null);
  const [auraDialogOpen, setAuraDialogOpen] = useState(false);
  const auraDialogRef = useRef<HTMLDialogElement>(null);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);
  const resumeDialogRef = useRef<HTMLDialogElement>(null);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
  const journeyImageDialogRef = useRef<HTMLDialogElement>(null);
  const [selectedJourneyImage, setSelectedJourneyImage] = useState<{
    src: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dialog = uiuxDialogRef.current;
    if (!dialog) return;
    if (uiuxDialogOpen && !dialog.open) dialog.showModal();
    else if (!uiuxDialogOpen && dialog.open) dialog.close();
  }, [uiuxDialogOpen]);

  useEffect(() => {
    const dialog = auraDialogRef.current;
    if (!dialog) return;
    if (auraDialogOpen && !dialog.open) dialog.showModal();
    else if (!auraDialogOpen && dialog.open) dialog.close();
  }, [auraDialogOpen]);

  useEffect(() => {
    const dialog = resumeDialogRef.current;
    if (!dialog) return;
    if (resumeDialogOpen && !dialog.open) dialog.showModal();
    else if (!resumeDialogOpen && dialog.open) dialog.close();
  }, [resumeDialogOpen]);

  useEffect(() => {
    const dialog = journeyImageDialogRef.current;
    if (!dialog) return;
    if (selectedJourneyImage && !dialog.open) dialog.showModal();
    else if (!selectedJourneyImage && dialog.open) dialog.close();
  }, [selectedJourneyImage]);

  const aboutRef = useReveal();
  const projectsRef = useReveal();
  const contactRef = useReveal();

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const revealClasses =
    "translate-y-6 opacity-0 transition-[opacity,transform] duration-700 [&.visible]:translate-y-0 [&.visible]:opacity-100";

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[4.5vw] py-5 transition-all duration-300 ${
          navScrolled
            ? "bg-[#120910]/75 shadow-[0_12px_30px_rgba(16,6,11,.2)] backdrop-blur-md"
            : "bg-transparent"
        }`}
        id="navbar"
      >
        <button
          className="font-[var(--ff-heading)] text-sm font-bold uppercase tracking-[0.18em] text-[#f5e9d3]"
          onClick={() => scrollTo("hero")}
        ></button>

        <ul
          className={`m-0 list-none items-center gap-6 md:flex ${
            mobileMenuOpen
              ? "absolute left-4 right-4 top-[4.5rem] flex flex-col rounded-2xl border border-white/10 bg-[#120910]/95 p-5 shadow-2xl"
              : "hidden"
          } md:static md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {["about", "education", "projects", "contact"].map((id) => (
            <li key={id}>
              <a
                className="text-[.82rem] capitalize tracking-[.02em] text-[#fff5ed]/85 transition-colors hover:text-white"
                onClick={() => scrollTo(id)}
                href={`#${id}`}
              >
                {id === "contact"
                  ? "Contact Me"
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-white/[.04] md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="block h-0.5 w-4 rounded-full bg-[#f7e9df]" />
          <span className="block h-0.5 w-4 rounded-full bg-[#f7e9df]" />
          <span className="block h-0.5 w-4 rounded-full bg-[#f7e9df]" />
        </button>
      </nav>

      {/* Hero styles and content remain isolated from the Tailwind sections. */}
      <section className="hero" id="hero">
        <div className="absolute inset-0 h-full w-full">
          <LiquidEther
            colors={["#f1509d", "#ff92b7", "#fbf9df"]}
            mouseForce={20}
            cursorSize={100}
            persistence={0.75}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            intensity={1}
            viscosity={0}
            resolution={0.5}
            clickBurst
            bounceEdges={false}
            intro
            lightMode={false}
          />
        </div>

        <div className="hero__content">
          <h1 className="hero__name">
            Hi, I'm <br />
            HAYTHI
            <br />
            MIN SOE
          </h1>
          <p className="hero__eyebrow">A Creative Developer</p>
          
          
        </div>

        <div className="hero__footer">
          <div className="hero__label">Web Developer</div>
          <div className="hero__label">Portfolio</div>
        </div>
      </section>

      <div className="h-px w-full bg-[#271212]/10" />

      <section
        className="relative bg-[var(--cream)] px-[4.5vw] py-20"
        id="about"
      >
        <div ref={aboutRef} className={revealClasses}>
          <div className="h-[100px] w-full text-[#6b1d33] md:h-[120px]">
            <TechText
              text="About Me"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily=""
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.4}
              selection
              labels={false}
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>
          <div className="mt-8 flex flex-row items-start gap-5 md:translate-x-4 md:gap-14">
            <div className="w-[180px] shrink-0 md:w-[340px]">
              <ProfileCard
                name="Haythi Min Soe"
                title="Web Developer"
                handle="@heithyllune"
                status="Online"
                contactText="Contact"
                avatarUrl={heroPic}
                holo={0.6}
                glare={0.5}
                tiltStrength={17}
                parallax={9}
                radius={16}
                enableTilt
                intro
                showUserInfo
                enableMobileTilt={false}
                theme="dark"
                onContactClick={() => scrollTo("contact")}
              />
            </div>

            <div className="max-w-3xl flex-1">
              <p className="m-0 text-[#6b1d33] text-lg leading-[1.8]">
                Currently pursuing my degree at Technological University
                (Hmawbi). My journey began on the visual side—creating posters,
                visual assets, and UI layouts which evolved into building
                complete, interactive web applications.
              </p>
              <p className="mt-5 text-[#6b1d33] text-lg leading-[1.8]">
                I'm interested in the intersection of design and development,
                where I can create seamless experiences with clean code and
                meaningful functionality. I'm always seeking opportunities to
                learn, collaborate on real-world projects, and grow into a
                complete product-minded developer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-[#271212]/10" />

      {/* What I do */}
      <section
        className="relative overflow-hidden bg-[var(--red-color)] px-[4.5vw] py-20 text-[var(--cream)]"
        id="what-i-do"
      >
        <div className="h-[100px] w-full md:h-[120px]">
          <TechText
            text="What I do"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1}
            speed={1}
            bounce={0.2}
            selection
            labels={false}
            color="currentColor"
            align="center"
          />
        </div>

        <div className="mx-auto mt-14 max-w-[1400px]">
          <h3 className="m-0 mb-5 font-[var(--ff-heading)] text-[40px] font-bold leading-[1.05] tracking-[-.05em]">
            Technical Stacks &amp; Capabilities
          </h3>
          <p>
            Combining a visual UI/UX background with robust full-stack software
            architecture. Specializing in component systems, database modeling,
            and seamless visual workflows.
          </p>
          <div className="mt-12 flex flex-col gap-5 md:grid md:grid-cols-2 lg:flex lg:flex-row">
            {[
              ["stack", "Primary Stack", "React, Node, Postgres"],
              ["design", "UI Design Tool", "Figma"],
              ["auth", "Auth & ORM", "Prisma + Better-auth"],
              ["deploy", "Deployment", "Vercel & Git CI/CD"],
            ].map(([icon, title, details]) => (
              <BorderGlow
                key={title}
                className="min-h-36 lg:min-h-40 lg:flex-1"
                backgroundColor="#120F17"
                glowColor="45 78 88"
                colors={["#fef6ce", "#d9948f", "#f7d67d"]}
                borderRadius={24}
                glowRadius={18}
                glowIntensity={0.85}
                fillOpacity={0.25}
              >
                <article className="min-h-36 px-6 py-6 lg:min-h-40 lg:px-5 lg:py-7">
                  <div className="mt-3 flex items-center justify-center gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center text-[var(--cream)]">
                      {icon === "stack" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                          <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
                        </svg>
                      )}
                      {icon === "design" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="M12 2H8a4 4 0 0 0 0 8h4V2Zm0 8H8a4 4 0 0 0 0 8h4v-8Zm0-8h4a4 4 0 0 1 0 8h-4V2Z" />
                          <circle cx="16" cy="14" r="4" />
                        </svg>
                      )}
                      {icon === "auth" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="M12 3 4 6v5c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-3Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                      )}
                      {icon === "deploy" && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="M12 21V3M5 10l7-7 7 7" />
                          <path d="M5 17H3v4h18v-4h-2" />
                        </svg>
                      )}
                    </span>
                    <p className="m-0 font-[var(--ff-heading)] text-[clamp(.9rem,1.15vw,1.15rem)] font-light leading-tight text-[var(--cream)]/45">
                      {title}
                    </p>
                  </div>

                  <p className="mt-5 mb-3 mb-0 flex justify-center text-center text-[clamp(1rem,1.35vw,1.25rem)] font-semibold leading-relaxed text-[var(--cream)]">
                    {details}
                  </p>
                </article>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-[#271212]/10" />

      {/* My Education */}
      <section
        className="relative overflow-hidden bg-[var(--cream)] px-[4.5vw] py-16 text-[var(--red-color)] md:py-20"
        id="education"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="h-[100px] w-full md:h-[120px]">
            <TechText
              text="My Education"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily=""
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.3}
              selection
              labels={false}
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>

          <div className="mt-8 grid items-center gap-8 md:mt-10 lg:grid-cols-2 lg:gap-14">
            <article className="space-y-9 py-2 md:py-4">
              <div>
               
                <h3 className="mt-2 mb-0 font-[var(--ff-heading)] text-2xl font-bold leading-tight md:text-3xl">
                  Technological University (Hmawbi)
                </h3>
                <ul className="mt-5 grid gap-3 pl-0 text-base leading-[1.8] text-[#6b1d33]/80 md:text-lg">
                  <li className="flex items-start gap-3">
                    <span
                      className="mt-[.75em] h-2 w-2 shrink-0 rounded-full bg-[#6b1d33]"
                      aria-hidden="true"
                    />
                    <span>Currently pursuing my degree.</span>
                  </li>
                 
                </ul>
              </div>

              <div>
                <h3 className="m-0 font-[var(--ff-heading)] text-xl font-bold leading-tight md:text-2xl">
                  Outside courses certificates
                </h3>
                <ul className="mt-4 grid gap-3 pl-0 text-base leading-[1.7] text-[#6b1d33]/80 md:text-lg">
                  {[
                    ["UI/UX", "Codewall Technology"],
                    ["Frontend Development", "NIT Institute"],
                    ["Full-stack JavaScript", "Technortal"],
                  ].map(([course, provider]) => (
                    <li key={course} className="flex items-start gap-3">
                      <span
                        className="mt-[.75em] h-2 w-2 shrink-0 rounded-full bg-[#d9948f]"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-[#6b1d33]">
                          {course}
                        </strong>
                        <span className="text-[#6b1d33]/70"> — {provider}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <button
              type="button"
              className="group relative m-0 flex min-h-[340px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-[#6b1d33]/10 bg-gradient-to-br from-white via-[#f9eee2] to-[#efd7cc] p-6 text-left text-[#6b1d33] shadow-[0_18px_45px_rgba(107,29,51,.16)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_65px_rgba(107,29,51,.27)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6b1d33] md:min-h-[390px] md:p-9"
              aria-label="Check my Resume"
              onClick={() => setResumeDialogOpen(true)}
            >
              <div
                className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#6b1d33]/[.06] transition-transform duration-700 group-hover:scale-125"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -left-12 h-60 w-60 rounded-full bg-[#d9948f]/20 transition-transform duration-700 group-hover:scale-110"
                aria-hidden="true"
              />

              <div className="relative mx-auto flex min-h-[260px] max-w-[340px] rotate-[-2deg] flex-col rounded-2xl border border-[#6b1d33]/10 bg-white p-6 shadow-[0_16px_35px_rgba(60,25,32,.16)] transition-transform duration-500 group-hover:rotate-0 md:min-h-[300px] md:p-8">
                <div className="flex items-center gap-4">
                  <span className="h-14 w-14 rounded-full bg-gradient-to-br from-[#d9948f] to-[#6b1d33] ring-4 ring-[#6b1d33]/5" />
                  <div className="flex-1">
                    <span className="block h-3 w-3/4 rounded-full bg-[#6b1d33]/80" />
                    <span className="mt-2 block h-2 w-1/2 rounded-full bg-[#6b1d33]/20" />
                  </div>
                  <span className="rounded-full bg-[#f7e9df] px-2.5 py-1 text-[9px] font-bold tracking-[.15em] text-[#6b1d33]">
                    PREVIEW
                  </span>
                </div>
                <div className="mt-7 h-px w-full bg-[#6b1d33]/10" />
                <span className="mt-6 h-2 w-1/3 rounded-full bg-[#6b1d33]/65" />
                <span className="mt-3 h-2 w-full rounded-full bg-[#6b1d33]/10" />
                <span className="mt-2 h-2 w-11/12 rounded-full bg-[#6b1d33]/10" />
                <span className="mt-2 h-2 w-4/5 rounded-full bg-[#6b1d33]/10" />
                <span className="mt-6 h-2 w-1/4 rounded-full bg-[#6b1d33]/65" />
                <span className="mt-3 h-2 w-10/12 rounded-full bg-[#6b1d33]/10" />
                <span className="mt-2 h-2 w-3/4 rounded-full bg-[#6b1d33]/10" />
                <div className="mt-auto flex gap-2 pt-6">
                  <span className="h-2 w-12 rounded-full bg-[#d9948f]/60" />
                  <span className="h-2 w-16 rounded-full bg-[#6b1d33]/15" />
                  <span className="h-2 w-10 rounded-full bg-[#6b1d33]/15" />
                </div>
              </div>

              <span className="relative mt-5 flex w-full items-center justify-between gap-4 font-[var(--ff-heading)] text-lg font-bold md:mt-6 md:text-xl">
                <span>Check my Resume</span>
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6b1d33] text-[var(--cream)] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-5 w-5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-[#271212]/10" />

      {/* my projects */}
      <section
        className="relative overflow-hidden bg-[var(--red-color)] px-[4.5vw] py-20 text-[var(--cream)]"
        id="projects"
      >
        <div ref={projectsRef} className={revealClasses}>
          <div className="h-[120px] w-full md:h-[150px]">
            <TechText
              text="My Projects"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily=""
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1}
              speed={1}
              bounce={0.2}
              selection
              labels={false}
              color="currentColor"
              align="center"
            />
          </div>

          {/* UIUX */}
          <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-[1100px] overflow-hidden md:mt-10">
            <img
              src={projectMockup}
              alt="Fashion e-commerce mobile UI mockup"
              className="absolute left-[-4%] top-[28%] z-10 h-[74%] w-[56%] object-contain"
            />
            <img
              src={projectDescription}
              alt="UI/UX project description"
              className="absolute left-[42.5%] top-[15%] z-20 h-auto w-[43%] object-contain"
            />
            <BorderGlow
              className="absolute left-[69%] top-[60%] z-30 w-[26%] border-0"
              backgroundColor="transparent"
              borderRadius={0}
              edgeSensitivity={-35}
              glowColor="45 78 88"
              colors={["#fef6ce", "#d9948f", "#f7d67d"]}
              glowRadius={18}
              glowIntensity={0.85}
              fillOpacity={0}
              shapeMask={projectButton}
            >
              <button
                type="button"
                className="block h-full w-full appearance-none border-0 bg-transparent p-0"
                aria-label="View UI/UX project screens"
                aria-haspopup="dialog"
                onClick={() => setUIUXDialogOpen(true)}
              >
                <img
                  src={projectButton}
                  alt=""
                  className="block h-auto w-full"
                />
              </button>
            </BorderGlow>
          </div>

          {/* flex web */}
          <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-[1100px] overflow-hidden md:mt-10">
            <img
              src={flexMockup}
              alt="Flex fashion e-commerce website mockup"
              className="absolute left-[56%] top-[22%] z-10 h-[72%] w-[44%] object-contain"
            />
            <img
              src={flexDescription}
              alt="Full-stack project description"
              className="absolute left-[17%] top-[11%] z-20 h-auto w-[44%] object-contain"
            />
            <BorderGlow
              className="absolute left-[3%] top-[59%] z-30 w-[27%] border-0"
              backgroundColor="transparent"
              borderRadius={0}
              edgeSensitivity={-35}
              glowColor="45 78 88"
              colors={["#fef6ce", "#d9948f", "#f7d67d"]}
              glowRadius={18}
              glowIntensity={0.85}
              fillOpacity={0}
              shapeMask={flexButton}
            >
              <img
                src={flexButton}
                alt="View the project"
                className="block h-auto w-full"
              />
            </BorderGlow>
          </div>

          {/* AURA */}
          <div className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-[1100px] overflow-hidden md:mt-10">
            <img
              src={AURAmockup}
              alt="AURA mockup"
              className="absolute left-[-4%] top-[28%] z-10 h-[74%] w-[56%] object-contain"
            />
            <img
              src={AURADescription}
              alt="AURA project description"
              className="absolute left-[45.5%] top-[15%] z-20 h-auto w-[43%] object-contain mb-3"
            />

            <BorderGlow
              className="absolute left-[69%] top-[60%] z-30 mt-3 w-[22%] border-0"
              backgroundColor="transparent"
              borderRadius={0}
              edgeSensitivity={-35}
              glowColor="45 78 88"
              colors={["#fef6ce", "#d9948f", "#f7d67d"]}
              glowRadius={18}
              glowIntensity={0.85}
              fillOpacity={0}
              shapeMask={AURAButton}
            >
              <button
                type="button"
                className="block h-full w-full appearance-none border-0 bg-transparent p-0"
                aria-label="Watch the AURA project video"
                aria-haspopup="dialog"
                onClick={() => setAuraDialogOpen(true)}
              >
                <img src={AURAButton} alt="" className="block h-auto w-full" />
              </button>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <div className="w-full max-w-none overflow-hidden bg-[var(--cream)] py-12 text-[#6f1231] md:px-2">
        <div className="mb-8 h-[120px] text-center md:h-[150px]">
          <TechText
            text="Skills & Expertise"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1}
            speed={1}
            bounce={0.2}
            selection
            labels={false}
            color="currentColor"
            align="center"
          />
        </div>

        <div className="grid px-5 md:grid-cols-3 md:px-0">
          {SKILL_CATEGORIES.map((category, categoryIndex) => (
            <article
              key={category.title}
              className={`px-2 py-4 md:px-8 md:py-0 ${
                categoryIndex < SKILL_CATEGORIES.length - 1
                  ? "border-b border-[#6f1231]/25 pb-8 md:border-r md:border-b-0 md:pr-8 md:pb-0"
                  : ""
              }`}
            >
              <h4 className="mb-7 text-center font-[var(--ff-heading)] text-xl font-bold leading-tight md:text-left md:text-[clamp(1rem,1.35vw,1.25rem)]">
                {category.title}
              </h4>

              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={skill}>
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border-2 border-[#9a8a5d] text-[13px] font-bold leading-none text-[#646363]">
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.4 6.2 4.7 8.5 9.7 3.4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1 text-sm leading-4 text-[#8b5a42]">
                        {skill}
                      </span>
                    </div>
                    <div className="mt-3 h-[13px] overflow-hidden rounded-full bg-black">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6e1231] via-[#9d123d] to-[#e5b6c5]"
                        style={{
                          width: `${index === category.skills.length - 1 ? 80 : index % 2 === 0 ? 90 : 80}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* my experiences & journey */}
      <section
        className="relative overflow-hidden bg-[var(--red-color)] px-[4.5vw] py-16 text-[var(--cream)] md:py-20"
        id="journey"
      >
        <div className="h-[120px] w-full md:h-[150px]">
          <TechText
            text="My Experiences & Journey"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1}
            speed={1}
            bounce={0.2}
            selection
            labels={false}
            color="currentColor"
            align="center"
          />
        </div>

        <div className="relative mx-auto mt-8 flex w-screen max-w-none -translate-x-[4.5vw] justify-center md:mt-10">
          <img
            src={journeyPic}
            alt="My experiences and journey"
            className="block h-auto w-full max-w-none object-cover"
          />
          <div className="absolute left-[67%] top-[13%] flex origin-center scale-[0.22] flex-col items-center sm:scale-[0.28] md:scale-[0.58] lg:scale-75">
            <Folder
              mode="flap"
              variant="solid"
              color="#fdfbc6"
              size={0.8}
              items={[
                { title: "College project 1", image: collegeProject1 },
                { title: "College project 2", image: collegeProject2 },
                { title: "College project 3", image: collegeProject3 },
                { title: "College project 4", image: collegeProject4 },
              ]}
              onItemClick={(item) => {
                if (item.image) {
                  setSelectedJourneyImage({
                    src: item.image,
                    title: item.title,
                  });
                }
              }}
              peek
            />
            <h3 className="mt-2 text-center text-[1.1rem] font-semibold text-white text-outline-black">
              College project
            </h3>
          </div>
          <div className="absolute left-[79%] top-[42%] flex origin-center scale-[0.22] flex-col items-center sm:scale-[0.28] md:scale-[0.58] lg:scale-75">
            <Folder
              mode="flap"
              variant="solid"
              color="#fdfbc6"
              size={0.8}
              items={[
                { title: "Hackathon 1", image: hackathon1 },
                { title: "Hackathon 2", image: hackathon2 },
                { title: "Hackathon 3", image: hackathon3 },
                { title: "Hackathon 4", image: hackathon4 },
              ]}
              onItemClick={(item) => {
                if (item.image) {
                  setSelectedJourneyImage({
                    src: item.image,
                    title: item.title,
                  });
                }
              }}
              peek
            />
            <h3 className="mt-2 text-center text-[1.1rem] font-semibold text-white text-outline-black">
              Hackathon contest
            </h3>
          </div>
          <div className="absolute left-[60%] top-[55%] flex origin-center scale-[0.22] flex-col items-center sm:scale-[0.28] md:scale-[0.58] lg:scale-75">
            <Folder
              mode="flap"
              variant="solid"
              color="#fdfbc6"
              size={0.8}
              items={[
                { title: "Graphic Design 1", image: graphic1 },

                { title: "Graphic Design 3", image: graphic3 },
                { title: "Graphic Design 4", image: graphic4 },
                { title: "Graphic Design 5", image: graphic5 },
                { title: "Graphic Design 6", image: graphic6 },
                { title: "Graphic Design 7", image: graphic7 },
              ]}
              onItemClick={(item) => {
                if (item.image) {
                  setSelectedJourneyImage({
                    src: item.image,
                    title: item.title,
                  });
                }
              }}
              peek
            />
            <h3 className="mt-2 text-center text-[1.1rem] font-semibold text-white text-outline-black">
              Partime Graphic Designer
            </h3>
          </div>
          <div className="absolute left-[79%] top-[69%] flex origin-center scale-[0.22] flex-col items-center sm:scale-[0.28] md:scale-[0.58] lg:scale-75">
            <Folder
              mode="flap"
              variant="solid"
              color="#fdfbc6"
              size={0.8}
              items={[
                { title: "Logo contest presentation", image: logo1 },
                { title: "Logo contest runner-up", image: logo2 },
                { title: "Logo contest qualifiers", image: logo3 },
              ]}
              onItemClick={(item) => {
                if (item.image) {
                  setSelectedJourneyImage({
                    src: item.image,
                    title: item.title,
                  });
                }
              }}
              peek
            />
            <h3 className="mt-2 text-center text-[1.1rem] font-semibold text-white text-outline-black">
              Major logo contest
            </h3>
          </div>
        </div>
      </section>

      {/* my approach */}

      <section
        className="relative overflow-hidden bg-[var(--red-color)] px-[4.5vw] pt-12 pb-20 text-[var(--cream)] md:pt-16"
        id="approach"
      >
        <div className="h-[120px] w-full md:h-[150px]">
          <TechText
            text="My approach"
            fontWeight={600}
            fontSize={150}
            reveal="letter"
            dashLength={4}
            dashGap={2}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1}
            speed={1}
            bounce={0.2}
            selection
            labels={false}
            color="currentColor"
            align="center"
          />
        </div>

        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col items-center gap-10 px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="grid w-full grid-cols-3 gap-8 lg:w-[48%]">
            {[
              [
                "Strategy",
                "Turning goals and insights into a clear creative direction.",
              ],
              [
                "Design",
                "Crafting thoughtful visuals and experiences with purpose.",
              ],
              [
                "Execution",
                "Bringing the final work to life with care and precision.",
              ],
            ].map(([step, description], index) => (
              <div
                key={step}
                className="group relative flex min-w-0 flex-col items-start"
              >
                {index < 2 && (
                  <svg
                    viewBox="0 0 100 16"
                    preserveAspectRatio="none"
                    className="absolute left-14 top-[calc(1.75rem-0.25rem)] h-4 w-[calc(100%+2rem-3.5rem)] overflow-visible text-[var(--cream)]/70 md:left-16 md:top-[calc(2rem-0.25rem)] md:w-[calc(100%+2rem-4rem)]"
                    aria-hidden="true"
                  >
                    <line
                      x1="0"
                      y1="8"
                      x2="88"
                      y2="8"
                      stroke="currentColor"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path d="M100 8 82 1v14Z" fill="currentColor" />
                  </svg>
                )}
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--cream)] text-[var(--red-color)] transition-colors duration-300 group-hover:bg-black md:h-16 md:w-16">
                  {index === 0 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path d="M9 18h6" />
                      <path d="M10 22h4" />
                      <path d="M8.5 14.5A5.5 5.5 0 1 1 15.5 14.5c-.9.7-1.5 1.5-1.5 2.5h-4c0-1-.6-1.8-1.5-2.5Z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-7 w-7"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="13" rx="1.5" />
                      <path d="M2 20h20" />
                      <path d="M9 17v3M15 17v3" />
                    </svg>
                  )}
                </span>
                <div className="mt-4 flex flex-col">
                  <span className="font-[var(--ff-heading)] text-lg font-semibold tracking-[.04em] md:text-xl">
                    {step}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--cream)]/75 md:text-sm">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <img
            src={notePic}
            alt="Design notes"
            className="w-full max-w-[520px] rounded-[1.75rem] object-contain lg:w-[48%]"
          />
        </div>
      </section>

      {/* contact me */}
      <section
        className="relative isolate overflow-hidden bg-[#10070c] px-[4.5vw] py-16 text-[var(--cream)] md:py-20"
        id="contact"
      >
        <LiquidEther
          colors={["#f1509d", "#ff92b7", "#fbf9df"]}
          intensity={0.65}
          mouseForce={12}
          cursorSize={90}
          persistence={0.72}
          resolution={0.45}
          clickBurst={false}
          autoDemo
          autoSpeed={0.25}
          autoIntensity={1.2}
          intro
          className="pointer-events-none opacity-70"
          style={{ position: "absolute", inset: 0 }}
        />

        <div
          ref={contactRef}
          className={`relative z-10 mx-auto max-w-[1400px] ${revealClasses}`}
        >
          <div className="h-[100px] w-full md:h-[120px] flex justify-center">
            <TechText
              text="Contact Me"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              fontFamily=""
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.3}
              selection
              labels={false}
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>

          <div className="mt-8 grid items-start gap-10 md:mt-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div className="pt-2">
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <a
                  href="tel:09421561467"
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-[var(--cream)] transition-colors hover:border-[var(--cream)]/35 hover:bg-white/[.08]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--cream)]/10 text-[var(--cream)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[.16em] text-[var(--cream)]/55">
                      Phone
                    </span>
                    <span className="mt-1 block break-words font-medium">
                      09-421561467
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:hyuga5216@gmail.com"
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-[var(--cream)] transition-colors hover:border-[var(--cream)]/35 hover:bg-white/[.08]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--cream)]/10 text-[var(--cream)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[.16em] text-[var(--cream)]/55">
                      Email
                    </span>
                    <span className="mt-1 block break-all font-medium">
                      hyuga5216@gmail.com
                    </span>
                  </span>
                </a>

                <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--cream)]/10 text-[var(--cream)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[.16em] text-[var(--cream)]/55">
                      Address
                    </span>
                    <span className="mt-1 block font-medium leading-relaxed">
                      Tharyaraye (2) Street, High Park, Insein, Yangon
                    </span>
                  </span>
                </div>

                <a
                  href="https://github.com/haythihaythi"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-[var(--cream)] transition-colors hover:border-[var(--cream)]/35 hover:bg-white/[.08]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--cream)]/10 text-[var(--cream)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.2 3.3 1.6.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.1 1.2a10.7 10.7 0 0 1 5.7 0c2.2-1.5 3.1-1.2 3.1-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .4.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-[.16em] text-[var(--cream)]/55">
                      GitHub
                    </span>
                    <span className="mt-1 block break-all font-medium">
                      github.com/haythihaythi
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <form
              className="rounded-[1.75rem] bg-[var(--cream)] p-6 text-[var(--red-color)] shadow-[0_24px_70px_rgba(0,0,0,.3)] md:p-8"
              onSubmit={(event) => {
                event.preventDefault();
                setContactFormSubmitted(true);
              }}
              onChange={() => setContactFormSubmitted(false)}
            >
              <h3 className="m-0 font-[var(--ff-heading)] text-2xl font-bold md:text-3xl">
                Send a message
              </h3>
              <p className="mt-2 mb-6 text-sm leading-relaxed text-[var(--red-color)]/70">
                Fill out the form and I’ll be happy to hear from you.
              </p>

              <div className="grid gap-5">
                <label className="grid gap-2 text-sm font-semibold">
                  Name
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    className="min-h-12 rounded-xl border border-[var(--red-color)]/15 bg-white/80 px-4 text-base font-normal text-[var(--red-color)] outline-none transition placeholder:text-[var(--red-color)]/40 focus:border-[var(--red-color)] focus:ring-4 focus:ring-[var(--red-color)]/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="min-h-12 rounded-xl border border-[var(--red-color)]/15 bg-white/80 px-4 text-base font-normal text-[var(--red-color)] outline-none transition placeholder:text-[var(--red-color)]/40 focus:border-[var(--red-color)] focus:ring-4 focus:ring-[var(--red-color)]/10"
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    required
                    className="resize-y rounded-xl border border-[var(--red-color)]/15 bg-white/80 px-4 py-3 text-base font-normal text-[var(--red-color)] outline-none transition placeholder:text-[var(--red-color)]/40 focus:border-[var(--red-color)] focus:ring-4 focus:ring-[var(--red-color)]/10"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[var(--red-color)] px-6 font-semibold text-[var(--cream)] shadow-[0_8px_20px_rgba(107,29,51,.2)] transition hover:-translate-y-0.5 hover:bg-[#541529] hover:shadow-[0_12px_26px_rgba(107,29,51,.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--red-color)]"
                >
                  Send message
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
                  </svg>
                </button>
                <p
                  className="m-0 text-xs leading-relaxed text-[var(--red-color)]/65"
                  role="status"
                  aria-live="polite"
                >
                  {contactFormSubmitted
                    ? "This form is a preview and isn’t connected yet. Please email me directly."
                    : "Form preview — messages aren’t sent yet."}
                </p>
              </div>
            </form>
          </div>

          {/* my other social */}
          <div className="mt-20 h-[100px] w-full md:mt-20 md:h-[120px] flex justify-center ">
            <TechText
              text="My other socials"
              fontWeight={600}
              fontSize={150}
              reveal="letter"
              dashLength={4}
              dashGap={2}
              specks={15}
              intro="none"
              introDuration={2}
              clickKick
              guides={false}
              letterSpacing={-0.05}
              accentColor="currentColor"
              reach={200}
              softness={0.7}
              lineStyle="dashed"
              strokeWidth={1.5}
              speed={1}
              bounce={0.3}
              selection
              labels={false}
              color="currentColor"
              align="center"
              draggable
              sweep
            />
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-3 lg:gap-12.5 sm:gap-6">
            {[
              { name: "LinkedIn", image: linkedinQR },
              { name: "Telegram", image: telegramQR },
              { name: "Facebook", image: facebookQR },
            ].map(({ name, image }) => (
              <figure
                key={name}
                className="m-0 rounded-2xl border border-white/10 bg-white/[.04] p-2 text-center sm:p-4"
              >
                <img
                  src={image}
                  alt={`${name} QR code`}
                  className="aspect-square w-full rounded-lg object-contain"
                />
                <figcaption className="mt-2 text-xs font-medium text-[var(--cream)] sm:text-sm">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={journeyImageDialogRef}
        className="uiux-project-dialog h-[70dvh] max-h-none w-[70vw] max-w-none overflow-hidden rounded-3xl border border-white/15 bg-[#10070c] p-0 text-[var(--cream)] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
        aria-labelledby="journey-image-title"
        onClose={() => setSelectedJourneyImage(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedJourneyImage(null);
          }
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-8">
            <h2
              id="journey-image-title"
              className="m-0 font-[var(--ff-heading)] text-base font-semibold md:text-2xl"
            >
              {selectedJourneyImage?.title}
            </h2>
            <button
              type="button"
              autoFocus
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-2xl leading-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)]"
              aria-label="Close image"
              onClick={() => setSelectedJourneyImage(null)}
            >
              &times;
            </button>
          </header>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 md:p-8">
            {selectedJourneyImage && (
              <img
                src={selectedJourneyImage.src}
                alt={selectedJourneyImage.title}
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      </dialog>

      <dialog
        ref={uiuxDialogRef}
        className="uiux-project-dialog h-[min(90dvh,900px)] max-h-[90dvh] w-[min(96vw,1280px)] max-w-none overflow-hidden rounded-3xl border border-white/15 bg-[#10070c] p-0 text-[var(--cream)] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
        aria-labelledby="uiux-dialog-title"
        onClose={() => setUIUXDialogOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setUIUXDialogOpen(false);
          }
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-8">
            <div>
              <h2
                id="uiux-dialog-title"
                className="m-0 whitespace-nowrap font-[var(--ff-heading)] text-base font-semibold md:text-2xl"
              >
                UI/UX project
              </h2>
              <p className="m-0 mt-1 hidden text-sm text-[var(--cream)]/60 md:block">
                Browse the project screens in order.
              </p>
            </div>
            <button
              type="button"
              autoFocus
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-2xl leading-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)]"
              aria-label="Close UI/UX project gallery"
              onClick={() => setUIUXDialogOpen(false)}
            >
              &times;
            </button>
          </header>
          <div className="min-h-0 flex-1">
            {uiuxDialogOpen && (
              <DepthCarousel
                items={uiuxCarouselItems}
                cardWidth={250}
                cardHeight={541}
                radius={18}
                depth={150}
                spread={55}
                tilt={12}
                visibleCards={3}
                falloff={0.18}
                blur={4}
                loop
                className="h-full min-h-[280px]"
              />
            )}
          </div>
        </div>
      </dialog>

      <dialog
        ref={auraDialogRef}
        className="uiux-project-dialog h-[min(90dvh,900px)] max-h-[90dvh] w-[min(96vw,1280px)] max-w-none overflow-hidden rounded-3xl border border-white/15 bg-[#10070c] p-0 text-[var(--cream)] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
        aria-labelledby="aura-dialog-title"
        onClose={() => setAuraDialogOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setAuraDialogOpen(false);
          }
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-8">
            <div>
              <h2
                id="aura-dialog-title"
                className="m-0 whitespace-nowrap font-[var(--ff-heading)] text-base font-semibold md:text-2xl"
              >
                AURA project
              </h2>
              <p className="m-0 mt-1 hidden text-sm text-[var(--cream)]/60 md:block">
                Press play to watch the project video.
              </p>
            </div>
            <button
              type="button"
              autoFocus
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-2xl leading-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)]"
              aria-label="Close AURA project video"
              onClick={() => setAuraDialogOpen(false)}
            >
              &times;
            </button>
          </header>
          <div className="flex min-h-0 flex-1 items-center justify-center p-4 md:p-8">
            {auraDialogOpen && (
              <video
                className="h-full w-full max-h-full max-w-full rounded-xl bg-black object-contain shadow-2xl"
                controls
                playsInline
                preload="none"
                poster={AURAmockup}
                aria-label="AURA project demonstration video"
              >
                <source src={auraVideo} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            )}
          </div>
        </div>
      </dialog>

      <dialog
        ref={resumeDialogRef}
        className="uiux-project-dialog h-[min(94dvh,1100px)] max-h-[94dvh] w-[min(96vw,900px)] max-w-none overflow-hidden rounded-3xl border border-white/15 bg-[#10070c] p-0 text-[var(--cream)] shadow-[0_30px_100px_rgba(0,0,0,.7)]"
        aria-labelledby="resume-dialog-title"
        onClose={() => setResumeDialogOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setResumeDialogOpen(false);
          }
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-3 md:px-8">
            <div>
              <h2
                id="resume-dialog-title"
                className="m-0 whitespace-nowrap font-[var(--ff-heading)] text-base font-semibold md:text-2xl"
              >
                My Resume
              </h2>
              <p className="m-0 mt-1 hidden text-sm text-[var(--cream)]/60 md:block">
                Resume — Haythi Min Soe
              </p>
            </div>
            <button
              type="button"
              autoFocus
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-2xl leading-none transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--cream)]"
              aria-label="Close resume"
              onClick={() => setResumeDialogOpen(false)}
            >
              &times;
            </button>
          </header>
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-3 md:p-5">
            {resumeDialogOpen && (
              <img
                src={cvForm}
                alt="Resume of Haythi Min Soe"
                className="h-full max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
