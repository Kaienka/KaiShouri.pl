"use client";
import * as motion from "motion/react-client";

const whileHover = { rotate: 3, transition: { duration: 0.2 } };

type Props = {
    title: string;
    desc?: string;
    href: string;
    children: React.ReactNode;
}

function NavigationA({ title, desc, href, children }: Props) {
  return (
    <a href={href} target="_blank">
      <motion.div
        whileHover={whileHover}
        role="button"
        className={`bg-plume-wine flex items-center w-full p-3 rounded-lg text-start
  leading-tight transition-all duration-200 hover:bg-violet-200 hover:text-plume-wine
  focus:text-plume-wine 
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
    </a>
  );
}

export default NavigationA;
