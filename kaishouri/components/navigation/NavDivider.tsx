"use client";
import { DividerTitle } from "@/types/types.api";
import { useNavCollapsed } from "./NavCollapseContext";

function NavDivider({ title }: DividerTitle) {
  const collapsed = useNavCollapsed();

  if (collapsed) {
    return <span aria-hidden="true" className="block w-8 h-px mx-auto my-3 bg-plume-wine/20 dark:bg-fourth-plum/25" />;
  }

  return (
    <span className="flex items-center font-mono text-base font-normal text-linen-cloud">
      <span className="h-px flex-1 bg-linen-cloud/35"></span>
      <span className="shrink-0 px-4">{title}</span>
      <span className="h-px flex-1 bg-linen-cloud/35"></span>
    </span>
  );
}

export default NavDivider;