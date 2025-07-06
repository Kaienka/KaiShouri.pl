"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";

const whileHover = { rotate: 3, transition: { duration: 0.2 } };

function NavigationLink({ title, desc, href, children }) {
  const pathName = usePathname();
  return (
    <Link href={href}>
      <motion.div
        whileHover={whileHover}
        role="button"
        tabIndex="0"
        className={`bg-plume-wine flex items-center w-full p-3 rounded-lg text-start
  leading-tight transition-all duration-200 hover:bg-violet-200 hover:text-plume-wine
  focus:text-plume-wine ${
    pathName === href ? "outline-none text-plume-wine bg-violet-200" : ""
  }
`}
      >
        <div className="grid place-items-center mr-4">{children}</div>
        {!desc && title}
        {desc && (
          <div className="block">
            <h3>{title}</h3>
            <p className="text-xs">{desc}</p>
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default NavigationLink;
