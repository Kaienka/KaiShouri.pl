"use client";

function ReadingProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="sticky top-0 z-30 w-full h-1 pointer-events-none"
      role="progressbar"
      aria-label="Postęp w rozdziale"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
    >
      <div
        className="h-full rounded-r-full bg-third-plum dark:bg-nice-purple transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ReadingProgressBar;