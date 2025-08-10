'use client'
import * as motion from "motion/react-client";
import Link from "next/link";
import DoneSvg from "./svg/DoneSvg";
import NsfwSvg from "./svg/NsfwSvg";

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

function FanficCard({ title, description, finished, svg, titleEscaped, fandom, wordCount, chapters, nsfw }) {
  function getFontSize(description) {
    if (description.length < 200) return "text-lg";
    if (description.length < 300) return "text-base";
    return "text-sm";
  }

  function downloadPdf() {
    const link = document.createElement("a");
    link.href = `/pdfs/${titleEscaped}.pdf`;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const link = '/read/' + titleEscaped

  return (
    <div className=" shadow-plume-wine shadow-sm flex flex-col justify-between bg-plume-wine border border-transparent rounded-lg  min-w-[200px] max-w-[350px]">
      <div>
        <div>

          <h1 className="bg-plume-wine text-linen-cloud pt-2 pb-2 border-transparent rounded-t-lg flex flex-row justify-center items-center">

            {nsfw && <span className="mr-2 text-xs text-red-200">
              <NsfwSvg />
            </span>} {title} {finished && <span className="ml-2 text-xs text-green-300">
              <DoneSvg />
            </span>}
          </h1>
        </div>
        <div className=" bg-plume-wine text-fourth-plum text-xs font-bold font-mono pb-2 flex flex-row justify-evenly">
          {fandom &&
            <p >fandom {fandom}</p>}
          <p>{wordCount} słów</p>
          <p>{chapters} rozdziałów</p>
        </div>
      </div>
      <div className="bg-third-plum flex-1">
        {svg && (
          <section className="flex justify-center items-center p-4 pb-0">
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </section>
        )}
        <section className="h-max font-inter p-4 text-center align-top text-linen-cloud">
          <h3 className={getFontSize(description)}>{description}</h3>
        </section>
      </div>
      <section className="p-4 flex flex-row justify-center bg-third-plum">
        <motion.button
          whileHover={whileHover}
          type="button"
          className="cursor-pointer bg-plume-wine transition-colors duration-300 hover:bg-yellow-400 text-linen-cloud hover:text-plume-wine p-2 m-2 text-xs border-transparent rounded shadow"
        >
          <Link href={link}>czytaj</Link>
        </motion.button>
{/*         {finished && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="button"
            onClick={downloadPdf}
            className="cursor-pointer p-2 m-2 text-plume-wine bg-fourth-plum transition-colors duration-300 hover:bg-yellow-400 text-xs border-transparent rounded shadow"
          >
            pobierz pdf
          </motion.button>
        )} */}
      </section>

    </div>
  );
}

export default FanficCard;
