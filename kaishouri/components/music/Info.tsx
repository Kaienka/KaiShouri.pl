import { Info as InfoProps } from "@/types/types.api";

function Info({children}: InfoProps) {
    return (
        <div className="flex gap-3 items-start px-4 py-3.5 rounded-2xl max-w-[70ch] bg-nice-light-purple dark:bg-dark-plume">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 mt-0.5 text-third-plum dark:text-fourth-plum">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 11v5M12 8h.01" />
            </svg>
            <p className="font-inter text-sm leading-relaxed text-dark-plume dark:text-linen-cloud">
                {children}
            </p>
        </div>
    );
}

export default Info;