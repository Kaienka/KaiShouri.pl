"use client";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import { XIcon } from "./icons";
import { formatOption, textsCount } from "./labels";

type FilterKey = "fandom" | "nsfw" | "type" | "ship" | "finished";
export type FilterGroup = { key: FilterKey; label: string; options: string[] };

type Props = {
  open: boolean;
  onClose: () => void;
  groups: FilterGroup[];
  values: Record<FilterKey, string>;
  onFilter: (value: string, filterType: string) => void;
  onReset: () => void;
  resultCount: number;
};

function MobileFilterSheet({ open, onClose, groups, values, onFilter, onReset, resultCount }: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-[60] md:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-dark-plume/40 transition-opacity duration-300 data-closed:opacity-0"
      />
      <div className="fixed inset-x-0 bottom-0 flex">
        <DialogPanel
          transition
          className="w-full max-h-[85vh] flex flex-col rounded-t-3xl bg-background text-dark-plume dark:text-linen-cloud font-inter text-left transition-transform duration-300 ease-out data-closed:translate-y-full"
        >
          <div aria-hidden className="w-10 h-1 rounded-full bg-fourth-plum mx-auto mt-2.5" />

          <div className="flex items-center justify-between pl-5 pr-2 py-2">
            <DialogTitle className="text-lg font-semibold">Filtry</DialogTitle>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij"
              className="w-11 h-11 rounded-lg flex items-center justify-center hover:bg-nice-light-purple dark:hover:bg-white/10"
            >
              <XIcon size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-5 flex flex-col gap-6">
            {groups.map((group) => (
              <fieldset key={group.key} className="flex flex-col gap-2.5">
                <legend className="text-[13px] font-semibold text-third-plum dark:text-fourth-plum mb-2.5">
                  {group.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const selected = values[group.key] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onFilter(option, group.key)}
                        className={clsx(
                          "h-10 px-4 rounded-full text-sm transition-colors",
                          selected
                            ? "bg-plume-wine text-linen-cloud font-semibold dark:bg-fourth-plum dark:text-dark-plume"
                            : "bg-nice-light-purple text-dark-plume font-medium dark:bg-white/10 dark:text-linen-cloud",
                        )}
                      >
                        {formatOption(option)}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3 px-5 pt-3 pb-[max(1.75rem,env(safe-area-inset-bottom))] border-t border-black/5 dark:border-white/10">
            <button
              type="button"
              onClick={onReset}
              className="h-12 px-4 text-[15px] font-semibold text-plume-wine dark:text-fourth-plum underline underline-offset-4"
            >
              Wyczyść
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl bg-plume-wine text-linen-cloud dark:bg-fourth-plum dark:text-dark-plume text-[15px] font-semibold"
            >
              Pokaż {textsCount(resultCount)}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default MobileFilterSheet;
