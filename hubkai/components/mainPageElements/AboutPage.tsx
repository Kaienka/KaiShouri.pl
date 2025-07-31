import AboutSvg from "@/components/svg/AboutSvg";

function AboutPage() {
  return (
    <div className="bg-fourth-plum p-6 lg:ml-2 rounded flex-1 mb-4 shadow">
      <div className="flex justify-center items-center mb-4">
        <AboutSvg />
        <h2 className="lg:ml-2 font-mono text-base font-bold">O stronie</h2>
      </div>
      <p className="text-base font-mono whitespace-pre-line">
        Strona wykorzystuje pliki cookie i pamięć lokalną do zapamiętania
        wybranego motywu i rozmiaru fontu przy czytaniu. W całości napisana
        przeze mnie, zawiera moją twórczość. Wszystkie prawa zastrzeżone,
        zarówno co do treści, jak i konstrukcji strony.
      </p>
      <p className="text-base font-mono whitespace-pre-line">
        Od strony technologicznej: React, Next.js
      </p>
    </div>
  );
}

export default AboutPage;
