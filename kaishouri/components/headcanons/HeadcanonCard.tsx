import { Headcanon } from "@/types/types.api";

function Card({ character, content, nsfw }: Headcanon) {
  return (
    <article className="break-inside-avoid mb-4 flex flex-col gap-2.5 px-5 py-5 rounded-2xl bg-nice-light-purple dark:bg-dark-plume">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-mono text-sm font-semibold text-plume-wine dark:text-fourth-plum first-letter:uppercase">
          {character}
        </h2>
        {nsfw && (
          <span className="shrink-0 inline-flex items-center h-[22px] px-2 rounded-full text-[11px] font-semibold bg-second-plum text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume">
            NSFW
          </span>
        )}
      </div>
      <p className="text-[15px] leading-relaxed text-dark-plume dark:text-linen-cloud">
        {content}
      </p>
    </article>
  );
}

export default Card;