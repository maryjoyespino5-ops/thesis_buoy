// path: src/pages/Login.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-hot-toast";
import {
  Shield,
  Building2,
  Fish,
  Eye,
  EyeOff,
  Microscope,
  Anchor,
  Lock,
  Mail,
  ArrowLeft,
  ChevronRight,
  AlertCircle,
  Check,
} from "lucide-react";

/* ==============================================================
    Nuleus1  AI — Login Page
   Mirrors the design language of the Landing Page:
   abyss/depth/current color system, Sora + Inter + IBM Plex Mono,
   bioluma (#4CE0D2) signature glow, glassmorphism, floating buoy
   motif, ambient particles, CSS-driven motion.
   Self-contained: injects its own fonts + styles so it renders
   identically whether or not the Landing Page has already mounted.
================================================================= */

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

const roles = [
  { key: "admin", label: "Administrator", icon: Shield },
  { key: "lgu", label: "LGU Officer", icon: Building2 },
  { key: "bfar", label: "BFAR Officer", icon: Fish },
  { key: "sanctuary", label: "Sanctuary Officer", icon: Eye },
  { key: "researcher", label: "Researcher", icon: Microscope },
  { key: "fisherman", label: "Fisherman", icon: Anchor },
];

/* ============================== MINI BUOY ILLUSTRATION ============================== */

function BuoyGlyph(props) {
  return (
    <svg viewBox="0 0 220 240" className="w-full h-auto" {...props}>
      <defs>
        <linearGradient id="loginHull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c4a54" />
          <stop offset="1" stopColor="#0a2530" />
        </linearGradient>
        <radialGradient id="loginGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4CE0D2" stopOpacity="0.55" />
          <stop offset="1" stopColor="#4CE0D2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="110"
        cy="130"
        rx="100"
        ry="100"
        fill="url(#loginGlow)"
        opacity="0.55"
      />
      <line
        x1="85"
        y1="42"
        x2="85"
        y2="10"
        stroke="#3a6b73"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="85" cy="8" r="3.2" fill="#4CE0D2" className="as-blink" />
      <rect
        x="50"
        y="42"
        width="120"
        height="24"
        rx="7"
        fill="#123846"
        stroke="#2c5560"
        strokeWidth="1.2"
      />
      {Array.from({ length: 4 }).map((_, i) => (
        <rect
          key={i}
          x={57 + i * 28}
          y="47"
          width="22"
          height="14"
          rx="2"
          fill="#0d3038"
          stroke="#245057"
          strokeWidth="0.8"
        />
      ))}
      <path
        d="M32 66 h156 a8 8 0 0 1 8 8 v38 a50 50 0 0 1 -50 50 h-72 a50 50 0 0 1 -50 -50 v-38 a8 8 0 0 1 8 -8 Z"
        fill="url(#loginHull)"
        stroke="#2c5560"
        strokeWidth="1.2"
      />
      <rect
        x="46"
        y="84"
        width="128"
        height="15"
        rx="7.5"
        fill="#08222b"
        stroke="#204750"
        strokeWidth="0.8"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={62 + i * 24}
          cy="91.5"
          r="2.8"
          fill={i === 2 ? "#ff7a59" : "#4CE0D2"}
          opacity={i === 2 ? 1 : 0.7}
          className={i === 2 ? "as-blink" : ""}
        />
      ))}
      <path
        d="M55 158 a55 32 0 0 0 110 0 Z"
        fill="#08222b"
        stroke="#204750"
        strokeWidth="0.8"
      />
      <line
        x1="110"
        y1="158"
        x2="110"
        y2="188"
        stroke="#245057"
        strokeWidth="2"
      />
      <ellipse
        cx="110"
        cy="196"
        rx="16"
        ry="7.5"
        fill="#123846"
        stroke="#2c5560"
        strokeWidth="1"
      />
      <circle cx="110" cy="196" r="2.6" fill="#4CE0D2" opacity="0.85" />
    </svg>
  );
}

/* ============================== PAGE ============================== */

