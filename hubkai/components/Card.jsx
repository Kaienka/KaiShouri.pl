import * as motion from "motion/react-client";

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

function Card({ title, description, finished, svg }) {
  console.log("svg:", svg, typeof svg);

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
      <section className="h-max font-inter p-4 text-base text-center align-top text-linen-cloud">
        <h3>{description}</h3>
      </section>
      <section className="p-4 flex flex-row justify-center">
        <motion.button
          whileHover={whileHover}
          type="button"
          className="cursor-pointer bg-plume-wine transition-colors duration-300 hover:bg-yellow-400 text-linen-cloud hover:text-plume-wine p-2 m-2 text-xs border-transparent rounded shadow"
        >
          czytaj online
        </motion.button>
        {finished && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="button"
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
