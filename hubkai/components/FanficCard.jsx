'use client'
import * as motion from "motion/react-client";
import Link from "next/link";
import DoneSvg from "./svg/DoneSvg";
import NsfwSvg from "./svg/NsfwSvg";
import axios from "axios"

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

function FanficCard({ title, description, finished, svg, titleEscaped, fandom, wordCount, chapters, nsfw }) {
  function getFontSize(description) {
    if (description.length < 200) return "text-lg";
    if (description.length < 300) return "text-base";
    return "text-sm";
  }

  /* const onDownload = async () => {
  console.log(titleEscaped)
  try {
    const res = await axios.post(
      `/api/pdf/${titleEscaped}`,      // URL
      {},                              // body żądania
      { responseType: "arraybuffer" }  // opcje, w tym arraybuffer
    )

    if (res.status === 200) {
      const blob = new Blob([res.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `document-${titleEscaped}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  } catch (error) {
    console.error(error)
  }
} */

  const onDownload = async () => {
  try {
    const res = await axios.post(`/api/pdf/${titleEscaped}`, {}, { responseType: 'arraybuffer' })
    const blob = new Blob([res.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `document-${titleEscaped}.pdf`
    a.click()
    a.remove()
  } catch (err) {
    console.error(err)
  }
}


  const link = '/read/' + titleEscaped

  return (
    <div className="overflow-hidden shadow-plume-wine shadow-sm flex flex-col justify-between bg-plume-wine border border-transparent rounded-lg  min-w-[200px] max-w-[350px]">
      <div>
        <div>

          <h1 className="bg-plume-wine px-2 text-linen-cloud pt-2 pb-2 border-transparent rounded-t-lg flex flex-row justify-center items-center">

            {nsfw && <span className="mr-2 text-xs text-red-200">
              <NsfwSvg aria-label="nsfw" />
            </span>} <span className="wrap">{title}</span> {finished && <span className="ml-2 text-xs text-green-300">
              <DoneSvg aria-label="zakonczone" />
            </span>}
          </h1>
        </div>
        <div className=" bg-plume-wine text-fourth-plum text-xs font-bold font-mono pb-2 flex flex-row justify-evenly">
          {fandom &&
            <p >fandom {fandom}</p>}
          <p>{wordCount} słów</p>
          <p>{chapters} {chapters == 1 ? "rozdział" : chapters < 5 ? 'rozdziały' : "rozdziałów"}</p>
        </div>
      </div>
      <div className="bg-third-plum flex flex-1 justify-center items-center text-linen-cloud font-inter">
        <h3 className={`p-4 ${getFontSize(description)}`}>{description}</h3>
      </div>
      <section className="p-4 flex flex-row justify-center bg-third-plum">
        <motion.button
          whileHover={whileHover}
          type="button"
          role="button"
          aria-label="czytaj"
          className="cursor-pointer bg-plume-wine transition-colors duration-300 hover:bg-yellow-400 text-linen-cloud hover:text-plume-wine p-2 m-2 text-xs border-transparent rounded shadow"
        >
          <Link href={link}>czytaj</Link>
        </motion.button>
        {finished && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="button"
            onClick={onDownload}
            className="cursor-pointer p-2 m-2 text-plume-wine bg-fourth-plum transition-colors duration-300 hover:bg-yellow-400 text-xs border-transparent rounded shadow"
          >
            pobierz pdf
          </motion.button>
        )}
      </section>

    </div>
  );
}

export default FanficCard;
