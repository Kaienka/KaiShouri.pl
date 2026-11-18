import HeadcanonProcessor from "@/components/headcanons/HeadcanonProcessor";
import IdeaSvg from "@/components/svg/IdeaSvg";

function HeadcanonsPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 text-left text-dark-plume dark:text-linen-cloud">
        <div className="flex flex-row items-center gap-3 text-plume-wine dark:text-fourth-plum">
          <IdeaSvg />
          <h1 className="font-mono text-3xl sm:text-4xl font-semibold text-dark-plume dark:text-linen-cloud">
            Headcanons
          </h1>
        </div>

        <p className="mt-4 font-inter text-base sm:text-[17px] leading-relaxed max-w-[65ch]">
          ...czyli Kai wytycza ciężką artylerię. Podjęłam się karkołomnego
          przedsięwzięcia, czyli wyciągnięcia moich headcanonów z mojej
          chaotycznej głowy i równie chaotycznych fików z ostatniego
          dziesięciolecia i zebrania ich w jednym miejscu. Nie pytajcie, jak
          się to udało.
        </p>
      </header>

      <HeadcanonProcessor />
    </div>
  );
}

export default HeadcanonsPage;