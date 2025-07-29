import Image from "next/image";
import avatar from "@/public/kai.jpg";
import Link from "next/link";
import * as motion from "motion/react-client";
import  ContentSvg  from "@/components/svg/ContentSvg";
const whileHover = { scale: 1.1, transition: { duration: 0.2 } };
const whileHoverAuthor = {
  rotate: "-2deg",
  scale: 1.1,
  transition: { duration: 0.2 },
};

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center
     min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)] "
    >
      <main
        className="flex flex-col gap-[1rem] row-start-2 justify-center items-center w-vw text-center text-xl overflow-clip
      w-12/12 sm:w-8/12 md:w-11/12 lg:w-9/12"
      >
        <h1 className="text-plume-wine dark:text-linen-cloud font-inter text-2xl font-bold">
          Na początku byli Lech, Czech i Rus... oraz ich przyrodni brat,
          Deutschland.
        </h1>
        <section className="flex flex-col w-full sm:text-base p-4 border rounded text-plume-wine dark:text-linen-cloud font-mono">
          <blockquote>
            &quot;Czy można wiedzieć, o czym będzie pisana powieść? Czy taka
            uprzednia wiedza nie kwestionuje samej powieści? Wiedzieć, co się
            chce powiedzieć - to czyni powieść zbędną, redukuje ją do roli
            narzędzia do opowiedzenia tego, co już wcześniej znane i
            przemyślane. Dowiadywać się za pomocą pisania powieści, co chce się
            powiedzieć, wędrować powieścią jak po drodze, to dopiero wyzwanie.
          </blockquote>
          <p className="text-right p-2">
            Witt Szostak &ndash; &bdquo;Poniewczasie&rdquo;
          </p>
        </section>
        <section className="bg-third-plum p-6 m-2 text-linen-cloud rounded font-mono w-full">
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
              Piszę fanfiki, nałogowo. Kawę też piję nałogowo. Non-stop obracam
              w głowie bandę krajów z Hetalii, mam więcej pomysłów na AU niż
              moje palce są w stanie napisać, a w fandomie stać będę aż do
              upadku cywilizacji, bo Feliks, Taurys, Gilbert i reszta
              zamieszkali mi w głowie na pobyt stały (rent free, pomijając
              angsty) i nie zamierzam ich stamtąd wypuścić. Pantserka,
              entuzjastka pisania bez planu i szaleńczego łączenia wątków,
              introwertyczka, chodzący chaos kontrolowany przez perfekcjonizm.
            </p>
          </div>
        </section>
        <section className="text-plume-wine flex flex-col lg:flex-row w-full justify-between">
          <div className="bg-violet-200 p-6 lg:mr-2 rounded flex-1 mb-4">
            <div className="flex justify-center items-center mb-4">
             <ContentSvg />
              <h2 className="lg:ml-2 font-mono text-base font-bold">
                co tutaj znajdziecie?
              </h2>
            </div>
            <div>
              <ul className="text-sm font-mono list-none">
                <li className="mb-2">
                  <Link href="/read">
                    <motion.p whileHover={whileHover}>
                      moje fanfiki - do przeczytania i ściągnięcia
                    </motion.p>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/headcanons">
                    <motion.p whileHover={whileHover}>
                      {" "}
                      headcanony o postaciach
                    </motion.p>
                  </Link>
                </li>

                <li className="mb-2">
                  <Link href="/music">
                    <motion.p whileHover={whileHover}>
                      playlisty do moich fanfików
                    </motion.p>
                  </Link>
                </li>
                <li className="mb-2">
                  <motion.p whileHover={whileHover}>
                    dodatki - na przykład mapy
                  </motion.p>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-fourth-plum p-6 lg:ml-2 rounded flex-1 mb-4">
            o mnie?
          </div>
        </section>
      </main>
    </div>
  );
}
