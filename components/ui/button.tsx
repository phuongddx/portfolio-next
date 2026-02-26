"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseStyles = "font-medium rounded-xl transition-all duration-200 inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600",
    secondary: "bg-white text-gray-800 border-2 border-gray-800 hover:bg-gray-50",
    outline: "bg-transparent text-gray-800 border-2 border-gray-800 hover:bg-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <m.button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </m.button>
  );
}
