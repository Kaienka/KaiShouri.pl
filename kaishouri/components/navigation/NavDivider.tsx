import { DividerTitle } from "@/types/types.api";

function NavDivider({ title }: DividerTitle) {
  return (
    <span className="flex items-center font-mono text-base font-normal text-linen-cloud">
      <span className="h-px flex-1 bg-gradient-to-r to-violet-200"></span>
      <span className="shrink-0 px-4 text-linen-cloud">{title}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-violet-200"></span>
    </span>
  );
}

export default NavDivider;
