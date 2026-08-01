// path: src/pages/Login.jsx
import React, { useState } from "react";
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
  ArrowRight,
  AlertCircle,
  Check,
  Cpu,
  Database,
  Sun,
  MapPin,
} from "lucide-react";

/* ==============================================================
   NELEUS1 — Login
   Same design system as the landing page: navy/ink background,
   #00D4FF signal accent, Inter + JetBrains Mono, hairline borders,
   zero border-radius, no cartoon illustration or ambient motion.
================================================================= */

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

const roles = [
  { key: "admin", label: "Administrator", icon: Shield },
  { key: "lgu", label: "LGU Officer", icon: Building2 },
  { key: "bfar", label: "BFAR Officer", icon: Fish },
  { key: "sanctuary", label: "Sanctuary Officer", icon: Eye },
  { key: "researcher", label: "Researcher", icon: Microscope },
  { key: "fisherman", label: "Fisherman", icon: Anchor },
];

function Coord({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase mb-4"
      style={{ color: C.accent, fontFamily: "'JetBrains Mono', monospace" }}>
      <span className="h-[6px] w-[6px]" style={{ background: C.accent }} />
      {children}
    </div>
  );
}

export default function Login() {
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
      className="min-h-screen w-full relative flex items-center justify-center px-4 py-10 antialiased overflow-hidden"
      style={{ background: C.bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { border-radius: 0 !important; }
      `}</style>

      {/* quiet background field — same language as the hero, no blobs, no particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(60% 45% at 80% 0%, ${C.primary}22, transparent 60%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <Link
        to="/"
        className="fixed top-6 left-6 z-30 flex items-center gap-2 text-[13px] font-medium border px-4 py-2 transition-colors duration-300 hover:text-white"
        style={{ color: C.textSub, borderColor: C.border, background: C.surface }}>
        <ArrowLeft size={15} />
        Back to Home
      </Link>

      <div
        className="relative w-full max-w-5xl border grid lg:grid-cols-[1.05fr_1fr]"
        style={{ borderColor: C.border, background: C.surface, boxShadow: "0 30px 80px rgba(0,0,0,0.35)" }}>
        {/* ============ LEFT — INFO PANEL ============ */}
        <div
          className="hidden lg:flex flex-col justify-between p-9 border-r"
          style={{ borderColor: C.border, background: C.bg }}>
          <div className="flex items-center gap-2.5">
            <img
              src="/image/favicon1.png"
              alt="NELEUS1 logo"
              className="h-7 w-7 object-contain"
            />
            <img
              src="/image/name.png"
              alt="NELEUS1"
              className="h-5 w-auto object-contain"
            />
          </div>

          <div>
            <Coord>Secure Access</Coord>
            <h1
              className="text-3xl font-semibold leading-[1.15] tracking-tight"
              style={{ color: C.white }}>
              Command your ocean network
            </h1>
            <p
              className="mt-4 text-sm leading-relaxed max-w-sm"
              style={{ color: C.textSub }}>
              Sign in to view live buoy telemetry, AI insights, and
              conservation alerts across your monitored waters.
            </p>

            <div className="mt-8 grid gap-3">
              {[
                "Real-time sensor telemetry",
                "AI-powered risk detection",
                "Fleet-wide dashboard access",
              ].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <div style={{ color: C.accent }}>✔</div>
                  <div className="text-sm" style={{ color: C.white }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-6 pt-6 border-t"
            style={{ borderColor: C.border }}>
            {[
              ["240+", "reserves"],
              ["24/7", "uptime"],
              ["98.6%", "accuracy"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  className="text-sm font-medium"
                  style={{
                    color: C.white,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                  {n}
                </div>
                <div className="text-[11px] mt-1" style={{ color: C.textSub }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ RIGHT — FORM PANEL ============ */}
        <div className="w-full p-7 sm:p-9 flex flex-col justify-center">
          {/* mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <img
              src="/image/favicon1.png"
              alt="NELEUS1 logo"
              className="h-7 w-7 object-contain"
            />
            <img
              src="/image/name.png"
              alt="NELEUS1"
              className="h-5 w-auto object-contain"
            />
          </div>

          <div className="mb-6">
            <Coord>Sign In</Coord>
            <h2
              className="text-2xl font-semibold tracking-tight"
              style={{ color: C.white }}>
              Welcome back
            </h2>
            <p className="mt-1 text-sm" style={{ color: C.textSub }}>
              Continue monitoring coastal environments
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] tracking-wide uppercase mb-1.5"
                style={{ color: C.textSub }}>
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.textSub }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organization.ph"
                  className="w-full pl-10 pr-3 py-3 text-sm border transition-colors duration-200 focus:outline-none"
                  style={{
                    background: C.bg,
                    borderColor: errors.email ? "#FF6B6B" : C.border,
                    color: C.white,
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-[11px] mt-1.5 flex items-center gap-1.5"
                  style={{ color: "#FF6B6B" }}
                  role="alert">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-[11px] tracking-wide uppercase mb-1.5"
                style={{ color: C.textSub }}>
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: C.textSub }}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 text-sm border transition-colors duration-200 focus:outline-none"
                  style={{
                    background: C.bg,
                    borderColor: errors.password ? "#FF6B6B" : C.border,
                    color: C.white,
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: C.textSub }}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="text-[11px] mt-1.5 flex items-center gap-1.5"
                  style={{ color: "#FF6B6B" }}
                  role="alert">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <span className="relative w-4 h-4 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only"
                  />
                  <span
                    className="absolute inset-0 border peer-checked:border-0"
                    style={{
                      borderColor: C.border,
                      background: rememberMe ? C.accent : "transparent",
                    }}
                  />
                  {rememberMe && (
                    <Check
                      size={11}
                      className="absolute inset-0 m-auto"
                      style={{ color: "#03131F" }}
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span className="text-[13px]" style={{ color: C.textSub }}>
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-[13px] font-medium transition-colors duration-200"
                style={{ color: C.accent }}
                onClick={(e) => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            {/* Role selector */}
            <div>
              <label
                className="block text-[11px] tracking-wide uppercase mb-2"
                style={{ color: C.textSub }}>
                Sign in as
              </label>
              <div
                className="grid grid-cols-3 border-t border-l"
                style={{ borderColor: C.border }}>
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.key;
                  return (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => setSelectedRole(role.key)}
                      className="flex flex-col items-center gap-1.5 py-3 border-r border-b transition-colors duration-200"
                      style={{
                        borderColor: C.border,
                        background: isSelected ? `${C.accent}14` : "transparent",
                      }}
                      aria-pressed={isSelected}>
                      <Icon
                        size={15}
                        style={{ color: isSelected ? C.accent : C.textSub }}
                      />
                      <span
                        className="text-[9.5px] font-medium leading-tight text-center px-1"
                        style={{ color: isSelected ? C.accent : C.textSub }}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {authError && (
              <p
                className="text-[12px] flex items-center gap-1.5"
                style={{ color: "#FF6B6B" }}
                role="alert">
                <AlertCircle size={13} /> {authError}
              </p>
            )}

            {/* Sign in button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-3 text-sm font-medium tracking-wide overflow-hidden flex items-center justify-center gap-2 disabled:opacity-70"
              style={{ background: C.accent, color: "#03131F" }}>
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={15} />
                  </>
                )}
              </span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: C.border }} />
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{ color: C.textSub, fontFamily: "'JetBrains Mono', monospace" }}>
              Or continue with
            </span>
            <div className="flex-1 h-px" style={{ background: C.border }} />
          </div>

          {/* Social login placeholders */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled
              title="Coming soon"
              className="flex items-center justify-center gap-2 py-2.5 text-[12px] font-medium border cursor-not-allowed"
              style={{ borderColor: C.border, color: C.textSub }}>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill={C.textSub}
                  d="M21.35 11.1h-9.17v2.73h5.25c-.23 1.5-1.65 4.4-5.25 4.4-3.16 0-5.74-2.62-5.74-5.85s2.58-5.85 5.74-5.85c1.8 0 3 .77 3.69 1.43l2.52-2.43C16.95 3.9 14.75 3 12.18 3 6.9 3 2.6 7.24 2.6 12.28s4.3 9.28 9.58 9.28c5.53 0 9.2-3.9 9.2-9.4 0-.63-.07-1.11-.03-1.06Z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              disabled
              title="Coming soon"
              className="flex items-center justify-center gap-2 py-2.5 text-[12px] font-medium border cursor-not-allowed"
              style={{ borderColor: C.border, color: C.textSub }}>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path
                  fill={C.textSub}
                  d="M13.5 21v-7.6h2.55l.38-2.96h-2.93v-1.9c0-.86.24-1.44 1.47-1.44h1.57V4.8A21 21 0 0 0 14.2 4.6c-2.2 0-3.7 1.34-3.7 3.8v2.05H8v2.95h2.5V21h3Z"
                />
              </svg>
              Facebook
            </button>
          </div>
          <p className="text-center text-[10.5px] mt-2" style={{ color: C.textSub }}>
            Social sign-in coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
