"use client";
 import LightModeSvg from "../svg/LightModeSvg";
 import DarkModeSvg from "../svg/DarkModeSvg";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";



function ThemeChanger() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  console.log(theme);

    useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="p-4 flex flex-row  font-mono ">
      <button
       
        className={`border-bg-second-plum p-2 rounded-md  text-base mr-2 ${
          theme === "light" ? "text-plume-wine" : "text-linen-cloud"
        }`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme == "light" && <DarkModeSvg color="#5e4074" />}
        {theme == "dark" && <LightModeSvg color="#f7f9ec" />}
      </button>
    </div>
  );
}

export default ThemeChanger;
