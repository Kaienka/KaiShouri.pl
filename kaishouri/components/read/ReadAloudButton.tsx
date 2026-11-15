"use client";
import { PauseIcon, PlayIcon, StopIcon } from "./icons";

export type SpeechControls = {
  speechStatus: string; // "started" | "paused" | "stopped" | "queued"
  start: () => void;
  pause: () => void;
  stop: () => void;
};

type Props = SpeechControls & { variant: "desktop" | "mobile" };

function ReadAloudButton({ speechStatus, start, pause, stop, variant }: Props) {
  const playing = speechStatus === "started";
  const active = speechStatus === "started" || speechStatus === "paused";
  const label = playing ? "Wstrzymaj" : speechStatus === "paused" ? "Wznów" : "Czytaj na głos";

  const toggle = () => (playing ? pause() : start());

  if (variant === "mobile") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className="w-11 h-11 rounded-lg flex items-center justify-center text-plume-wine dark:text-linen-cloud hover:bg-violet-200/60 dark:hover:bg-white/10"      >
        {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex items-center gap-2 h-11 pl-3.5 pr-4 rounded-full bg-plume-wine text-linen-cloud dark:bg-linen-cloud dark:text-plume-wine text-[15px] font-medium whitespace-nowrap"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
        {label}
      </button>
      {active && (
        <button
          type="button"
          onClick={stop}
          aria-label="Zatrzymaj czytanie"
          className="w-11 h-11 rounded-lg flex items-center justify-center text-plume-wine dark:text-linen-cloud hover:bg-violet-200/60 dark:hover:bg-white/10"
        >
          <StopIcon />
        </button>
      )}
    </div>
  );
}

export default ReadAloudButton;
