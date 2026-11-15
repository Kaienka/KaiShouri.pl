"use client";
import { RefObject, useEffect, useState } from "react";


function getScrollParent(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node) {
    const { overflowY } = getComputedStyle(node);
    if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) return node;
    node = node.parentElement;
  }
  return null;
}

export function useReadingProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const parent = getScrollParent(el);
      const viewTop = parent ? parent.getBoundingClientRect().top : 0;
      const viewport = parent ? parent.clientHeight : window.innerHeight;
      const rect = el.getBoundingClientRect();
      const top = rect.top - viewTop;
      const total = rect.height - viewport;
      const pct = total <= 0 ? (top + rect.height <= viewport ? 100 : 0) : (-top / total) * 100;
      setProgress(Math.min(100, Math.max(0, pct)));
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    const observer = new ResizeObserver(onScroll);
    if (ref.current) observer.observe(ref.current);

    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return progress;
}