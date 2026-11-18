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
    const sections = titles
      .map((t) => document.getElementById(slugify(t)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
