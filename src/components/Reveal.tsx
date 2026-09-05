"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, easeOut, revealItem, revealList } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02, margin: "100px 0px 100px 0px" }}
      transition={{ duration: duration.base, delay, ease: easeOut }}
    >
      {children}
    </Tag>
  );
}

export function RevealList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.02, margin: "100px 0px 100px 0px" }}
      variants={reduce ? undefined : revealList}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : revealItem}
      transition={{ duration: duration.base, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
