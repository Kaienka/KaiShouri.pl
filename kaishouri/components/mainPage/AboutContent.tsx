import ContentSvg from "@/components/svg/ContentSvg";
import LastUpdate from "./LastUpdate";

function AboutContent() {
  return (
    <div className="flex flex-col gap-4 p-6 sm:p-7 rounded-2xl bg-lilac dark:bg-dark-lilac">
      <h2 className="flex items-center gap-2.5 font-mono text-[17px] font-semibold text-dark-plume dark:text-linen-cloud">
        <span className="shrink-0 text-third-plum dark:text-fourth-plum">
          <ContentSvg />
        </span>
        Ostatnie aktualizacje
      </h2>
      <LastUpdate />
    </div>
  );
}

export default AboutContent;