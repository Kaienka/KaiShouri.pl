"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { CheckIcon, ChevronDownIcon, SortIcon } from "./icons";
import { ALL, formatOption } from "./labels";

type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  neutral?: boolean;
  variant?: "chip" | "field";
};

function FilterChip({
  label,
  value,
  options,
  onChange,
  neutral = false,
  variant = "chip",
}: Props) {
  const active = !neutral && value !== ALL;
  const shown = formatOption(value);
  const text =
    neutral || active
      ? shown.toLowerCase().includes(label.toLowerCase())
        ? shown
        : `${label}: ${shown}`
      : label;

  return (
    <Listbox value={value} onChange={onChange}>
      <ListboxButton
        className={clsx(
          "group inline-flex items-center justify-center gap-1.5 px-4 text-sm font-medium whitespace-nowrap transition-colors",
          variant === "chip"
            ? "h-10 rounded-full"
            : "w-full min-w-0 h-11 md:h-12 rounded-xl",
          "focus:outline-none data-focus:ring-2 data-focus:ring-plume-wine/40 dark:data-focus:ring-linen-cloud/40",
          active
            ? "bg-plume-wine text-linen-cloud dark:bg-fourth-plum dark:text-plume-wine"
            : "bg-nice-light-purple text-plume-wine hover:bg-fourth-plum/50 dark:bg-white/10 dark:text-linen-cloud dark:hover:bg-white/15",
        )}
      >
        {neutral && <SortIcon size={16} />}
        {neutral ? (
          <span className="min-w-0 truncate">
            <span className="hidden md:inline">{label}: </span>
            {shown}
          </span>
        ) : (
          text
        )}
        <ChevronDownIcon className="transition-transform group-data-open:rotate-180" />
      </ListboxButton>

      <ListboxOptions
        anchor="bottom start"
        transition
        className={clsx(
          "z-[60] min-w-56 max-h-80 overflow-y-auto p-1.5 rounded-2xl [--anchor-gap:8px] font-inter",
          "bg-background text-dark-plume dark:text-linen-cloud shadow-sm ring-1 ring-black/5 dark:ring-white/10",
          "focus:outline-none transition duration-100 ease-out data-closed:opacity-0 data-closed:-translate-y-1",
        )}
      >
        {options.map((option) => (
          <ListboxOption
            key={option}
            value={option}
            className="group flex items-center justify-between gap-4 h-10 px-3 rounded-lg text-sm cursor-pointer select-none data-focus:bg-nice-light-purple dark:data-focus:bg-white/10 data-selected:font-semibold"
          >
            {formatOption(option)}
            <CheckIcon className="invisible text-plume-wine dark:text-fourth-plum group-data-selected:visible" />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default FilterChip;
