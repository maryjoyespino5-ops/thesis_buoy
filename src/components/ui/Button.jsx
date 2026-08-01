// path: src/components/ui/Button.jsx
import React from "react";
import { cn } from "../../lib/utils";

const variants = {
  primary:
    "bg-primary-500 text-white border-primary-500 hover:bg-primary-600 hover:border-primary-600 shadow-sm",
  secondary:
    "bg-surface text-primary-500 border-primary-200 hover:bg-primary-50 hover:border-primary-300",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary border-transparent",
  danger:
    "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 shadow-sm",
  outline: "bg-surface text-text-primary border-border hover:bg-surface-muted",
};

const sizes = {
  sm: "h-7 px-3 text-[11px] font-medium",
  md: "h-9 px-4 text-xs font-medium",
  lg: "h-10 px-5 text-sm font-semibold",
  icon: "h-8 w-8 p-0",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg border font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}>
      {loading && (
        <svg
          className="animate-spin h-3.5 w-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
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
      )}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