export default function Login() {
  useInjectFonts();
  const { switchRole } = useRole();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      setIsLoading(false);
      toast.error(error.message);
      return;
    }

    if (!data.user) {
      setAuthError("No account found. Please check your credentials.");
      setIsLoading(false);
      toast.error("No account found.");
      return;
    }

    switchRole(selectedRole);
    navigate(selectedRole === "admin" ? "/admin/dashboard" : "/dashboard");
    toast.success("Welcome back!");
    setIsLoading(false);
  };

  return (
    <div
      id="as-root"
      className="h-screen w-screen relative overflow-hidden as-login-bg antialiased selection:bg-[#4CE0D2]/30 flex items-center justify-center">
      <GlobalStyle />

      {/* ambient particles */}
      <div className="as-particles" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="as-particle" style={{ "--i": i }} />
        ))}
      </div>

      {/* soft background blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] bg-[#4CE0D2]/10 rounded-full blur-[140px] as-float-slow" />
        <div
          className="absolute -bottom-60 -left-52 w-[480px] h-[480px] bg-[#ff7a59]/[0.06] rounded-full blur-[120px] as-float-slow"
          style={{ animationDelay: "1.4s" }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#123846]/40 rounded-full blur-[180px]" />
      </div>

      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(#4CE0D2 1px, transparent 1px), linear-gradient(90deg, #4CE0D2 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* back to home */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-30 as-glass border border-white/10 rounded-full pl-3 pr-4 py-2 flex items-center gap-2 text-[13px] font-medium text-[#bcdcdb] hover:text-[#eaf6f6] hover:border-[#4CE0D2]/30 transition-all group">
        <ArrowLeft
          size={15}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl as-glass border border-white/10 rounded-[2rem] shadow-[0_20px_90px_rgba(0,0,0,0.45)] overflow-hidden grid lg:grid-cols-[1.05fr_1fr] max-h-[92vh]">
        {/* ============ LEFT — BRANDING PANEL ============ */}
        <div className="hidden lg:flex relative overflow-hidden as-brand-panel p-8 flex-col justify-between">
          <div className="as-ai-glow" aria-hidden />

          <div className="relative z-10 flex items-center gap-2.5">
            <span className="relative w-8 h-8 grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-[#4CE0D2]/25 blur-md" />
              <svg viewBox="0 0 24 24" className="w-6 h-6 relative" fill="none">
                <path
                  d="M12 2.5c3.6 4.6 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-7.8 7-12.4Z"
                  stroke="#4CE0D2"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
            <span className="font-[Sora] font-semibold tracking-tight text-[#eaf6f6] text-[17px]">
              Nuleus1 <span className="text-[#4CE0D2]">AI</span>
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center text-center -mt-2">
            <div className="w-36 as-float">
              <BuoyGlyph />
            </div>

            <h1 className="mt-3 font-[Sora] font-[750] text-[22px] leading-tight tracking-tight text-[#f4fbfb]">
              Command your{" "}
              <span className="as-gradient-text">ocean network</span>
            </h1>
            <p className="mt-1.5 text-[12.5px] text-[#9fc5c9] max-w-xs leading-relaxed">
              Sign in to view live buoy telemetry, AI insights, and conservation
              alerts across your monitored waters.
            </p>

            <div className="mt-4 flex gap-2">
              {["Real-time", "AI-Powered", "Secure"].map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-medium px-3 py-1 rounded-full as-icon-badge text-[#bfeee8]">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/8">
            {[
              ["240+", "reserves"],
              ["24/7", "uptime"],
              ["98.6%", "accuracy"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-[14px] font-medium text-[#eaf6f6]">
                  {n}
                </div>
                <div className="text-[9.5px] text-[#7fa3a6] mt-0.5">{l}</div>
              </div>
            ))}
          </div>

          <WaveStrip />
        </div>

        {/* ============ RIGHT — FORM PANEL ============ */}
        <div className="w-full p-6 sm:p-8 lg:p-9 flex flex-col justify-center relative overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}>
            {/* mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5 mb-5">
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                <path
                  d="M12 2.5c3.6 4.6 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-7.8 7-12.4Z"
                  stroke="#4CE0D2"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="font-[Sora] font-semibold text-[#eaf6f6] text-[17px]">
                Nuleus1 <span className="text-[#4CE0D2]">AI</span>
              </span>
            </div>

            <div className="mb-5">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono font-medium text-[#4CE0D2] tracking-wide uppercase mb-1.5">
                <span className="w-5 h-px bg-[#4CE0D2]/60" />
                Secure Access
              </div>
              <h2 className="font-[Sora] font-[700] text-[23px] sm:text-[25px] tracking-tight text-[#eaf6f6]">
                Welcome back
              </h2>
              <p className="text-[#93b7ba] mt-1 text-[12.5px]">
                Sign in to continue monitoring coastal environments
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5" noValidate>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11.5px] font-medium text-[#9fc5c9] mb-1">
                  Email address
                </label>
                <div className="relative group">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5f8a8d] transition-colors group-focus-within:text-[#4CE0D2]"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@organization.ph"
                    className={cn(
                      "as-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm",
                      errors.email && "as-input-error",
                    )}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    autoComplete="email"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      id="email-error"
                      className="text-[#ff7a59] text-[10.5px] mt-1 ml-1 flex items-center gap-1.5"
                      role="alert">
                      <AlertCircle size={12} /> {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11.5px] font-medium text-[#9fc5c9] mb-1">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5f8a8d] transition-colors group-focus-within:text-[#4CE0D2]"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={cn(
                      "as-input w-full pl-10 pr-10 py-2.5 rounded-xl text-sm",
                      errors.password && "as-input-error",
                    )}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f8a8d] hover:text-[#4CE0D2] transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={0}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      id="password-error"
                      className="text-[#ff7a59] text-[10.5px] mt-1 ml-1 flex items-center gap-1.5"
                      role="alert">
                      <AlertCircle size={12} /> {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2.5 cursor-pointer group select-none">
                  <span className="relative w-3.5 h-3.5 flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded-[4px] border border-white/20 bg-white/5 peer-checked:bg-[#4CE0D2] peer-checked:border-[#4CE0D2] transition-colors" />
                    <Check
                      size={10}
                      className="absolute inset-0 m-auto text-[#04141a] opacity-0 peer-checked:opacity-100 transition-opacity"
                      strokeWidth={3}
                    />
                  </span>
                  <span className="text-[12px] text-[#9fc5c9] group-hover:text-[#eaf6f6] transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[12px] text-[#4CE0D2] hover:text-[#7ff0d8] font-medium transition-colors"
                  onClick={(e) => e.preventDefault()}>
                  Forgot password?
                </a>
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-[11.5px] font-medium text-[#9fc5c9] mb-1.5">
                  Sign in as
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.key;
                    return (
                      <button
                        key={role.key}
                        type="button"
                        onClick={() => setSelectedRole(role.key)}
                        className={cn(
                          "as-role-tile flex flex-col items-center gap-1 p-1.5 rounded-xl border transition-all duration-200",
                          isSelected ? "as-role-tile-active" : "",
                        )}
                        aria-pressed={isSelected}>
                        <div
                          className={cn(
                            "w-6 h-6 rounded-lg grid place-items-center transition-colors duration-200",
                            isSelected
                              ? "bg-[#4CE0D2] text-[#04141a]"
                              : "bg-white/5 text-[#7fa3a6]",
                          )}>
                          <Icon size={13} />
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-medium leading-tight text-center",
                            isSelected ? "text-[#4CE0D2]" : "text-[#93b7ba]",
                          )}>
                          {role.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Auth error */}
              <AnimatePresence>
                {authError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[#ff7a59] text-[11px] flex items-center gap-1.5" role="alert">
                    <AlertCircle size={13} /> {authError}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={isLoading}
                className="as-btn-primary w-full justify-center py-2.5 text-[14px] font-semibold rounded-xl flex items-center gap-2 mt-0.5 disabled:opacity-80">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In
                    <ChevronRight size={15} />
                  </span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[9.5px] text-[#7fa3a6] uppercase tracking-wider font-medium font-mono">
                Or continue with
              </span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Social login placeholders */}
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                disabled
                className="as-social-btn flex items-center justify-center gap-2 py-1.5 rounded-xl text-[12px] font-medium"
                title="Coming soon">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#7fa3a6"
                    d="M21.35 11.1h-9.17v2.73h5.25c-.23 1.5-1.65 4.4-5.25 4.4-3.16 0-5.74-2.62-5.74-5.85s2.58-5.85 5.74-5.85c1.8 0 3 .77 3.69 1.43l2.52-2.43C16.95 3.9 14.75 3 12.18 3 6.9 3 2.6 7.24 2.6 12.28s4.3 9.28 9.58 9.28c5.53 0 9.2-3.9 9.2-9.4 0-.63-.07-1.11-.03-1.06Z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                disabled
                className="as-social-btn flex items-center justify-center gap-2 py-1.5 rounded-xl text-[12px] font-medium"
                title="Coming soon">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path
                    fill="#7fa3a6"
                    d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.8A21 21 0 0 0 14.2 4.6c-2.2 0-3.7 1.34-3.7 3.8v2.05H8v2.95h2.5V21h3Z"
                  />
                </svg>
                Facebook
              </button>
            </div>
            <p className="text-center text-[9.5px] text-[#5f8a8d] mt-1">
              Social sign-in coming soon
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function WaveStrip() {
  return (
    <div className="relative mt-2 h-7 overflow-hidden opacity-70" aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full as-wave-1"
        viewBox="0 0 600 60"
        preserveAspectRatio="none">
        <path
          d="M0 30 Q 75 12 150 30 T 300 30 T 450 30 T 600 30 V60 H0 Z"
          fill="#0d3038"
          opacity="0.6"
        />
      </svg>
      <svg
        className="absolute inset-0 w-full h-full as-wave-2"
        viewBox="0 0 600 60"
        preserveAspectRatio="none">
        <path
          d="M0 38 Q 75 22 150 38 T 300 38 T 450 38 T 600 38 V60 H0 Z"
          fill="#123846"
          opacity="0.75"
        />
      </svg>
    </div>
  );
}

/* ============================== GLOBAL STYLE ============================== */

function GlobalStyle() {
  return (
    <style>{`
      .font-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      #as-root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; color: #eaf6f6; }

      .as-login-bg {
        background:
          radial-gradient(60% 50% at 85% 10%, rgba(76,224,210,0.12), transparent 60%),
          radial-gradient(50% 40% at 10% 95%, rgba(255,122,89,0.07), transparent 60%),
          linear-gradient(180deg, #051923 0%, #072530 55%, #0a2f3d 100%);
      }

      .as-brand-panel {
        background:
          radial-gradient(70% 60% at 30% 10%, rgba(76,224,210,0.10), transparent 60%),
          linear-gradient(160deg, #0a2f3d 0%, #072530 55%, #051923 100%);
        border-right: 1px solid rgba(255,255,255,0.06);
      }

      .as-gradient-text {
        background: linear-gradient(90deg, #4CE0D2, #7ff0d8 60%, #4CE0D2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }

      .as-glass {
        background: rgba(15, 42, 51, 0.55);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }

      .as-icon-badge {
        background: rgba(76,224,210,0.12);
        border: 1px solid rgba(76,224,210,0.25);
      }

      .as-input {
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.12);
        color: #eaf6f6;
        transition: border-color .2s ease, background .2s ease, box-shadow .2s ease;
      }
      .as-input::placeholder { color: #5f8a8d; }
      .as-input:hover { border-color: rgba(76,224,210,0.3); }
      .as-input:focus {
        outline: none;
        border-color: rgba(76,224,210,0.55);
        background: rgba(76,224,210,0.05);
        box-shadow: 0 0 0 3px rgba(76,224,210,0.12);
      }
      .as-input-error {
        border-color: rgba(255,122,89,0.55) !important;
      }
      .as-input-error:focus {
        box-shadow: 0 0 0 3px rgba(255,122,89,0.14);
      }

      .as-role-tile {
        border-color: rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.025);
      }
      .as-role-tile:hover {
        border-color: rgba(76,224,210,0.3);
        background: rgba(76,224,210,0.05);
      }
      .as-role-tile-active {
        border-color: rgba(76,224,210,0.55) !important;
        background: rgba(76,224,210,0.09) !important;
        box-shadow: 0 4px 18px rgba(76,224,210,0.12);
      }

      .as-btn-primary {
        background: #4CE0D2;
        color: #04141a;
        transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        box-shadow: 0 8px 30px rgba(76,224,210,0.25);
        border: none;
        cursor: pointer;
      }
      .as-btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 14px 40px rgba(76,224,210,0.4);
        background: #66e8dc;
      }
      .as-btn-primary:disabled { cursor: not-allowed; }

      .as-social-btn {
        border: 1px solid rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.03);
        color: #9fc5c9;
        cursor: not-allowed;
        transition: all 0.2s ease;
      }
      .as-social-btn:hover {
        border-color: rgba(76,224,210,0.2);
        background: rgba(255,255,255,0.06);
      }

      @keyframes as-float-kf { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(0.5deg); } }
      .as-float { animation: as-float-kf 6.5s ease-in-out infinite; }
      @keyframes as-float-slow-kf { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      .as-float-slow { animation: as-float-slow-kf 8s ease-in-out infinite; }

      .as-pulse-dot { animation: as-pulse-kf 2.4s ease-in-out infinite; }
      @keyframes as-pulse-kf { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

      .as-blink { animation: as-blink-kf 1.6s ease-in-out infinite; }
      @keyframes as-blink-kf { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

      @keyframes as-wave-kf-1 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      @keyframes as-wave-kf-2 { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
      .as-wave-1, .as-wave-2 { width: 200%; }
      .as-wave-1 { animation: as-wave-kf-1 9s linear infinite; }
      .as-wave-2 { animation: as-wave-kf-2 13s linear infinite reverse; }

      .as-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
      .as-particle {
        position: absolute;
        width: 3px; height: 3px;
        border-radius: 999px;
        background: rgba(76,224,210,0.5);
        left: calc(6% + (var(--i) * 6%));
        top: 100%;
        animation: as-particle-kf calc(10s + (var(--i) * 0.5s)) linear infinite;
        animation-delay: calc(var(--i) * -0.7s);
      }
      @keyframes as-particle-kf {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.7; }
        100% { transform: translateY(-110vh) translateX(16px); opacity: 0; }
      }

      .as-ai-glow {
        position: absolute; inset: 0;
        background: radial-gradient(50% 50% at 50% 20%, rgba(76,224,210,0.08), transparent 65%);
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .as-float, .as-float-slow, .as-particle, .as-wave-1, .as-wave-2, .as-pulse-dot, .as-blink {
          animation: none !important;
        }
      }
    `}</style>
  );
}
