'use client'
import * as motion from "motion/react-client";
import Link from "next/link";

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

function Card({ title, description, finished, svg }) {
  function getFontSize(description) {
    console.log("description length:", description.length);
    if (description.length < 200) return "text-lg";
    if (description.length < 300) return "text-base";
    return "text-sm";
  }

  function downloadPdf() {
    const link = document.createElement("a");
    link.href = `/pdfs/${title}.pdf`;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className=" shadow-plume-wine shadow-sm flex flex-col justify-between bg-third-plum border border-transparent rounded-lg  min-w-[200px] max-w-[350px]">
      <h1 className="bg-plume-wine text-linen-cloud pb-2 pt-2 border-transparent rounded-t-lg">
        {title} {finished && <span className="text-xs text-green-400">✔</span>}
      </h1>

      {svg && (
        <section className="flex justify-center items-center p-4 pb-0">
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </section>
      )}
      <section className="h-max font-inter p-4 text-center align-top text-linen-cloud">
        <h3 className={getFontSize(description)}>{description}</h3>
      </section>
      <section className="p-4 flex flex-row justify-center">
        <motion.button
          whileHover={whileHover}
          type="button"
          className="cursor-pointer bg-plume-wine transition-colors duration-300 hover:bg-yellow-400 text-linen-cloud hover:text-plume-wine p-2 m-2 text-xs border-transparent rounded shadow"
        >
          <Link href={`/${title}`}>czytaj online</Link>
        </motion.button>
        {finished && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="button"
            onClick={downloadPdf}
            className="cursor-pointer p-2 m-2 text-plume-wine bg-fourth-plum transition-colors duration-300 hover:bg-yellow-400 text-xs border-transparent rounded shadow"
          >
            pobierz pdf
          </motion.button>
        )}
      </section>
    </div>
  );
}

export default Card;
