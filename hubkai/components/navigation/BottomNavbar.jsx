import Link from "next/link";
import NavDivider from "@/components/navigation/NavDivider";
import * as motion from "motion/react-client";
import WattpadSvg from "@/components/svg/WattpadSvg";
import InstaSvg from "@/components/svg/InstaSvg";
import Ao3Svg from "@/components/svg/Ao3Svg";
import FFSvg from "@/components/svg/FFSvg";

const whileHover = { rotate: 3, transition: { duration: 0.2 } };

function BottomNavbar() {
  return (
    <div>
      <NavDivider title="jestem tutaj" />

      <nav className="flex flex-row gap-1 p-2 font-mono text-base font-normal text-linen-cloud justify-center">
        <a href="https://www.instagram.com/kai_shouri/" className="w-fit" target="_blank">
          <motion.div
            whileHover={whileHover}
            role="button"
            tabIndex="0"
                      aria-label="Link do Instagrama"
            className="flex items-center p-3 rounded-lg text-start leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine"
          >
            <div className="grid place-items-center">
              <InstaSvg />
            </div>
          </motion.div>
        </a>
        <a href="https://www.wattpad.com/user/KaiShouri" className="w-fit" target="_blank">
          <motion.div
            whileHover={whileHover}
            role="button"
            tabIndex="0"
            aria-label="Link do Wattpada"
            className="flex items-center p-3 rounded-lg text-start
  leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine
  "
          >
            <div className="grid place-items-center">
              <WattpadSvg />
            </div>
          </motion.div>
        </a>
        <a
          href="https://archiveofourown.org/users/KaiShouri"
          className="w-fit"
          target="_blank"
          aria-label="Link do Ao3"
        >
          <motion.div
            whileHover={whileHover}
            role="button"
            tabIndex="0"
            className="flex items-center p-3 rounded-lg text-start
  leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine
  "
          >
            <div className="grid place-items-center">
              <Ao3Svg />
            </div>
          </motion.div>
        </a>
        <a href="https://www.fanfiction.net/u/3120196/" className="w-fit" target="_blank">
          <motion.div
            whileHover={whileHover}
            role="button"
            tabIndex="0"
            aria-label="Link do fanfiction.net"
            className="flex items-center p-3 rounded-lg text-start
  leading-tight transition-all  hover:bg-violet-200  hover:text-plume-wine focus:text-plume-wine
  "
          >
            <div className="grid place-items-center">
              <FFSvg />
            </div>
          </motion.div>
        </a>
      </nav>
    </div>
  );
}

export default BottomNavbar;
