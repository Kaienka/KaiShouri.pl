import AboutSvg from "@/components/svg/AboutSvg";

function AboutPage() {
  return (
    <div className="flex flex-col gap-4 p-6 sm:p-7 rounded-2xl bg-lilac dark:bg-dark-lilac">
      <h2 className="flex items-center gap-2.5 font-mono text-[17px] font-semibold text-dark-plume dark:text-linen-cloud">
        <span className="shrink-0 text-third-plum dark:text-fourth-plum">
          <AboutSvg />
        </span>
        O stronie
      </h2>
      <p className="font-mono text-sm leading-relaxed text-dark-plume dark:text-linen-cloud">
        Strona wykorzystuje pliki cookie i pamięć lokalną do zapamiętania
        wybranego motywu i rozmiaru fontu przy czytaniu. W całości napisana
        przeze mnie, zawiera moją twórczość. Wszystkie prawa zastrzeżone,
        zarówno co do treści, jak i konstrukcji strony.
      </p>
      <p className="font-mono text-sm leading-relaxed text-dark-plume dark:text-linen-cloud">
        Od strony technologicznej: React, Next.js, Tailwind, Vercel.
      </p>
    </div>
  );
}

export default AboutPage;