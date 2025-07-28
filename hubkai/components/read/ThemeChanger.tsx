'use client'

type Props = {
  onSwitch: () => void;
  theme: string
};

function ThemeChanger({onSwitch, theme} : Props) {
  return (
    <div className="p-4 flex flex-row justify-center w-full font-mono ">
      <button
        className={`border-bg-second-plum p-2 rounded-md  text-base mr-2 ${theme === 'light' ? 'text-plume-wine' : 'text-linen-cloud'}`}
        onClick={onSwitch}
      >
        jasny/ciemny
      </button>
    </div>
  );
}

export default ThemeChanger;