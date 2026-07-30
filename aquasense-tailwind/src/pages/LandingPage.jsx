import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * AquaSense AI — Landing Page
 * ------------------------------------------------------------------
 * Self-contained page component. Assumes:
 *   - react-router-dom is configured with a "/login" route.
 *   - Tailwind CSS is available globally (arbitrary-value utilities used).
 *   - No external icon/animation libraries required — all icons are
 *     inline SVG and all motion is CSS/IntersectionObserver based, so
 *     this drops into any Vite + Tailwind project with zero new deps.
 * ------------------------------------------------------------------
 */

/* ============================== DESIGN TOKENS ==============================
   Color   abyss #051923 · depth #0a2f3d · current #114b5f
           bioluma #4CE0D2 (signature glow) · coral #ff7a59 (alert accent)
           foam #eaf6f6 · mist #9fc5c9
   Type    Display: Sora · Body: Inter · Data: IBM Plex Mono
   Motif   the buoy's sensor glow — small pulsing cyan nodes — recurs as the
           connective tissue between sections (hotspots, workflow, metrics).
============================================================================ */

const FONT_LINK_ID = "aquasense-fonts";

function useInjectFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ============================== SCROLL REVEAL ============================== */

function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(node);
        }
      },
      { threshold: 0.18, ...options },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`as-reveal ${visible ? "as-reveal-in" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}>
      {children}
    </Tag>
  );
}

/* ============================== ANIMATED COUNTER ============================== */

function Counter({ to, suffix = "", duration = 1600, decimals = 0 }) {
  const [ref, visible] = useReveal({ threshold: 0.6 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const tick = (t) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return (
    <span ref={ref} className="font-mono tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ============================== ICONS (inline, minimal) ============================== */

const Icon = {
  drop: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 2.5c3.6 4.6 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-7.8 7-12.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  wave: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M2 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 14c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  bolt: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gps: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="13.5"
        r="3.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 7 9.6 4h4.8L16 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cloud: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.1 4 4 0 0 0 7 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M6 17h12l-1.5-2.2V10a4.5 4.5 0 0 0-9 0v4.8L6 17Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  chart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 20V9M11 20V4M18 20v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  fish: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M3 12c3-4 8-6 12-6 3 0 5 2.5 6 6-1 3.5-3 6-6 6-4 0-9-2-12-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="10.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  radar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 12 18 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  ),
  battery: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <rect
        x="2"
        y="8"
        width="17"
        height="8"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M21 10.5v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="4.5" y="10" width="7" height="4" rx="0.6" fill="currentColor" />
    </svg>
  ),
  layers: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M12 3 3 8l9 5 9-5-9-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3 13l9 5 9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  chevron: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  arrowRight: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

/* ============================== NAV ============================== */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#technology", label: "Technology" },
    { href: "#intelligence", label: "AI Intelligence" },
    { href: "#dashboard", label: "Dashboard" },
    { href: "#benefits", label: "Benefits" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "as-glass border-b border-white/10 py-3" : "py-4"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="relative w-8 h-8 grid place-items-center">
            <span className="absolute inset-0 rounded-full bg-[#4CE0D2]/25 blur-md group-hover:bg-[#4CE0D2]/40 transition" />
            <svg viewBox="0 0 24 24" className="w-6 h-6 relative" fill="none">
              <path
                d="M12 2.5c3.6 4.6 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-7.8 7-12.4Z"
                stroke="#4CE0D2"
                strokeWidth="1.6"
              />
            </svg>
          </span>
          <span className="font-[Sora] font-semibold tracking-tight text-[#eaf6f6] text-[17px]">
            AquaSense <span className="text-[#4CE0D2]">AI</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] font-medium text-[#9fc5c9] hover:text-[#eaf6f6] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            to="/login"
            className="as-btn-ghost text-[13.5px] px-4 py-2 rounded-full">
            Open Login Portal
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-white/15 text-[#eaf6f6]"
          aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden as-glass mt-3 mx-4 rounded-2xl px-5 py-5 flex flex-col gap-4 border border-white/10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#eaf6f6] text-sm font-medium">
              {l.label}
            </a>
          ))}
          <Link
            to="/login"
            className="as-btn-primary text-center rounded-full py-2.5 text-sm">
            Open Login Portal
          </Link>
        </div>
      )}
    </header>
  );
}

/* ============================== HERO ============================== */

const HOTSPOTS = [
  {
    x: 50,
    y: 12,
    label: "Solar array",
    desc: "Continuous charging keeps the unit powered indefinitely.",
  },
  {
    x: 78,
    y: 24,
    label: "AI vision camera",
    desc: "Edge-processed imagery for wildlife and debris recognition.",
  },
  {
    x: 22,
    y: 26,
    label: "Comms antenna",
    desc: "Cellular / satellite uplink to the cloud platform.",
  },
  {
    x: 64,
    y: 40,
    label: "Weather station",
    desc: "Wind, rainfall, humidity and air temperature in real time.",
  },
  {
    x: 36,
    y: 46,
    label: "GPS antenna",
    desc: "Sub-metre positioning for drift and location tracking.",
  },
  {
    x: 50,
    y: 66,
    label: "Sensor pod",
    desc: "Water chemistry and ocean-dynamics sensors below the waterline.",
  },
];

function Hero() {
  const wrapRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeHotspot, setActiveHotspot] = useState(null);

  const onMouseMove = useCallback((e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: px * 10, y: py * -8 });
  }, []);

  return (
    <section
      id="top"
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative min-h-screen overflow-hidden flex items-center pt-24 pb-12 as-hero-bg">
      {/* ambient particles */}
      <div className="as-particles" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="as-particle" style={{ "--i": i }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* copy */}
        <div>
          <Reveal className="inline-flex items-center gap-2 as-glass rounded-full px-4 py-1.5 text-[12.5px] font-medium text-[#bfe9e4] border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4CE0D2] as-pulse-dot" />
            Now monitoring 240+ marine reserves worldwide
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 font-[Sora] font-[750] leading-[1.05] text-[38px] sm:text-[48px] lg:text-[54px] tracking-tight text-[#f4fbfb]">
              The ocean, <span className="as-gradient-text">watched by AI</span>
              ,<br />
              protected in real time.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#a9cdd0] max-w-lg">
              AquaSense AI is a solar-powered smart buoy network that senses,
              interprets, and reports on marine health continuously — turning
              raw ocean data into conservation decisions your team can act on
              today.
            </p>
          </Reveal>

          <Reveal
            delay={240}
            className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/login"
              className="as-btn-primary rounded-full px-6 py-3 text-[14px] font-semibold inline-flex items-center gap-2 group">
              Open Login Portal
              <Icon.arrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#technology"
              className="as-btn-ghost rounded-full px-6 py-3 text-[14px] font-semibold">
              Explore Technology
            </a>
          </Reveal>

          <Reveal delay={320} className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["27", "sensor parameters"],
              ["24/7", "autonomous uptime"],
              ["98.6%", "AI detection accuracy"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-[20px] font-medium text-[#eaf6f6]">
                  {n}
                </div>
                <div className="text-[11px] text-[#7fa3a6] mt-1 leading-tight">
                  {l}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* buoy visual */}
        <div className="relative flex justify-center">
          <div
            className="relative max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] as-float"
            style={{ transform: `rotate(${tilt.x * 0.15}deg)` }}>
            <div
              className="relative"
              style={{
                transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: "transform .25s ease-out",
              }}>
              <BuoySVG />
              {HOTSPOTS.map((h, i) => (
                <button
                  key={h.label}
                  onMouseEnter={() => setActiveHotspot(i)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  onClick={() =>
                    setActiveHotspot(activeHotspot === i ? null : i)
                  }
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4"
                  aria-label={h.label}>
                  <span className="absolute inset-0 rounded-full bg-[#4CE0D2] as-pulse-dot" />
                  <span className="absolute inset-0 rounded-full bg-[#4CE0D2]/50 as-ping" />
                </button>
              ))}

              {activeHotspot !== null && (
                <div
                  className="absolute z-20 as-glass border border-white/15 rounded-xl px-4 py-3 w-52 text-left shadow-2xl"
                  style={{
                    left: `${HOTSPOTS[activeHotspot].x}%`,
                    top: `${HOTSPOTS[activeHotspot].y}%`,
                    transform: `translate(${HOTSPOTS[activeHotspot].x > 55 ? "-105%" : "18px"}, -10%)`,
                  }}>
                  <div className="text-[13px] font-semibold text-[#eaf6f6]">
                    {HOTSPOTS[activeHotspot].label}
                  </div>
                  <div className="text-[12px] text-[#9fc5c9] mt-1 leading-snug">
                    {HOTSPOTS[activeHotspot].desc}
                  </div>
                </div>
              )}
            </div>

            {/* reflection */}
            <div className="as-reflection">
              <BuoySVG />
            </div>
          </div>

          {/* waves under buoy */}
          <WaveLayer />
        </div>
      </div>
    </section>
  );
}

function BuoySVG(props) {
  return (
    <svg
      viewBox="0 0 400 420"
      className="w-full h-auto drop-shadow-[0_30px_60px_rgba(76,224,210,0.15)]"
      {...props}>
      <defs>
        <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c4a54" />
          <stop offset="1" stopColor="#0a2530" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#123846" />
          <stop offset="1" stopColor="#08222b" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4CE0D2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4CE0D2" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <ellipse
        cx="200"
        cy="230"
        rx="170"
        ry="170"
        fill="url(#glow)"
        opacity="0.5"
      />

      {/* antennas */}
      <line
        x1="150"
        y1="70"
        x2="150"
        y2="18"
        stroke="#3a6b73"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="150" cy="16" r="4" fill="#4CE0D2" className="as-blink" />
      <line
        x1="250"
        y1="70"
        x2="262"
        y2="24"
        stroke="#3a6b73"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="262" cy="22" r="3.5" fill="#eaf6f6" />

      {/* top solar deck */}
      <rect
        x="90"
        y="70"
        width="220"
        height="40"
        rx="10"
        fill="url(#panel)"
        stroke="#2c5560"
        strokeWidth="1.5"
      />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x={100 + i * 34}
          y="78"
          width="28"
          height="24"
          rx="3"
          fill="#0d3038"
          stroke="#245057"
          strokeWidth="1"
        />
      ))}

      {/* camera housing */}
      <rect
        x="278"
        y="88"
        width="34"
        height="34"
        rx="8"
        fill="url(#panel)"
        stroke="#2c5560"
        strokeWidth="1.5"
      />
      <circle
        cx="295"
        cy="105"
        r="8"
        fill="#04141a"
        stroke="#4CE0D2"
        strokeWidth="1.4"
      />
      <circle cx="295" cy="105" r="3" fill="#4CE0D2" />

      {/* main hull */}
      <path
        d="M60 118 h280 a14 14 0 0 1 14 14 v70 a90 90 0 0 1 -90 90 h-128 a90 90 0 0 1 -90 -90 v-70 a14 14 0 0 1 14 -14 Z"
        fill="url(#hull)"
        stroke="#2c5560"
        strokeWidth="1.5"
      />

      {/* status band */}
      <rect
        x="80"
        y="150"
        width="240"
        height="26"
        rx="13"
        fill="#08222b"
        stroke="#204750"
        strokeWidth="1"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={110 + i * 42}
          cy="163"
          r="5"
          fill={i === 2 ? "#ff7a59" : "#4CE0D2"}
          opacity={i === 2 ? 1 : 0.7}
          className={i === 2 ? "as-blink" : ""}
        />
      ))}

      {/* sensor ring / mid band */}
      <rect
        x="70"
        y="196"
        width="260"
        height="18"
        rx="9"
        fill="#0d3038"
        stroke="#204750"
        strokeWidth="1"
      />

      {/* body text plate */}
      <rect
        x="150"
        y="230"
        width="100"
        height="26"
        rx="6"
        fill="#04141a"
        stroke="#2c5560"
        strokeWidth="1"
      />
      <text
        x="200"
        y="247"
        textAnchor="middle"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        fill="#4CE0D2">
        AQUASENSE
      </text>

      {/* lower stabilizer skirt */}
      <path
        d="M96 288 a104 60 0 0 0 208 0 Z"
        fill="#08222b"
        stroke="#204750"
        strokeWidth="1.4"
      />

      {/* underwater sensor pod */}
      <line
        x1="200"
        y1="288"
        x2="200"
        y2="340"
        stroke="#245057"
        strokeWidth="3"
      />
      <ellipse
        cx="200"
        cy="352"
        rx="30"
        ry="14"
        fill="url(#panel)"
        stroke="#2c5560"
        strokeWidth="1.5"
      />
      <circle cx="200" cy="352" r="5" fill="#4CE0D2" opacity="0.85" />
    </svg>
  );
}

function WaveLayer() {
  return (
    <div className="relative mt-2 h-16 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full as-wave-1"
        viewBox="0 0 600 100"
        preserveAspectRatio="none">
        <path
          d="M0 50 Q 75 20 150 50 T 300 50 T 450 50 T 600 50 V100 H0 Z"
          fill="#0d3038"
          opacity="0.55"
        />
      </svg>
      <svg
        className="absolute inset-0 w-full h-full as-wave-2"
        viewBox="0 0 600 100"
        preserveAspectRatio="none">
        <path
          d="M0 60 Q 75 35 150 60 T 300 60 T 450 60 T 600 60 V100 H0 Z"
          fill="#123846"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

/* ============================== SECTION HEADER ============================== */

function SectionHeader({ eyebrow, title, desc, align = "center" }) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-16`}>
      <div className="inline-flex items-center gap-2 text-[12.5px] font-mono font-medium text-[#4CE0D2] tracking-wide uppercase">
        <span className="w-6 h-px bg-[#4CE0D2]/60" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-[Sora] font-[700] text-[32px] sm:text-[38px] leading-tight tracking-tight text-[#eaf6f6]">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-[15.5px] leading-relaxed text-[#9fc5c9]">
          {desc}
        </p>
      )}
    </Reveal>
  );
}

