"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { slugify } from "./slugify";

type Props = {
  titles: string[];
  variant: "sidebar" | "pills";
};

function TableOfContents({ titles, variant }: Props) {
  const [active, setActive] = useState(slugify(titles[0] ?? ""));

  useEffect(() => {
    const ids = titles.map((t) => slugify(t));
    let frame = 0;

    function update() {
      frame = 0;
      const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (sections.length === 0) return;

      const last = sections[sections.length - 1];
      if (last.getBoundingClientRect().bottom <= window.innerHeight + 2) {
        setActive(last.id);
        return;
      }

      const line = window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [titles]);

  if (variant === "pills") {
    return (
      <nav aria-label="Na tej stronie" className="lg:hidden flex gap-2 overflow-x-auto -mx-4 px-4 pb-2">
        {titles.map((t) => (
          <a
            key={t}
            href={`#${slugify(t)}`}
            className="shrink-0 inline-flex items-center h-9 px-3.5 rounded-full font-inter text-sm font-medium bg-nice-light-purple text-dark-plume dark:bg-white/10 dark:text-linen-cloud"
          >
            {t}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Na tej stronie" className="hidden lg:flex flex-col gap-0.5 sticky top-6">
      <span className="font-mono text-xs font-semibold tracking-widest uppercase px-3 pb-2 text-third-plum dark:text-fourth-plum">
        Na tej stronie
      </span>
      {titles.map((t) => {
        const id = slugify(t);
        return (
          <a
            key={t}
            href={`#${id}`}
            onClick={() => setActive(id)}
            aria-current={active === id ? "true" : undefined}
            className={clsx(
              "block px-3 py-2 rounded-lg font-inter text-sm transition-colors",
              active === id
                ? "bg-nice-light-purple text-dark-plume font-semibold dark:bg-white/10 dark:text-linen-cloud"
                : "text-third-plum hover:text-dark-plume dark:text-fourth-plum dark:hover:text-linen-cloud"
            )}
          >
            {t}
          </a>
        );
      })}
    </nav>
  );
}

export default TableOfContents;
