// path: src/components/ui/Card.jsx
import React from "react";
import { cn } from "../../lib/utils";

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "bg-surface rounded-lg border border-border/50 shadow-sm",
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn("px-4 py-3 border-b border-border/30", className)}
      {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn("px-4 py-3 border-t border-border/30", className)}
      {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn("text-sm font-semibold text-text-primary leading-snug", className)}
      {...props}>
      {children}
    </h3>
  );
}
