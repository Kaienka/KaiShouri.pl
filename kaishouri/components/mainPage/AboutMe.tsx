import Image from "next/image";
import avatar from "@/public/kai.jpg";

function AboutMe() {
  return (
    <section className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 sm:p-7 rounded-2xl bg-nice-light-purple dark:bg-dark-plume">
      <Image
        src={avatar}
        alt="Kai Shouri - avatar"
        className="w-24 h-24 shrink-0 rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-2.5">
        <h2 className="self-start inline-block px-3 py-1 rounded-lg font-mono text-xl font-semibold uppercase tracking-wide bg-plume-wine text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume origin-left transition-transform duration-200 hover:-rotate-2 hover:scale-110">
          Kai Shouri
        </h2>
        <p className="font-mono text-[15px] leading-relaxed text-dark-plume dark:text-linen-cloud">
          Piszę fanfiki, nałogowo. Kawę też piję nałogowo. Non-stop obracam w
          głowie bandę krajów z Hetalii, mam więcej pomysłów na AU niż moje
          palce są w stanie napisać, a w fandomie stać będę aż do upadku
          cywilizacji, bo Feliks, Taurys, Gilbert i reszta zamieszkali mi w
          głowie na pobyt stały (rent free, pomijając angsty) i nie zamierzam
          ich stamtąd wypuścić. Pantserka, entuzjastka pisania bez planu i
          szaleńczego łączenia wątków, introwertyczka, chodzący chaos
          kontrolowany przez perfekcjonizm.
        </p>
      </div>
    </section>
  );
}

export default AboutMe;
