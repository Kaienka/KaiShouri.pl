type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const SearchIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const ChevronDownIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.5} className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const CheckIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.5} className={className}>
    <path d="M5 12l5 5 9-10" />
  </svg>
);

export const XIcon = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} strokeWidth={2.5} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const SlidersIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);

export const SortIcon = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4" />
  </svg>
);
