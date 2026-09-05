"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buttonMotion } from "@/lib/motion";
import { useHoverAbility } from "@/lib/use-mobile";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "urgent";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold text-ink btn-press shadow-[0_8px_18px_-6px_rgba(26,26,26,0.4)]",
  secondary:
    "border border-white/20 bg-white/8 text-white hover:border-gold hover:bg-white/14 backdrop-blur-sm",
  ghost: "neu-raised-sm text-ink hover:text-charcoal",
  dark: "bg-ink text-gold hover:bg-charcoal hover:text-gold-soft",
  urgent: "bg-gold text-ink btn-press shadow-[0_8px_18px_-6px_rgba(26,26,26,0.4)]",
};

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const reduce = useReducedMotion();
  const canHover = useHoverAbility();
  const widthClass = /\bw-auto\b/.test(className)
    ? "w-auto"
    : /\bflex-1\b/.test(className)
      ? "min-w-0"
      : "w-full sm:w-auto";
  const classes = `inline-flex min-h-12 min-w-0 ${widthClass} items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold tracking-[-0.01em] transition-[box-shadow,background-color] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 sm:px-6 ${styles[variant]} ${className}`;
  const hover = reduce || !canHover ? undefined : buttonMotion.hover;
  const tap = reduce ? undefined : buttonMotion.tap;

  if (href) {
    if (isInternalHref(href)) {
      return (
        <motion.span whileHover={hover} whileTap={tap} className={`inline-flex ${widthClass}`}>
          <Link
            href={href}
            className={classes}
            aria-label={ariaLabel}
            onClick={(event) => {
              onClick?.();
              const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
              if (!hash) return;
              const path = href.split("#")[0] || "/";
              const here = window.location.pathname;
              if (path !== "/" && path !== here) return;
              if (path === "/" && here !== "/") return;
              const target = document.getElementById(hash);
              if (!target) return;
              event.preventDefault();
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {children}
          </Link>
        </motion.span>
      );
    }

    const external = href.startsWith("http");
    return (
      <motion.a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        whileHover={hover}
        whileTap={tap}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={hover}
      whileTap={tap}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
