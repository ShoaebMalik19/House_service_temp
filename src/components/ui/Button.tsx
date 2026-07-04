"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// =============================================================================
// Button — Base UI Component
// Supports primary (accent), secondary (outlined), and ghost variants.
// Renders as <a> for href props (including tel: links), <button> otherwise.
// =============================================================================

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  /** If true, renders full-width */
  fullWidth?: boolean;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-[#F97316] to-[#E8820C] text-white focus-visible:ring-[var(--color-accent)] shadow-lg hover:shadow-[0_8px_25px_rgba(232,130,12,0.4)] border border-[#F97316]/50",
  secondary:
    "bg-transparent border-2 border-white text-white hover:bg-white/10 focus-visible:ring-white",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-background-alt)] focus-visible:ring-[var(--color-primary)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    // Base styles
    "inline-flex items-center justify-center font-semibold rounded-lg",
    // Transition
    "transition-all duration-200 ease-out",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    // Min tap target
    "min-h-[44px] min-w-[44px]",
    // Cursor
    "cursor-pointer",
    // Variant & size
    variantClasses[variant],
    sizeClasses[size],
    // Full width
    fullWidth && "w-full",
    // Disabled state
    "disabled:opacity-50 disabled:cursor-not-allowed",
    className
  );

  // Render as <a> for href props
  if ("href" in props && props.href) {
    const { href } = props;

    // External or tel: links — use plain <a>
    if (href.startsWith("tel:") || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={baseClasses}>
          {children}
        </a>
      );
    }

    // Internal links — use Next.js Link
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  // Render as <button>
  const { onClick, type = "button", disabled } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}
