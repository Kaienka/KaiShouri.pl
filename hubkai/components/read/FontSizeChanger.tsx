"use client";

type Props = {
  onDecrease: () => void;
  onIncrease: () => void;
  theme: string
};

function FontSizeChanger({ onDecrease, onIncrease, theme }: Props) {
  return (
    <div className={`p-4 flex flex-row  font-mono ${theme === 'light' ? 'text-plume-wine' : 'text-linen-cloud'} `}>
      <button
        className="border-bg-second-plum  p-2 rounded-md  text-base mr-2"
        onClick={onIncrease}
      >
        A+
      </button>

      <button
        className="border-bg-second-plum  p-2 rounded-md  text-base ml-2"
        onClick={onDecrease}
      >
        A-
      </button>
    </div>
  );
}

export default FontSizeChanger;
