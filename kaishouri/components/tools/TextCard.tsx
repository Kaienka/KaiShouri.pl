import { Text } from "@/types/types.api";
import { slugify } from "./slugify";

function TextCard({title, children, link}: Text) {
  return (
    <section
      id={slugify(title)}
      className="scroll-mt-6 flex flex-col gap-4 py-8 border-t border-nice-light-purple dark:border-white/10 first-of-type:border-t-0 first-of-type:pt-0"
    >
      <h2 className="font-mono text-2xl font-semibold text-dark-plume dark:text-linen-cloud">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2  decoration-fourth-plum hover:decoration-plume-wine dark:decoration-third-plum dark:hover:decoration-fourth-plum"
          >
            {title}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-third-plum dark:text-fourth-plum">
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </a>
        ) : (
          title
        )}
      </h2>
      <div className="font-inter text-base sm:text-[17px] leading-[1.75] text-dark-plume dark:text-linen-cloud flex flex-col gap-4 [&_p]:p-0 [&_a]:text-plume-wine [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-fourth-plum">
        {children}
      </div>
    </section>
  );
}

export default TextCard;