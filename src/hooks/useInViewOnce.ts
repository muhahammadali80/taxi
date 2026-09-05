"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: margin, threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin, visible]);

  return { ref, visible };
}
