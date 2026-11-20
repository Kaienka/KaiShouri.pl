import OCProcessor from "@/components/oc/OCProcessor";
import PersonSvg from "@/components/svg/PersonSvg";

function OcPage() {
  return (
    <div className="w-full">
      <header className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 text-left text-dark-plume dark:text-linen-cloud">
        <div className="flex flex-row items-center gap-3 text-third-plum dark:text-fourth-plum">
          <PersonSvg />
          <h1 className="font-mono text-3xl sm:text-4xl font-semibold text-dark-plume dark:text-linen-cloud">
            Postacie własne
          </h1>
        </div>

        <p className="mt-4 font-inter text-base sm:text-[17px] leading-relaxed max-w-[65ch]">
          ...czyli OC wszelkiej maści
        </p>
      </header>
      <OCProcessor />
    </div>
  );
}

export default OcPage;
