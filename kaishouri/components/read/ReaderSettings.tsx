"use client";
import { useEffect, useRef, useState } from "react";

export type FontSizeControls = {
  fontSize: number; // w rem, 1 = 100%
  onIncrease: () => void;
  onDecrease: () => void;
  canIncrease: boolean;
  canDecrease: boolean;
};

function ReaderSettings({ fontSize, onIncrease, onDecrease, canIncrease, canDecrease }: FontSizeControls) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sizeBtn =
    "w-11 h-11 rounded-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-violet-200/60 dark:hover:bg-white/10";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label="Rozmiar tekstu"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={`w-11 h-11 rounded-lg text-base font-semibold text-plume-wine dark:text-linen-cloud ${
          open ? "bg-violet-200 dark:bg-white/15" : "hover:bg-violet-200/60 dark:hover:bg-white/10"
        }`}
      >
        Aa
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Rozmiar tekstu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 p-5 rounded-2xl bg-background text-dark-plume dark:text-linen-cloud shadow-sm ring-1 ring-black/5 dark:ring-white/10 flex flex-col gap-2"        >
          <span className="text-[13px] font-semibold opacity-75">Rozmiar tekstu</span>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Zmniejsz tekst" onClick={onDecrease} disabled={!canDecrease} className={`${sizeBtn} text-sm`}>
              A−
            </button>
            <span className="flex-1 text-center text-[15px] font-medium" aria-live="polite">
              {Math.round(fontSize * 100)}%
            </span>
            <button type="button" aria-label="Powiększ tekst" onClick={onIncrease} disabled={!canIncrease} className={`${sizeBtn} text-lg`}>
              A+
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReaderSettings;
