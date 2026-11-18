"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkElement } from "@/types/types.api";
import { useNavCollapsed } from "./NavCollapseContext";

function NavigationLink({ title, desc, href, children }: LinkElement) {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(href + "/");
  const collapsed = useNavCollapsed();

  return (
    <Link href={href} aria-label={collapsed ? title : undefined} title={collapsed ? title : undefined}>
      <div
        className={`flex items-center rounded-lg text-start font-mono
          leading-tight transition-all duration-200 hover:rotate-3
          ${collapsed ? "justify-center w-12 h-12 mx-auto" : "w-full p-3"}
          ${collapsed
            ? isActive
              ? "bg-lilac text-plume-wine dark:bg-fourth-plum/20 dark:text-linen-cloud"
              : "text-third-plum hover:bg-plume-wine/10 dark:text-fourth-plum dark:hover:bg-white/10"
            : isActive
              ? "bg-nice-light-purple text-plume-wine font-semibold"
              : "text-linen-cloud hover:bg-linen-cloud/15"}`}
      >
        <div className={`grid place-items-center ${collapsed ? "" : "mr-4"}`}>{children}</div>
        {!collapsed && !desc && title}
        {!collapsed && desc && (
          <div className="block">
            <h3>{title}</h3>
            <p className="text-xs text-fourth-plum">{desc}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default NavigationLink;