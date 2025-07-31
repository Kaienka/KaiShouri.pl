import * as motion from "motion/react-client";
import Image from "next/image";
import avatar from "@/public/kai.jpg";

const whileHoverAuthor = {
  rotate: "-2deg",
  scale: 1.1,
  transition: { duration: 0.2 },
};

function AboutMe() {
  return (
    <section className="bg-third-plum p-6 m-2 text-linen-cloud rounded font-mono w-full shadow">
      <div className="flex justify-center">
        <motion.h1
          whileHover={whileHoverAuthor}
          className="font-mono text-linen-cloud font-bold 
              uppercase text-xl bg-plume-wine p-2 rounded w-3/6 md:w-2/6 mb-2"
        >
          Kai Shouri
        </motion.h1>
      </div>
      <div className="flex lg:flex-row flex-col items-center justify-center">
        <Image
          src={avatar}
          alt="Kai Shouri - avatar"
          className="rounded-md"
          style={{ objectFit: "contain" }}
        />
        <p className="text-base font-mono whitespace-pre-line">
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
