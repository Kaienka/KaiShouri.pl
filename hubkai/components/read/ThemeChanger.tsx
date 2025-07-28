'use client'
import LightModeSvg from "../svg/LightModeSvg";
import DarkModeSvg from "../svg/DarkModeSvg";

type Props = {
  onSwitch: () => void;
  theme: string
};

function ThemeChanger({onSwitch, theme} : Props) {
  
  return (
    <div className="p-4 flex flex-row  font-mono ">
      <button
        className={`border-bg-second-plum p-2 rounded-md  text-base mr-2 ${theme === 'light' ? 'text-plume-wine' : 'text-linen-cloud'}`}
        onClick={onSwitch}
      >
        {theme == 'light' && <DarkModeSvg color="#5e4074"/>}
         {theme == 'dark' && <LightModeSvg color="#f7f9ec"/>}
      </button>
    </div>
  );
}

export default ThemeChanger;