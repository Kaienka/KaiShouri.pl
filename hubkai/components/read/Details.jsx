import Ao3Svg from "@/components/svg/Ao3Svg";
import WattpadSvg from "@/components/svg/WattpadSvg";
import FFSvg from "@/components/svg/FFSvg";
import * as motion from "motion/react-client";
const whileHover = { rotate: 3, transition: { duration: 0.2 } };

function Details({ fic }) {
  return (
    <>
      <div className=" flex flex-col items-center w-4/6 text-plume-wine">
        <h5 className="text-3xl font-bold mb-4">{fic.title}</h5>
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
                  <Ao3Svg/>
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
        <p className="mb-5  text-base  sm:text-lg ">{fic.description}</p>
        <p>{fic.ship}</p>
      </div>
    </>
  );
}

export default Details;
