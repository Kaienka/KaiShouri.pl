import Ao3Svg from "@/components/svg/Ao3Svg";
import WattpadSvg from "@/components/svg/WattpadSvg";
import FFSvg from "@/components/svg/FFSvg";
import * as motion from "motion/react-client";
import Link from "next/link";

const whileHover = { rotate: 3, transition: { duration: 0.2 } };

async function Details({ fic, chapterTitles }) {
  return (
    <>
      <div className=" flex flex-col items-center w-4/6 text-plume-wine dark:text-linen-cloud">
        <h5 className="text-3xl font-bold">{fic.title}</h5>
        <h6 className="mt-1 text-sm">{fic.date}</h6>
        <section className="flex flex-row m-2">
          {fic.links?.ao3 && (
            <a href={fic.links.ao3} target="_blank" className="w-fit">
              <motion.div
                whileHover={whileHover}
                role="button"
                tabIndex="0"
                className="flex items-center p-3 rounded-lg text-start leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine"
              >
                <div className="grid place-items-center">
                  <Ao3Svg />
                </div>
              </motion.div>
            </a>
          )}
          {fic.links?.ffnet && (
            <a href={fic.links.ffnet} target="_blank" className="w-fit">
              <motion.div
                whileHover={whileHover}
                role="button"
                tabIndex="0"
                className="flex items-center p-3 rounded-lg text-start leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine"
              >
                <div className="grid place-items-center">
                  <FFSvg />
                </div>
              </motion.div>
            </a>
          )}
          {fic.links?.wattpad && (
            <a href={fic.links.wattpad} target="_blank" className="w-fit">
              <motion.div
                whileHover={whileHover}
                role="button"
                tabIndex="0"
                className="flex items-center p-3 rounded-lg text-start leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine"
              >
                <div className="grid place-items-center">
                  <WattpadSvg />
                </div>
              </motion.div>
            </a>
          )}
        </section>
        <section className="flex flex-row mb-5">
          <p className="p-2 m-2 bg-plume-wine text-linen-cloud rounded-2xl text-sm flex items-center ">{fic.status}</p>
          <p className="p-2 m-2 bg-plume-wine text-linen-cloud rounded-2xl text-sm flex items-center">{fic.ship}</p>
        </section>
        <p className="mb-5 text-base sm:text-lg ">{fic.description}</p>
        <section className="mt-5 mb-20 p-4 flex flex-col">

          {chapterTitles && chapterTitles.map((chapter, index) => (
            <Link
              href={`/read/${fic.titleEscaped}/${index + 1}`}
              key={chapter}
              className="p-2"
            >
              {chapter}
            </Link>
          ))}

        </section>
      </div>
    </>
  );
}

export default Details;
