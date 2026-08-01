import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { SEO, defaultStructuredData } from "../components/seo/SEO";
import {
  Anchor,
  Radio,
  Satellite,
  Sun,
  MapPin,
  Activity,
  Droplet,
  Wind,
  Battery,
  BarChart3,
  Map as MapIcon,
  Bell,
  FileText,
  Cloud,
  Cpu,
  Fish,
  ShieldAlert,
  CloudRain,
  Wrench,
  Zap,
  Database,
  Server,
  Globe as GlobeIcon,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Gauge,
  Thermometer,
  Waves,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                       */
/* ------------------------------------------------------------------ */
const C = {
  primary: "#0B4D8C",
  secondary: "#1479D7",
  accent: "#00D4FF",
  bg: "#031726",
  surface: "#071F35",
  white: "#FFFFFF",
  textSub: "#A8C2DA",
  border: "rgba(255,255,255,0.08)",
};

/* ------------------------------------------------------------------ */
/*  HOOKS                                                               */
/* ------------------------------------------------------------------ */

// Reveal-on-scroll
function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// Count-up animation triggered on visibility
function useCountUp(target, visible, duration = 1600) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return value;
}

/* ------------------------------------------------------------------ */
/*  SMALL UI ATOMS                                                      */
/* ------------------------------------------------------------------ */

// Coordinate-style eyebrow tag — a recurring signature motif standing in
// for a buoy's GPS fix, used instead of generic "01 / 02 / 03" numbering.
function Coord({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-5"
      style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>
      <span className="h-[6px] w-[6px]" style={{ background: C.accent }} />
      {children}
    </div>
  );
}