/* ============================== PROBLEM SECTION ============================== */

const PROBLEMS = [
  {
    icon: Icon.wave,
    title: "Coral reef degradation",
    desc: "Bleaching events go unnoticed for weeks without continuous water-quality data.",
  },
  {
    icon: Icon.drop,
    title: "Water pollution",
    desc: "Runoff and spills reach protected waters long before manual sampling catches them.",
  },
  {
    icon: Icon.fish,
    title: "Illegal fishing",
    desc: "Vast, unpatrolled coastlines make enforcement reactive instead of preventive.",
  },
  {
    icon: Icon.sun,
    title: "Climate change",
    desc: "Warming and acidifying waters shift faster than quarterly survey cycles can track.",
  },
  {
    icon: Icon.radar,
    title: "Poor monitoring coverage",
    desc: "Most protected areas rely on sparse, human-powered spot checks.",
  },
  {
    icon: Icon.bell,
    title: "Delayed response",
    desc: "By the time a report reaches a decision-maker, the damage is already done.",
  },
];

function ProblemSection() {
  return (
    <section className="relative py-20 as-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="The Challenge"
          title="Oceans are changing faster than we can watch them"
          desc="Traditional monitoring depends on infrequent visits and manual sampling — leaving critical windows where damage goes undetected and unaddressed."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 70}
              className="as-card rounded-2xl p-6">
              <p.icon className="w-6 h-6 text-[#ff7a59]" />
              <h3 className="mt-4 font-[Sora] font-semibold text-[16.5px] text-[#eaf6f6]">
                {p.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#93b7ba]">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== SOLUTION SECTION ============================== */

const SOLUTIONS = [
  {
    icon: Icon.radar,
    title: "24/7 autonomous monitoring",
    desc: "Every buoy senses continuously — no visit required, no gap in coverage.",
  },
  {
    icon: Icon.layers,
    title: "AI-powered analysis",
    desc: "Edge and cloud models turn raw signals into meaningful environmental context.",
  },
  {
    icon: Icon.chart,
    title: "Predictive insights",
    desc: "Trend models flag deteriorating conditions before they become emergencies.",
  },
  {
    icon: Icon.bell,
    title: "Instant notifications",
    desc: "Alerts reach the right team in seconds, not weeks.",
  },
  {
    icon: Icon.cloud,
    title: "Cloud-connected monitoring",
    desc: "Every reading syncs to a live platform accessible from anywhere.",
  },
  {
    icon: Icon.shield,
    title: "Scientific decision support",
    desc: "Recommendations grounded in historical and real-time data, not guesswork.",
  },
];

function SolutionSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="The Solution"
          title="One autonomous system, watching every hour of every day"
          desc="AquaSense AI replaces scheduled spot-checks with a living sensor network that thinks, learns, and speaks up the moment something changes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SOLUTIONS.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 70}
              className="as-card as-card-hover rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl as-icon-badge grid place-items-center">
                <s.icon className="w-5 h-5 text-[#4CE0D2]" />
              </div>
              <h3 className="mt-4 font-[Sora] font-semibold text-[16.5px] text-[#eaf6f6]">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#93b7ba]">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== FEATURE SHOWCASE (tabs) ============================== */

const FEATURE_GROUPS = [
  {
    key: "chemistry",
    label: "Water Chemistry",
    items: [
      ["Water Temperature", Icon.sun],
      ["Dissolved Oxygen", Icon.drop],
      ["pH", Icon.drop],
      ["Salinity", Icon.drop],
      ["Turbidity", Icon.drop],
      ["Conductivity", Icon.bolt],
    ],
  },
  {
    key: "dynamics",
    label: "Ocean Dynamics",
    items: [
      ["Water Level", Icon.wave],
      ["Wave Height", Icon.wave],
      ["Tide Monitoring", Icon.wave],
    ],
  },
  {
    key: "weather",
    label: "Weather",
    items: [
      ["Rainfall", Icon.drop],
      ["Wind Speed", Icon.wave],
      ["Humidity", Icon.drop],
      ["Air Temperature", Icon.sun],
    ],
  },
  {
    key: "position",
    label: "Position & Power",
    items: [
      ["GPS Tracking", Icon.gps],
      ["Solar Charging", Icon.sun],
      ["Battery Monitoring", Icon.battery],
    ],
  },
  {
    key: "vision",
    label: "AI Vision & Detection",
    items: [
      ["AI Camera", Icon.camera],
      ["Wildlife Observation", Icon.fish],
      ["Coral Health Monitoring", Icon.shield],
      ["Oil Spill Detection", Icon.radar],
      ["Harmful Algae Bloom Detection", Icon.radar],
      ["Illegal Fishing Detection", Icon.fish],
      ["Floating Debris Detection", Icon.radar],
    ],
  },
  {
    key: "systems",
    label: "Systems",
    items: [
      ["Sensor Health Monitoring", Icon.chart],
      ["Edge AI Processing", Icon.layers],
      ["Cloud Synchronization", Icon.cloud],
      ["Emergency Alerts", Icon.bell],
    ],
  },
];

function FeatureShowcase() {
  const [active, setActive] = useState(FEATURE_GROUPS[0].key);
  const group = FEATURE_GROUPS.find((g) => g.key === active);

  return (
    <section id="technology" className="relative py-20 as-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Smart Buoy Showcase"
          title="27 sensing capabilities, one unified instrument"
          desc="Every buoy packs a full environmental sensor suite alongside AI vision — from water chemistry to illegal-activity detection."
        />

        <Reveal className="flex flex-wrap justify-center gap-2 mb-10">
          {FEATURE_GROUPS.map((g) => (
            <button
              key={g.key}
              onClick={() => setActive(g.key)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${
                active === g.key
                  ? "bg-[#4CE0D2] text-[#04141a] border-transparent"
                  : "border-white/12 text-[#9fc5c9] hover:text-[#eaf6f6] hover:border-white/25"
              }`}>
              {g.label}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {group.items.map(([name, IconC], i) => (
            <div
              key={name}
              className="as-card as-card-hover as-fade-swap rounded-2xl p-5 flex items-center gap-4"
              style={{ animationDelay: `${i * 45}ms` }}>
              <div className="w-10 h-10 shrink-0 rounded-lg as-icon-badge grid place-items-center">
                <IconC className="w-4.5 h-4.5 text-[#4CE0D2]" />
              </div>
              <span className="text-[14px] font-medium text-[#e2f4f2]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== AI INTELLIGENCE SECTION ============================== */

const AI_CAPABILITIES = [
  "Environmental anomaly detection",
  "Predictive environmental forecasting",
  "AI recommendations",
  "Risk prediction",
  "Pattern recognition",
  "Water quality prediction",
  "Historical trend learning",
  "Automatic report generation",
  "Intelligent conservation insights",
  "Sensor diagnostics",
];

function AISection() {
  return (
    <section id="intelligence" className="relative py-20 overflow-hidden">
      <div className="as-ai-glow" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative">
        <div>
          <SectionHeader
            eyebrow="AI Intelligence"
            title="A decision-support engine, not just a data feed"
            align="left"
            desc="AquaSense AI's models continuously learn from every sensor across the network, converting raw readings into forecasts and clear, actionable guidance for your team."
          />
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {AI_CAPABILITIES.map((c, i) => (
              <Reveal
                key={c}
                delay={i * 45}
                className="flex items-start gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4CE0D2] shrink-0" />
                <span className="text-[13.5px] text-[#bcdcdb] leading-snug">
                  {c}
                </span>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          delay={120}
          className="as-glass border border-white/10 rounded-3xl p-6 shadow-2xl relative as-float-slow">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[12px] font-mono text-[#7fa3a6]">
              AI_INSIGHT_ENGINE.log
            </span>
            <span className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff7a59]" />
              <span className="w-2 h-2 rounded-full bg-[#f4d35e]" />
              <span className="w-2 h-2 rounded-full bg-[#4CE0D2]" />
            </span>
          </div>

          <div className="space-y-3">
            <InsightRow
              label="Dissolved Oxygen — Reef Zone C"
              value="6.1 mg/L"
              trend="stable"
              tone="ok"
            />
            <InsightRow
              label="Turbidity — River Mouth Station"
              value="+18% (24h)"
              trend="rising"
              tone="warn"
            />
            <InsightRow
              label="Predicted Algae Bloom Risk"
              value="Moderate, 72h"
              trend="watch"
              tone="warn"
            />
            <InsightRow
              label="Coral Thermal Stress Index"
              value="0.4 / 4"
              tone="ok"
              trend="normal"
            />
          </div>

          <div className="mt-6 as-bars">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                style={{
                  "--h": `${30 + Math.round(40 * Math.abs(Math.sin(i * 0.6)))}%`,
                  "--d": `${i * 40}ms`,
                }}
              />
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-[#7fa3a6] font-mono">
            recommendation → deploy secondary sampling pass, Reef Zone C
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function InsightRow({ label, value, tone, trend }) {
  const toneMap = { ok: "#4CE0D2", warn: "#ff7a59" };
  return (
    <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
      <span className="text-[12.5px] text-[#a9cdd0]">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[12.5px] font-mono text-[#eaf6f6]">{value}</span>
        <span
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            color: toneMap[tone],
            backgroundColor: `${toneMap[tone]}22`,
          }}>
          {trend}
        </span>
      </span>
    </div>
  );
}

/* ============================== DASHBOARD PREVIEW ============================== */

function DashboardSection() {
  return (
    <section id="dashboard" className="relative py-20 as-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Live Platform"
          title="Your entire sanctuary, in one live dashboard"
          desc="Track every deployed buoy, review AI insights, and act on alerts — all from a single connected view."
        />

        <Reveal className="as-glass border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
            {/* map */}
            <div className="relative rounded-2xl overflow-hidden as-map-bg min-h-[320px]">
              {[
                [30, 35],
                [55, 55],
                [70, 25],
                [22, 65],
                [80, 60],
                [45, 20],
              ].map(([x, y], i) => (
                <span
                  key={i}
                  className="absolute w-2.5 h-2.5 rounded-full bg-[#4CE0D2] as-ping-slow"
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
              <div className="absolute bottom-4 left-4 as-glass rounded-xl px-3 py-2 border border-white/10">
                <span className="text-[11px] font-mono text-[#bcdcdb]">
                  6 buoys · Reef Sanctuary North
                </span>
              </div>
            </div>

            {/* side stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Water Quality Index" value="Good" tone="ok" />
              <StatTile label="Active Alerts" value="2" tone="warn" />
              <StatTile label="Device Health" value="99.1%" tone="ok" />
              <StatTile label="Wind" value="14 kt" tone="neutral" />
              <div className="col-span-2 as-card rounded-xl p-4">
                <div className="text-[11.5px] font-mono text-[#7fa3a6] mb-3">
                  7-DAY DISSOLVED OXYGEN
                </div>
                <svg viewBox="0 0 200 50" className="w-full h-12">
                  <polyline
                    points="0,35 25,30 50,32 75,20 100,25 125,15 150,22 175,12 200,18"
                    fill="none"
                    stroke="#4CE0D2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-2 as-card rounded-xl p-4">
                <div className="text-[11.5px] font-mono text-[#7fa3a6] mb-2">
                  NOTIFICATIONS
                </div>
                <div className="text-[12.5px] text-[#e2f4f2]">
                  Turbidity rising — River Mouth Station
                </div>
                <div className="text-[11px] text-[#7fa3a6] mt-1">
                  2 minutes ago
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatTile({ label, value, tone }) {
  const toneMap = { ok: "#4CE0D2", warn: "#ff7a59", neutral: "#9fc5c9" };
  return (
    <div className="as-card rounded-xl p-4">
      <div className="text-[11px] text-[#7fa3a6]">{label}</div>
      <div
        className="text-[19px] font-[Sora] font-semibold mt-1"
        style={{ color: toneMap[tone] }}>
        {value}
      </div>
    </div>
  );
}

/* ============================== WORKFLOW ============================== */

const WORKFLOW = [
  "Smart Buoy",
  "Sensors",
  "Edge AI",
  "Cloud Platform",
  "Analytics",
  "Live Dashboard",
  "Smart Alerts",
  "Conservation Decisions",
];

function WorkflowSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="How It Works"
          title="From raw signal to conservation action"
          desc="Every reading travels the same path — sensed, processed, understood, and acted on."
        />
        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px as-workflow-line" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW.map((step, i) => (
              <Reveal
                key={step}
                delay={i * 90}
                className="relative flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <div className="w-12 h-12 shrink-0 rounded-full as-glass border border-[#4CE0D2]/40 grid place-items-center relative z-10">
                  <span className="text-[13px] font-mono text-[#4CE0D2]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="lg:mt-5">
                  <h3 className="font-[Sora] font-semibold text-[15px] text-[#eaf6f6]">
                    {step}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== BENEFITS ============================== */

const BENEFITS = [
  [
    "Marine Sanctuaries",
    "Continuous ecosystem baselines without added field staff.",
  ],
  ["Coral Reefs", "Early thermal-stress warnings ahead of bleaching events."],
  [
    "Mangrove Ecosystems",
    "Sediment and salinity tracking across tidal cycles.",
  ],
  ["Fisheries", "Stock-relevant water conditions logged automatically."],
  ["Aquaculture", "Real-time alerts on oxygen and temperature swings."],
  [
    "Environmental Agencies",
    "Defensible, timestamped data for enforcement and reporting.",
  ],
  ["Local Government Units", "A shared source of truth across jurisdictions."],
  [
    "Universities & Researchers",
    "Open, structured datasets for long-term studies.",
  ],
  [
    "Coastal Communities",
    "Transparent, public-facing water safety information.",
  ],
  [
    "Disaster Response Teams",
    "Faster situational awareness during severe weather.",
  ],
];

const OUTCOMES = [
  ["Faster response times", "62%"],
  ["Lower operational cost", "3.4x"],
  ["Continuous monitoring", "24/7"],
  ["Detection accuracy", "98.6%"],
];

function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-20 as-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Who It's For"
          title="Built for everyone protecting the water"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b[0]}
              delay={i * 55}
              className="as-card rounded-2xl p-5">
              <h3 className="font-[Sora] font-semibold text-[14.5px] text-[#eaf6f6]">
                {b[0]}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#93b7ba]">
                {b[1]}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTCOMES.map(([label, val], i) => (
            <Reveal key={label} delay={i * 80} className="text-center">
              <div className="font-mono text-[30px] sm:text-[36px] font-semibold as-gradient-text">
                {val}
              </div>
              <div className="mt-2 text-[13px] text-[#9fc5c9]">{label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== WHY AQUASENSE (COMPARISON) ============================== */

const COMPARISON = [
  ["Coverage", "Scheduled site visits", "Continuous, 24/7"],
  ["Response time", "Days to weeks", "Seconds to minutes"],
  [
    "Data granularity",
    "Point-in-time samples",
    "Continuous streams, 27 parameters",
  ],
  [
    "Cost over time",
    "Recurring field labor",
    "One deployment, low maintenance",
  ],
  ["Insight", "Manual analysis", "AI-driven forecasting & recommendations"],
];

function ComparisonSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="Why AquaSense AI"
          title="Beyond manual monitoring"
          desc="Autonomous operation and AI-driven insight close the gap that traditional methods can't."
        />
        <Reveal className="as-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 text-[12.5px] font-mono uppercase tracking-wide text-[#7fa3a6] px-6 py-4 border-b border-white/8">
            <span>Criteria</span>
            <span>Traditional Monitoring</span>
            <span className="text-[#4CE0D2]">AquaSense AI</span>
          </div>
          {COMPARISON.map(([c, trad, us]) => (
            <div
              key={c}
              className="grid grid-cols-3 px-6 py-4 border-b border-white/6 last:border-0 text-[13.5px]">
              <span className="font-medium text-[#eaf6f6]">{c}</span>
              <span className="text-[#93b7ba]">{trad}</span>
              <span className="text-[#bfeee8] font-medium">{us}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== METRICS ============================== */

function MetricsSection() {
  const metrics = [
    { to: 240, suffix: "+", label: "Marine reserves monitored" },
    { to: 98.6, suffix: "%", decimals: 1, label: "AI detection accuracy" },
    { to: 1800, suffix: "+", label: "Active sensors deployed" },
    { to: 27, suffix: "", label: "Environmental parameters" },
    { to: 15000, suffix: "+", label: "Real-time alerts delivered" },
  ];
  return (
    <section className="relative py-20 as-section-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 70} className="text-center">
              <div className="font-mono text-[28px] sm:text-[32px] font-semibold text-[#eaf6f6]">
                <Counter
                  to={m.to}
                  suffix={m.suffix}
                  decimals={m.decimals || 0}
                />
              </div>
              <div className="mt-2 text-[12.5px] text-[#9fc5c9] leading-snug">
                {m.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== TESTIMONIALS ============================== */

const TESTIMONIALS = [
  {
    quote:
      "Continuous dissolved-oxygen data lets us catch stress events days before they'd show up in a manual sample.",
    name: "Dr. A. Villanueva",
    role: "Marine Biologist, Coral Research Institute",
  },
  {
    quote:
      "We finally have coverage across the whole reserve, not just the parts we can physically reach each month.",
    name: "Engr. R. Santos",
    role: "Sanctuary Manager, Coastal Protected Area",
  },
  {
    quote:
      "The forecasting models gave our team a two-day head start on the last bloom warning — that's the difference that matters.",
    name: "Dr. L. Fontaine",
    role: "Environmental Scientist, University Marine Lab",
  },
  {
    quote:
      "It's become our shared reference point across departments — one dataset everyone trusts.",
    name: "Hon. M. Cruz",
    role: "Environmental Officer, Local Government Unit",
  },
];

function TestimonialsSection() {
  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="From the Field"
          title="Trusted by the people protecting these waters"
        />
        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 80}
              className="as-card rounded-2xl p-7">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#4CE0D2]/50 mb-4"
                fill="currentColor">
                <path d="M7 6c-2.8 0-5 2.2-5 5 0 2.6 2 4.8 4.5 5v2c-3.9-.2-7-3.5-7-7.5C-.5 6.5 3 3 7 3v3Zm12 0c-2.8 0-5 2.2-5 5 0 2.6 2 4.8 4.5 5v2c-3.9-.2-7-3.5-7-7.5C11.5 6.5 15 3 19 3v3Z" />
              </svg>
              <p className="text-[15px] leading-relaxed text-[#e2f4f2]">
                {t.quote}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full as-icon-badge grid place-items-center text-[12px] font-semibold text-[#4CE0D2]">
                  {t.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <div className="text-[13.5px] font-medium text-[#eaf6f6]">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-[#7fa3a6]">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== FAQ ============================== */

const FAQS = [
  [
    "How is a buoy deployed?",
    "Each unit ships pre-calibrated and anchors in place within a single-day field visit — no permanent infrastructure or diving required for standard installations.",
  ],
  [
    "How much maintenance does it need?",
    "Solar charging and self-cleaning sensor housings keep unattended runtime to roughly 6–12 months between service visits, depending on biofouling conditions.",
  ],
  [
    "What does the AI actually do?",
    "It cleans and cross-references incoming sensor data, flags anomalies against historical baselines, forecasts short-term risk, and drafts recommended actions for your team to review.",
  ],
  [
    "What can the sensors measure?",
    "Water temperature, dissolved oxygen, pH, salinity, turbidity, conductivity, water level, wave height, tide, plus weather variables and AI camera-based detection.",
  ],
  [
    "How does it stay connected?",
    "Buoys sync over cellular networks where available, with satellite uplink as a fallback in remote or offshore deployments.",
  ],
  [
    "How is it powered?",
    "A solar array with battery buffering keeps the system running continuously, including through extended overcast periods.",
  ],
  [
    "Can it survive storms and rough seas?",
    "The housing is rated for sustained marine exposure and high sea states, with a stabilized hull designed to keep sensors submerged correctly in swell.",
  ],
  [
    "What area can one buoy cover?",
    "Each unit reports hyper-local conditions at its anchor point; sanctuaries typically deploy a cluster to build a coverage map across key zones.",
  ],
];

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <Reveal className="as-card rounded-2xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="text-[15px] font-medium text-[#eaf6f6]">{q}</span>
        <Icon.chevron
          className={`w-4.5 h-4.5 text-[#4CE0D2] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[13.5px] leading-relaxed text-[#93b7ba]">
            {a}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-20 as-section-alt">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          eyebrow="Questions"
          title="Everything you need to know"
        />
        <div className="space-y-3">
          {FAQS.map(([q, a], i) => (
            <FAQItem
              key={q}
              q={q}
              a={a}
              isOpen={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== FINAL CTA ============================== */

function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="as-cta-glow" aria-hidden />
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <Reveal>
          <h2 className="font-[Sora] font-[750] text-[34px] sm:text-[44px] leading-tight tracking-tight text-[#f4fbfb]">
            Start protecting your waters,{" "}
            <span className="as-gradient-text">starting today</span>
          </h2>
          <p className="mt-5 text-[15.5px] text-[#a9cdd0] max-w-lg mx-auto leading-relaxed">
            Sign in to the AquaSense AI platform to view live buoy data, review
            AI recommendations, and manage your sanctuary's monitoring network.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="as-btn-primary rounded-full px-8 py-4 text-[15.5px] font-semibold inline-flex items-center gap-2 group">
              Open Login Portal
              <Icon.arrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */

function Footer() {
  return (
    <footer className="relative border-t border-white/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path
                  d="M12 2.5c3.6 4.6 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-7.8 7-12.4Z"
                  stroke="#4CE0D2"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="font-[Sora] font-semibold text-[#eaf6f6]">
                AquaSense <span className="text-[#4CE0D2]">AI</span>
              </span>
            </div>
            <p className="mt-4 text-[13px] text-[#7fa3a6] leading-relaxed max-w-xs">
              AI-powered smart buoy monitoring for marine sanctuaries, coral
              reefs, and protected coastal waters.
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              ["Technology", "#technology"],
              ["AI Intelligence", "#intelligence"],
              ["Dashboard", "#dashboard"],
              ["Benefits", "#benefits"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["FAQ", "#faq"],
              ["Login Portal", "/login"],
            ]}
            isRouter
          />
          <div>
            <div className="text-[12.5px] font-mono uppercase tracking-wide text-[#7fa3a6] mb-4">
              Contact
            </div>
            <p className="text-[13.5px] text-[#bcdcdb]">hello@aquasense.ai</p>
            <div className="flex gap-3 mt-4">
              {["X", "in", "◎"].map((s) => (
                <span
                  key={s}
                  className="w-8 h-8 rounded-full as-icon-badge grid place-items-center text-[11px] text-[#4CE0D2]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#6c9497]">
          <span>
            © {new Date().getFullYear()} AquaSense AI. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#9fc5c9]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#9fc5c9]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, isRouter }) {
  return (
    <div>
      <div className="text-[12.5px] font-mono uppercase tracking-wide text-[#7fa3a6] mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map(([label, href]) =>
          isRouter && href.startsWith("/") ? (
            <li key={label}>
              <Link
                to={href}
                className="text-[13.5px] text-[#bcdcdb] hover:text-[#eaf6f6] transition-colors">
                {label}
              </Link>
            </li>
          ) : (
            <li key={label}>
              <a
                href={href}
                className="text-[13.5px] text-[#bcdcdb] hover:text-[#eaf6f6] transition-colors">
                {label}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

/* ============================== GLOBAL STYLE ============================== */

function GlobalStyle() {
  return (
    <style>{`
      #as-root {
        background: #051923;
        color: #eaf6f6;
        font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      }
      .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

      .as-gradient-text {
        background: linear-gradient(90deg, #4CE0D2, #7ff0d8 60%, #4CE0D2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .as-hero-bg {
        background:
          radial-gradient(60% 50% at 80% 8%, rgba(76,224,210,0.14), transparent 60%),
          radial-gradient(50% 40% at 15% 90%, rgba(255,122,89,0.08), transparent 60%),
          linear-gradient(180deg, #051923 0%, #072530 55%, #0a2f3d 100%);
      }
      .as-section-alt { background: linear-gradient(180deg, transparent, rgba(255,255,255,0.02), transparent); }

      .as-glass {
        background: rgba(15, 42, 51, 0.55);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      .as-card {
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.08);
        transition: transform .35s ease, border-color .35s ease, background .35s ease;
      }
      .as-card-hover:hover {
        transform: translateY(-4px);
        border-color: rgba(76,224,210,0.35);
        background: rgba(255,255,255,0.045);
      }
      .as-icon-badge {
        background: rgba(76,224,210,0.12);
        border: 1px solid rgba(76,224,210,0.25);
      }

      .as-btn-primary {
        background: #4CE0D2;
        color: #04141a;
        transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        box-shadow: 0 8px 30px rgba(76,224,210,0.25);
      }
      .as-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(76,224,210,0.4); background: #66e8dc; }
      .as-btn-ghost {
        border: 1px solid rgba(255,255,255,0.18);
        color: #eaf6f6;
        transition: border-color .25s ease, background .25s ease;
      }
      .as-btn-ghost:hover { border-color: rgba(76,224,210,0.5); background: rgba(76,224,210,0.08); }

      .as-reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s cubic-bezier(.2,.7,.3,1), transform .7s cubic-bezier(.2,.7,.3,1); }
      .as-reveal-in { opacity: 1; transform: translateY(0); }

      @keyframes as-float-kf { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(0.6deg); } }
      .as-float { animation: as-float-kf 6.5s ease-in-out infinite; }
      @keyframes as-float-slow-kf { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      .as-float-slow { animation: as-float-slow-kf 7s ease-in-out infinite; }

      .as-reflection {
        margin-top: -14px;
        transform: scaleY(-1);
        opacity: 0.16;
        -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 65%);
        mask-image: linear-gradient(180deg, rgba(0,0,0,0.6), transparent 65%);
        filter: blur(1px);
      }

      @keyframes as-wave-kf-1 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      @keyframes as-wave-kf-2 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      .as-wave-1, .as-wave-2 { width: 200%; }
      .as-wave-1 { animation: as-wave-kf-1 9s linear infinite; }
      .as-wave-2 { animation: as-wave-kf-2 13s linear infinite reverse; }

      .as-pulse-dot { animation: as-pulse-kf 2.4s ease-in-out infinite; }
      @keyframes as-pulse-kf { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

      .as-ping { animation: as-ping-kf 2.2s cubic-bezier(0,0,0.2,1) infinite; }
      @keyframes as-ping-kf { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.4); opacity: 0; } }
      .as-ping-slow { animation: as-ping-kf 3.4s cubic-bezier(0,0,0.2,1) infinite; }

      .as-blink { animation: as-blink-kf 1.6s ease-in-out infinite; }
      @keyframes as-blink-kf { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

      .as-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
      .as-particle {
        position: absolute;
        width: 3px; height: 3px;
        border-radius: 999px;
        background: rgba(76,224,210,0.55);
        left: calc(5% + (var(--i) * 4.3%));
        top: 100%;
        animation: as-particle-kf calc(9s + (var(--i) * 0.4s)) linear infinite;
        animation-delay: calc(var(--i) * -0.6s);
      }
      @keyframes as-particle-kf {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.8; }
        100% { transform: translateY(-110vh) translateX(20px); opacity: 0; }
      }

      .as-fade-swap { animation: as-fade-swap-kf .5s ease both; }
      @keyframes as-fade-swap-kf { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

      .as-ai-glow {
        position: absolute; inset: 0;
        background: radial-gradient(45% 55% at 75% 40%, rgba(76,224,210,0.10), transparent 65%);
        pointer-events: none;
      }
      .as-cta-glow {
        position: absolute; inset: 0;
        background: radial-gradient(60% 60% at 50% 30%, rgba(76,224,210,0.14), transparent 65%);
        pointer-events: none;
      }

      .as-bars { display: flex; align-items: flex-end; gap: 3px; height: 44px; }
      .as-bars span {
        flex: 1;
        background: linear-gradient(180deg, #4CE0D2, rgba(76,224,210,0.15));
        height: var(--h);
        border-radius: 2px;
        animation: as-bar-kf 2.6s ease-in-out infinite;
        animation-delay: var(--d);
      }
      @keyframes as-bar-kf { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }

      .as-workflow-line {
        background: repeating-linear-gradient(90deg, rgba(76,224,210,0.4) 0 10px, transparent 10px 18px);
      }

      .as-map-bg {
        background:
          radial-gradient(circle at 30% 30%, rgba(76,224,210,0.12), transparent 55%),
          linear-gradient(135deg, #0a2f3d, #06202a 60%, #041219);
      }
      .as-map-bg::before {
        content: '';
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 34px 34px;
      }

      @media (prefers-reduced-motion: reduce) {
        .as-float, .as-float-slow, .as-particle, .as-wave-1, .as-wave-2, .as-pulse-dot, .as-ping, .as-ping-slow, .as-blink, .as-bars span {
          animation: none !important;
        }
        .as-reveal { transition: none; opacity: 1; transform: none; }
      }
    `}</style>
  );
}

/* ============================== PAGE ============================== */

export default function LandingPage() {
  useInjectFonts();
  return (
    <div
      id="as-root"
      className="min-h-screen antialiased selection:bg-[#4CE0D2]/30">
      <GlobalStyle />
      <Nav />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <FeatureShowcase />
        <AISection />
        <DashboardSection />
        <WorkflowSection />
        <BenefitsSection />
        <ComparisonSection />
        <MetricsSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