function SectionHeading({ coord, title, sub, align = "left" }) {
  return (
    <div
      className={
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl"
      }>
      {coord && <Coord>{coord}</Coord>}
      <h2
        className="text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight"
        style={{ color: C.white }}>
        {title}
      </h2>
      {sub && (
        <p
          className="mt-5 text-base md:text-lg leading-relaxed"
          style={{ color: C.textSub }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium tracking-wide overflow-hidden ${className}`}
      style={{ background: C.accent, color: "#03131F" }}
      {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
        style={{ background: C.white }}
      />
    </button>
  );
}

function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium tracking-wide border transition-colors duration-300 hover:bg-white/[0.06] ${className}`}
      style={{ borderColor: C.border, color: C.white }}
      {...props}>
      {children}
    </button>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SIGNATURE VISUAL — sonar / buoy ping instrument                     */
/* ------------------------------------------------------------------ */
function BuoySonar() {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      <svg viewBox="0 0 520 520" className="w-full h-full">
        <defs>
          <radialGradient id="sonarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={C.accent} stopOpacity="0.25" />
            <stop offset="100%" stopColor={C.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="buoyBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.secondary} />
            <stop offset="100%" stopColor={C.primary} />
          </linearGradient>
        </defs>

        <circle cx="260" cy="260" r="230" fill="url(#sonarGlow)" />

        {[80, 140, 200].map((r, i) => (
          <circle
            key={r}
            cx="260"
            cy="260"
            r={r}
            fill="none"
            stroke={C.border.replace("0.08", "0.18")}
            strokeWidth="1"
          />
        ))}

        {/* rotating sweep */}
        <g
          style={{
            transformOrigin: "260px 260px",
            animation: "sweep 5s linear infinite",
          }}>
          <path
            d="M260 260 L260 30 A230 230 0 0 1 420 100 Z"
            fill={C.accent}
            opacity="0.06"
          />
          <line
            x1="260"
            y1="260"
            x2="260"
            y2="30"
            stroke={C.accent}
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>

        {/* buoy silhouette */}
        <g transform="translate(210,150)">
          <ellipse
            cx="50"
            cy="215"
            rx="60"
            ry="10"
            fill="#000"
            opacity="0.35"
          />
          <rect
            x="46"
            y="0"
            width="8"
            height="40"
            fill={C.textSub}
            opacity="0.7"
          />
          <circle cx="50" cy="-6" r="6" fill={C.accent}>
            <animate
              attributeName="opacity"
              values="1;0.25;1"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <path
            d="M10 55 Q50 30 90 55 L100 150 Q50 175 0 150 Z"
            fill="url(#buoyBody)"
            stroke={C.accent}
            strokeOpacity="0.4"
          />
          <rect
            x="0"
            y="150"
            width="100"
            height="14"
            fill={C.surface}
            stroke={C.border}
          />
        </g>

        {/* ping dot */}
        <circle cx="150" cy="360" r="4" fill={C.accent}>
          <animate
            attributeName="r"
            values="4;10;4"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0;0.9"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="370" cy="180" r="3" fill={C.accent} opacity="0.7" />
      </svg>

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 border text-[11px] tracking-[0.2em]"
        style={{
          borderColor: C.border,
          background: "rgba(3,23,38,0.6)",
          color: C.textSub,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
        10.3157° N &nbsp;·&nbsp; 123.6122° E &nbsp;·&nbsp; LIVE
      </div>

      <style>{`
        @keyframes sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function TelemetryGlobe() {
  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/11104160-hd_1920_1080_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03131f]/20 to-[#03131f]/85" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-[72%] h-[72%] rounded-full border border-white/15"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05)" }}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-white/10"
              style={{ transform: `scale(${0.72 - i * 0.11})` }}
            />
          ))}
          <div className="absolute inset-0 rounded-full border border-white/10 opacity-70" />
        </div>
      </div>
      <div className="absolute left-5 top-5 rounded-full bg-[#03131f]/70 px-4 py-3 text-sm font-medium text-[#d5f6f2]">
        LIVE CONNECTIVITY
      </div>
      <div className="absolute right-5 bottom-5 rounded-full bg-[#03131f]/70 px-4 py-3 text-sm font-medium text-[#d5f6f2]">
        REAL-TIME OCEAN AI
      </div>
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  CORAL REEF                                                        */
/* ------------------------------------------------------------------ */
function CoralReef() {
  const [ref, visible] = useReveal(0.18);

  return (
    <section
      id="coral-reef"
      ref={ref}
      className="relative min-h-[500px] flex items-center overflow-hidden"
      style={{ background: C.bg }}>
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/video/coralreef.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(3,15,30,0.85) 0%, rgba(3,15,30,0.6) 40%, rgba(3,15,30,0.75) 100%)",
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
        <div className="max-w-2xl">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#00D4FF]">
                Coral Reef Monitoring
              </div>
              <h3
                className="text-3xl md:text-4xl font-semibold mt-4"
                style={{ color: C.white }}>
                Protect Our Coral Reefs with AI-Powered Intelligence
              </h3>
              <p
                className="mt-4 text-base text-[15px] max-w-xl"
                style={{ color: C.textSub }}>
                NELEUS1's smart buoys monitor coral reef health in real time,
                tracking water temperature, pH, turbidity, and marine life
                activity. Our AI detects early signs of bleaching and
                environmental stress, helping conservationists act before
                irreversible damage occurs.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  ["Coral Health Tracking", "✔"],
                  ["Water Quality Sensors", "✔"],
                  ["Bleaching Early Warning", "✔"],
                  ["Marine Life Activity", "✔"],
                  ["Temperature & pH Monitoring", "✔"],
                  ["Conservation Alerts", "✔"],
                ].map(([label, mark]) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="text-accent text-[#00D4FF]">{mark}</div>
                    <div style={{ color: C.white }}>{label}</div>
                  </div>
                ))}
              </div>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FISHERIES SECTION                                                  */
/* ------------------------------------------------------------------ */
function FisheriesSection() {
  const [ref, visible] = useReveal(0.18);
  const cages = useCountUp(2500, visible);
  const uptime = useCountUp(24, visible);
  const reliability = useCountUp(99.9, visible);

  return (
    <section
      id="fisheries"
      ref={ref}
      className="relative py-20"
      style={{ background: C.bg }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 20% 20%, rgba(4,12,20,0.25), transparent 40%)",
          }}
        />
        <div className="absolute inset-0" aria-hidden>
          <div className="w-full h-full" />
        </div>
        <style>{`
          .fish-particle { position:absolute; width:4px;height:4px;border-radius:2px;background:rgba(255,255,255,0.06); opacity:0.9 }
          @keyframes fp { from { transform: translateY(10px); opacity:0 } to { transform: translateY(-30px); opacity:0.6 } }
        `}</style>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#9fd0d8]">
                LET NELEUS1 HANDLE YOUR FISHERIES
              </div>
              <h3
                className="text-3xl md:text-4xl font-semibold mt-4"
                style={{ color: C.white }}>
                Smarter Fish Farming Starts with Real-Time Ocean Intelligence
              </h3>
              <p
                className="mt-4 text-base text-[15px] max-w-xl"
                style={{ color: C.textSub }}>
                NELEUS1 continuously monitors water conditions around your fish
                cages using AI-powered smart buoys. Receive real-time
                environmental data, instant alerts, and predictive insights that
                help protect your stock, improve feeding schedules, reduce
                losses, and maximize productivity.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  ["Real-Time Monitoring", "✔"],
                  ["AI Water Quality Analysis", "✔"],
                  ["Fish Health Monitoring", "✔"],
                  ["Environmental Alerts", "✔"],
                  ["Cloud Synchronization", "✔"],
                  ["Solar Powered Smart Buoy", "✔"],
                ].map(([label, mark]) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="text-accent text-[#00D4FF]">{mark}</div>
                    <div style={{ color: C.white }}>{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-[#00D4FF] text-[#03131F] font-medium">
                  Explore Fisheries Solution
                </button>
                <button
                  className="px-6 py-3 border"
                  style={{ borderColor: C.border, color: C.white }}>
                  Watch Platform Demo
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="w-full h-[420px] md:h-[520px]">
              <video
                className="w-full h-full object-cover"
                src="/video/fishcage.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(3,7,12,0.0), rgba(3,7,12,0.45))",
                }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={220}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div
                className="text-3xl font-semibold"
                style={{ color: C.white }}>
                {cages >= 1000
                  ? `${Math.round(cages)}+`
                  : `${Math.round(cages)}`}
              </div>
              <div className="mt-1 text-sm" style={{ color: C.textSub }}>
                Fish Cages Supported
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-semibold"
                style={{ color: C.white }}>
                {uptime.toFixed(0)}
              </div>
              <div className="mt-1 text-sm" style={{ color: C.textSub }}>
                24/7 Continuous Monitoring
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-semibold"
                style={{ color: C.white }}>
                {reliability.toFixed(1)}%
              </div>
              <div className="mt-1 text-sm" style={{ color: C.textSub }}>
                Data Reliability
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-semibold"
                style={{ color: C.white }}>
                AI
              </div>
              <div className="mt-1 text-sm" style={{ color: C.textSub }}>
                Predictive Analytics
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                          */
/* ------------------------------------------------------------------ */
function Nav() {
  const navigate = useNavigate();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    "Platform",
    "Features",
    "Monitoring",
    "AI Insights",
    "Technology",
    "Contact",
  ];

  const textColor = C.white;
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        background: solid ? "rgba(36, 71, 97, 0.92)" : "transparent",
        borderBottom: solid
          ? `1px solid rgba(255,255,255,0.04)`
          : "1px solid transparent",
        backdropFilter: solid ? "blur(6px)" : "none",
        color: textColor,
      }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center relative -left-12">
          <img
            src="/image/logow.png"
            alt="NELEUS1 logo"
            className="h-20 md:h-24 w-auto object-contain relative top-1 md:top-2"
          />
          <img
            src="/image/name.png"
            alt="NELEUS1"
            className="h-32 md:h-36 w-auto object-contain self-center -ml-26 md:-ml-16 relative top-[2px] md:top-[4px]"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className={`text-[13px] tracking-wide transition-colors duration-300 ${
                solid ? "hover:text-[#00D4FF]" : "hover:text-white"
              }`}
              style={{ color: solid ? C.textSub : C.white }}>
              {l}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className={`px-5 py-2.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
              solid ? "hover:text-[#00D4FF]" : "hover:text-white"
            }`}
            style={{ color: solid ? C.textSub : C.white }}>
            Login
          </button>
          <button
            className="px-5 py-2.5 text-[13px] font-medium tracking-wide"
            style={{ background: C.accent, color: "#03131F" }}>
            Launch Dashboard
          </button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: textColor }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden px-6 pb-8 pt-2 flex flex-col gap-5"
          style={{
            background: "rgba(3,23,38,0.98)",
            borderTop: `1px solid ${solid ? "rgba(255,255,255,0.04)" : C.border}`,
          }}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm"
              style={{ color: C.white }}
              onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <div
            className="flex flex-col gap-3 pt-4"
            style={{ borderTop: `1px solid ${C.border}` }}>
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-3 text-sm text-left"
              style={{ color: C.white }}>
              Login
            </button>
            <button
              className="px-5 py-3 text-sm font-medium"
              style={{ background: C.accent, color: "#03131F" }}>
              Launch Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: C.bg }}>
      <BackgroundVideo />
      <div className="absolute inset-0 bg-[#03131f]/70" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
        <Reveal>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight"
            style={{ color: C.white }}>
            Ocean Intelligence,{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.secondary}, ${C.accent})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}>
              Built for Smarter
            </span>{" "}
            Coastal Monitoring
          </h1>
          <p
            className="mt-7 text-base md:text-lg max-w-xl leading-relaxed"
            style={{ color: C.textSub }}>
            NELEUS1 is an AI-powered smart buoy platform that watches the water
            continuously — reading conditions, forecasting change, spotting fish
            activity, and streaming the findings to fisheries, researchers,
            local governments, and coastal communities in real time.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <PrimaryButton>
              Launch Dashboard <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Explore Platform</GhostButton>
          </div>

          <div className="mt-14 flex items-center gap-8 flex-wrap">
            {[
              ["ESP32", Cpu],
              ["Supabase", Database],
              ["Solar", Sun],
              ["GPS", MapPin],
            ].map(([label, Icon]) => (
              <div
                key={label}
                className="flex items-center gap-2"
                style={{ color: C.textSub }}>
                <Icon size={16} style={{ color: C.accent }} />
                <span className="text-xs tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BackgroundVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/10779129-hd_1920_1080_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#03131f]/20 to-[#03131f]/80" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST / STATS                                                       */
/* ------------------------------------------------------------------ */
function StatCard({ value, suffix, label, decimals = 0 }) {
  const [ref, visible] = useReveal(0.4);
  const count = useCountUp(value, visible);
  return (
    <div
      ref={ref}
      className="px-8 py-10 border-t md:border-t-0 md:border-l first:border-l-0 first:border-t-0"
      style={{ borderColor: C.border }}>
      <div
        className="text-4xl md:text-5xl font-semibold tabular-nums"
        style={{ color: C.white, fontFamily: "'JetBrains Mono', monospace" }}>
        {count.toFixed(decimals)}
        <span style={{ color: C.accent }}>{suffix}</span>
      </div>
      <div className="mt-3 text-sm" style={{ color: C.textSub }}>
        {label}
      </div>
    </div>
  );
}

function Trust() {
  return (
    <section
      className="border-y"
      style={{ borderColor: C.border, background: C.surface }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <SectionHeading
            coord="NETWORK STATUS"
            title="Trusted Ocean Intelligence Platform"
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4">
          <StatCard value={500} suffix="+" label="Active Smart Buoys" />
          <StatCard value={24} suffix="/7" label="Real-Time Monitoring" />
          <StatCard value={10} suffix="M+" label="Environmental Data Points" />
          <StatCard
            value={99.9}
            suffix="%"
            label="Cloud Availability"
            decimals={1}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PLATFORM                                                            */
/* ------------------------------------------------------------------ */
function Platform() {
  const items = [
    [
      "ESP32 Core",
      Cpu,
      "A low-power microcontroller reads every sensor onboard and pushes data the moment conditions change.",
    ],
    [
      "Supabase Cloud",
      Database,
      "Every reading lands in a managed Postgres backend seconds after it's captured, ready to query.",
    ],
    [
      "Solar Powered",
      Sun,
      "A marine-grade panel and battery bank keep each buoy running indefinitely without a service trip.",
    ],
    [
      "GPS Tracking",
      MapPin,
      "Continuous position reporting keeps drifting units accounted for and easy to recover.",
    ],
    [
      "Real-Time Sensors",
      Activity,
      "Temperature, pH, turbidity, salinity, and dissolved oxygen stream in on a shared clock.",
    ],
    [
      "AI Analysis",
      TrendingUp,
      "Incoming readings are scored against historical patterns to flag what actually matters.",
    ],
  ];
  return (
    <section id="platform" className="py-20" style={{ background: C.bg }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <SectionHeading
            coord="THE NETWORK"
            title="The Next Generation Smart Buoy Network"
            sub="A single NELEUS1 unit is a full monitoring station — sensing, positioning, powering, and reasoning about the water around it, then reporting back over a resilient cloud link."
          />
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {items.map(([title, Icon, desc]) => (
              <div key={title} className="flex gap-3">
                <Icon
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: C.accent }}
                />
                <div>
                  <div
                    className="text-sm font-medium"
                    style={{ color: C.white }}>
                    {title}
                  </div>
                  <div
                    className="text-xs mt-1 leading-relaxed"
                    style={{ color: C.textSub }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <TelemetryGlobe />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURES (alternating)                                              */
/* ------------------------------------------------------------------ */
function FeaturePanel({ label }) {
  const maps = {
    monitoring: [
      ["Water Temp", Thermometer, "18.4°C"],
      ["pH Level", Droplet, "8.1"],
      ["Turbidity", Waves, "3.2 NTU"],
      ["Dissolved O₂", Activity, "6.7 mg/L"],
      ["Salinity", Gauge, "34.5 PSU"],
      ["Signal", Radio, "Strong"],
    ],
    ai: [
      ["Fish Activity", Fish, "High"],
      ["Water Quality", Gauge, "92 / 100"],
      ["Weather Shift", CloudRain, "Incoming"],
      ["Risk Level", ShieldAlert, "Low"],
    ],
    dashboard: [
      ["Charts", BarChart3],
      ["Map View", MapIcon],
      ["Alerts", Bell],
      ["Reports", FileText],
    ],
    cloud: [
      ["ESP32 Link", Cpu],
      ["Supabase Sync", Database],
      ["Notifications", Bell],
      ["Instant Sync", Zap],
    ],
  };
  const rows = maps[label];
  return (
    <div
      className="p-8 border"
      style={{ borderColor: C.border, background: C.surface }}>
      <div className="grid grid-cols-2 gap-4">
        {rows.map((row) => {
          const [name, Icon, val] = row;
          return (
            <div
              key={name}
              className="flex items-center gap-3 px-4 py-4 border"
              style={{ borderColor: C.border, background: C.bg }}>
              <Icon size={16} style={{ color: C.accent }} />
              <div className="min-w-0">
                <div className="text-[11px]" style={{ color: C.textSub }}>
                  {name}
                </div>
                {val && (
                  <div
                    className="text-sm font-medium truncate"
                    style={{
                      color: C.white,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                    {val}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeatureRow({ coord, title, desc, panel, reverse }) {
  return (
    <Reveal
      className={`grid lg:grid-cols-2 gap-14 items-center py-20 border-b`}>
      <div
        style={{ borderColor: C.border }}
        className={reverse ? "lg:order-2" : ""}>
        <Coord>{coord}</Coord>
        <h3
          className="text-2xl md:text-3xl font-semibold tracking-tight"
          style={{ color: C.white }}>
          {title}
        </h3>
        <p
          className="mt-5 text-base leading-relaxed max-w-md"
          style={{ color: C.textSub }}>
          {desc}
        </p>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <FeaturePanel label={panel} />
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section id="features" className="py-20" style={{ background: C.bg }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="CAPABILITIES"
            title="Everything a Coastal Monitoring Team Needs"
          />
        </Reveal>
        <div className="mt-6" style={{ borderColor: C.border }}>
          <FeatureRow
            coord="FEATURE 01 · MONITORING"
            title="Real-Time Monitoring"
            desc="Live sensor data on temperature, pH, turbidity, dissolved oxygen, salinity, GPS position, battery, and signal strength — refreshed continuously, not on a delay."
            panel="monitoring"
          />
          <FeatureRow
            coord="FEATURE 02 · AI INSIGHTS"
            title="AI Prediction Engine"
            desc="Models trained on historical readings forecast fish activity, water quality trends, weather shifts, and emerging environmental risk before they escalate."
            panel="ai"
            reverse
          />
          <FeatureRow
            coord="FEATURE 03 · DASHBOARD"
            title="Interactive Dashboard"
            desc="Charts, maps, historical analytics, alerts, and exportable reports — one interface for everything the network is seeing."
            panel="dashboard"
          />
          <FeatureRow
            coord="FEATURE 04 · CLOUD"
            title="Cloud Connected"
            desc="ESP32 hardware syncs straight to Supabase, so every reading and notification reaches your team the instant it happens."
            panel="cloud"
            reverse
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD PREVIEW                                                   */
/* ------------------------------------------------------------------ */
function DashboardPreview() {
  const buoys = [
    { id: "NLS-014", loc: "Cebu Strait", temp: "27.8°C", status: "Nominal" },
    { id: "NLS-022", loc: "Bohol Sea", temp: "28.3°C", status: "Nominal" },
    { id: "NLS-031", loc: "Tañon Strait", temp: "26.9°C", status: "Alert" },
  ];
  const bars = [40, 65, 50, 80, 60, 90, 70, 55, 85, 62, 74, 48];
  return (
    <section
      id="monitoring"
      className="py-20"
      style={{ background: C.surface }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="LIVE PREVIEW"
            title="One Dashboard, the Whole Coastline"
            align="center"
          />
        </Reveal>

        <Reveal delay={100}>
          <div
            className="mt-14 border"
            style={{ borderColor: C.border, background: C.bg }}>
            <div
              className="flex items-center justify-between px-6 py-4 border-b"
              style={{ borderColor: C.border }}>
              <span className="text-sm font-medium" style={{ color: C.white }}>
                Fleet Overview
              </span>
              <span
                className="text-xs"
                style={{
                  color: C.textSub,
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                SYNCED 2s AGO
              </span>
            </div>

            <div
              className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x"
              style={{ borderColor: C.border }}>
              {/* chart */}
              <div
                className="lg:col-span-2 p-6"
                style={{ borderColor: C.border }}>
                <div className="text-xs mb-4" style={{ color: C.textSub }}>
                  Water Temperature — 12hr
                </div>
                <div className="flex items-end gap-2 h-40">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        height: `${h}%`,
                        background:
                          i === bars.length - 3 ? C.accent : `${C.secondary}88`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {buoys.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 border"
                      style={{ borderColor: C.border }}>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: C.white,
                            fontFamily: "'JetBrains Mono', monospace",
                          }}>
                          {b.id}
                        </span>
                        <span
                          className="h-2 w-2"
                          style={{
                            background:
                              b.status === "Alert" ? "#FF6B6B" : C.accent,
                          }}
                        />
                      </div>
                      <div
                        className="text-[11px] mt-2"
                        style={{ color: C.textSub }}>
                        {b.loc}
                      </div>
                      <div
                        className="text-lg mt-1 font-semibold"
                        style={{ color: C.white }}>
                        {b.temp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* side panel: map + alerts */}
              <div className="p-6 flex flex-col gap-6">
                <div>
                  <div className="text-xs mb-3" style={{ color: C.textSub }}>
                    Regional Map
                  </div>
                  <div
                    className="h-32 border relative overflow-hidden"
                    style={{ borderColor: C.border }}>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${C.primary}44, transparent)`,
                      }}
                    />
                    {[
                      [30, 40],
                      [60, 65],
                      [80, 30],
                    ].map(([x, y], i) => (
                      <span
                        key={i}
                        className="absolute h-2 w-2"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          background: C.accent,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-3" style={{ color: C.textSub }}>
                    Active Alerts
                  </div>
                  <div className="space-y-2">
                    <div
                      className="flex items-center gap-2 text-xs"
                      style={{ color: C.white }}>
                      <Bell size={13} style={{ color: C.accent }} /> NLS-031
                      turbidity spike
                    </div>
                    <div
                      className="flex items-center gap-2 text-xs"
                      style={{ color: C.textSub }}>
                      <Bell size={13} /> Battery below 40% · NLS-009
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS                                                        */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    [
      "Deploy Buoy",
      Anchor,
      "Lower the unit into position — solar panel up, sensor array submerged, GPS locked.",
    ],
    [
      "Collect Data",
      Activity,
      "Onboard sensors sample continuously across temperature, chemistry, and motion.",
    ],
    [
      "AI Processing",
      Cpu,
      "Readings are cleaned, scored, and compared against historical baselines in the cloud.",
    ],
    [
      "Monitor Anywhere",
      GlobeIcon,
      "Your team watches the results live from the dashboard, on any device, anywhere.",
    ],
  ];
  return (
    <section className="py-20" style={{ background: C.bg }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="OPERATIONS"
            title="How NELEUS1 Works"
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid md:grid-cols-4 gap-0 relative">
          <div
            className="hidden md:block absolute top-7 left-0 right-0 h-px"
            style={{ background: C.border }}
          />
          {steps.map(([title, Icon, desc], i) => (
            <Reveal key={title} delay={i * 100}>
              <div className="px-6 relative">
                <div
                  className="h-14 w-14 flex items-center justify-center border relative z-10"
                  style={{ background: C.bg, borderColor: C.border }}>
                  <Icon size={22} style={{ color: C.accent }} />
                </div>
                <div
                  className="mt-6 text-lg font-semibold"
                  style={{ color: C.white }}>
                  {title}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: C.textSub }}>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TECH STACK                                                          */
/* ------------------------------------------------------------------ */
function TechStack() {
  const techs = [
    ["ESP32", Cpu],
    ["Supabase", Database],
    ["React", Zap],
    ["Vite", Zap],
    ["Tailwind CSS", Waves],
    ["PostgreSQL", Server],
    ["AI Analytics", TrendingUp],
    ["Solar Power", Sun],
    ["GPS", MapPin],
    ["Cloud Sync", Cloud],
  ];
  return (
    <section
      id="technology"
      className="py-28 border-y"
      style={{ background: C.surface, borderColor: C.border }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="STACK"
            title="Built on Dependable Technology"
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-5">
          {techs.map(([name, Icon], i) => (
            <Reveal key={name} delay={i * 40}>
              <div
                className="flex flex-col items-center gap-3 py-8 border-t border-l"
                style={{ borderColor: C.border }}>
                <Icon size={22} style={{ color: C.accent }} />
                <span
                  className="text-xs tracking-wide"
                  style={{ color: C.textSub }}>
                  {name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  AI INSIGHTS                                                         */
/* ------------------------------------------------------------------ */
function AIInsights() {
  const cards = [
    [
      "Fish Activity",
      Fish,
      "Elevated",
      "Schooling behavior detected near NLS-014 over the last 6 hours.",
    ],
    [
      "Water Quality Score",
      Gauge,
      "92 / 100",
      "Composite index across pH, oxygen, and turbidity readings.",
    ],
    [
      "Risk Detection",
      ShieldAlert,
      "Low",
      "No anomalies exceeding safety thresholds across the fleet.",
    ],
    [
      "Weather Forecast",
      CloudRain,
      "Squall in 4h",
      "Pressure drop pattern matches prior storm signatures.",
    ],
    [
      "Maintenance",
      Wrench,
      "1 Unit Due",
      "NLS-009 battery trending below service threshold.",
    ],
  ];
  return (
    <section id="ai-insights" className="py-28 relative overflow-hidden" style={{ background: C.bg }}>
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/video/ai.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(3,15,30,0.92) 0%, rgba(3,15,30,0.7) 50%, rgba(3,15,30,0.85) 100%)",
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="FEATURE 02 · AI INSIGHTS"
            title="AI Prediction Engine"
          />
        </Reveal>
        <div
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-px"
          style={{ background: C.border }}>
          {cards.map(([title, Icon, val, desc], i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="p-6 h-full" style={{ background: C.surface }}>
                <Icon size={18} style={{ color: C.accent }} />
                <div className="text-xs mt-4" style={{ color: C.textSub }}>
                  {title}
                </div>
                <div
                  className="text-xl font-semibold mt-1"
                  style={{ color: C.white }}>
                  {val}
                </div>
                <p
                  className="mt-3 text-xs leading-relaxed"
                  style={{ color: C.textSub }}>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BENEFITS                                                            */
/* ------------------------------------------------------------------ */
function Benefits() {
  const items = [
    ["Real-Time Monitoring", Activity],
    ["AI Decision Support", Cpu],
    ["Remote Access", GlobeIcon],
    ["Smart Alerts", Bell],
    ["Cloud Storage", Cloud],
    ["Historical Analytics", BarChart3],
    ["Fish Detection", Fish],
    ["Weather Monitoring", CloudRain],
    ["Environmental Protection", ShieldAlert],
    ["Predictive Analytics", TrendingUp],
  ];
  return (
    <section className="py-20" style={{ background: C.surface }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="ADVANTAGE"
            title="Why Choose NELEUS1"
            align="center"
          />
        </Reveal>
        <div
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 border-t border-l"
          style={{ borderColor: C.border }}>
          {items.map(([label, Icon], i) => (
            <Reveal key={label} delay={i * 40}>
              <div
                className="flex items-center gap-3 px-6 py-6 border-r border-b transition-colors duration-300 hover:bg-white/[0.03]"
                style={{ borderColor: C.border }}>
                <Icon size={16} style={{ color: C.accent }} />
                <span className="text-sm" style={{ color: C.white }}>
                  {label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  APPLICATIONS                                                        */
/* ------------------------------------------------------------------ */
function Applications() {
  const apps = [
    [
      "Commercial Fisheries",
      Fish,
      "Track conditions and fish activity to plan smarter, safer trips.",
    ],
    [
      "Aquaculture",
      Waves,
      "Keep pens and farms within safe chemical and temperature ranges.",
    ],
    [
      "Marine Research",
      Activity,
      "Continuous, citable data streams for long-term ocean studies.",
    ],
    [
      "Government",
      ShieldAlert,
      "Coastal oversight and compliance monitoring at regional scale.",
    ],
    [
      "Disaster Monitoring",
      CloudRain,
      "Early signals on pressure and temperature shifts before storms.",
    ],
    [
      "Environmental Protection",
      GlobeIcon,
      "Detect pollution events and ecosystem stress as they develop.",
    ],
    [
      "Education",
      FileText,
      "Live ocean data for classrooms and student research projects.",
    ],[
      "Marine Pollution Monitoring",
      GlobeIcon,
      "Detect floating debris, pollution events, and ecosystem health in real time using AI and environmental sensors.",
    ],
  ];
  return (
    <section className="py-20" style={{ background: C.bg }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            coord="USE CASES"
            title="Built for Every Coastal Stakeholder"
            align="center"
          />
        </Reveal>
        <div
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: C.border }}>
          {apps.map(([title, Icon, desc], i) => (
            <Reveal key={title} delay={i * 50}>
              <div
                className="p-7 h-full transition-colors duration-300 hover:bg-white/[0.03]"
                style={{ background: C.surface }}>
                <Icon size={20} style={{ color: C.accent }} />
                <div
                  className="mt-4 text-sm font-medium"
                  style={{ color: C.white }}>
                  {title}
                </div>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: C.textSub }}>
                  {desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                 */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
      style={{ background: C.surface }}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${C.primary}44, transparent 65%)`,
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <Coord>DEPLOYMENT READY</Coord>
          <h2
            className="text-3xl md:text-5xl font-semibold tracking-tight"
            style={{ color: C.white }}>
            Ready to Modernize Coastal Monitoring?
          </h2>
          <p className="mt-5 text-base md:text-lg" style={{ color: C.textSub }}>
            Put a NELEUS1 network in the water and start seeing what's happening
            beneath the surface — today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <PrimaryButton>
              Launch Dashboard <ArrowRight size={16} />
            </PrimaryButton>
            <GhostButton>Request Demo</GhostButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/image/logow.png"
              alt="NELEUS1 logo"
              className="h-7 w-7 object-contain"
            />
            <img
              src="/image/name.png"
              alt="NELEUS1"
              className="h-5 w-auto object-contain"
            />
          </div>
          <p
            className="mt-5 text-xs leading-relaxed max-w-xs"
            style={{ color: C.textSub }}>
            AI-powered smart buoy monitoring for coastal waters — sensing,
            predicting, and reporting, continuously.
          </p>
        </div>

        {[
          {
            title: "Navigation",
            links: ["Home", "Platform", "Features", "Dashboard"],
          },
          {
            title: "Resources",
            links: ["Documentation", "Support", "API Reference", "Status"],
          },
          { title: "Company", links: ["Privacy", "Terms", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <div
              className="text-xs tracking-[0.2em] uppercase"
              style={{ color: C.white }}>
              {col.title}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors duration-300 hover:text-white"
                  style={{ color: C.textSub }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t"
        style={{ borderColor: C.border }}>
        <span className="text-[11px]" style={{ color: C.textSub }}>
          © {new Date().getFullYear()} NELEUS1. All rights reserved.
        </span>
        <div className="flex gap-5">
          {["Twitter", "LinkedIn", "GitHub"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[11px] transition-colors duration-300 hover:text-white"
              style={{ color: C.textSub }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT                                                                */
/* ------------------------------------------------------------------ */
export default function LandingPage() {
  return (
    <>
      <SEO
        title="neleus1 · AI Decision Support"
        description="AI-powered ocean monitoring and decision support platform for coastal stakeholders. Track sea conditions, fish activity, and marine data in real time."
        structuredData={defaultStructuredData}
      />
      <div
        style={{ background: C.bg, fontFamily: "'Inter', sans-serif" }}
        className="min-h-screen antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { border-radius: 0 !important; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Nav />
      <Hero />
      <Trust />
      <Platform />
      <CoralReef />
      <FisheriesSection />
      <Features />
      <DashboardPreview />
      <HowItWorks />
      <TechStack />
      <AIInsights />
      <Benefits />
      <Applications />
      <CTA />
      <Footer />
    </div>
    </>
  );
}
