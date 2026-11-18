"use client";
import { LinkElement } from "@/types/types.api";
import { useNavCollapsed } from "./NavCollapseContext";

function NavigationA({ title, desc, href, children }: LinkElement) {
  const collapsed = useNavCollapsed();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={collapsed ? title : undefined}
      title={collapsed ? title : undefined}
    >
      <div
        className={`flex items-center rounded-lg text-start font-mono leading-tight
          transition-all duration-200 hover:rotate-3
          ${collapsed
            ? "justify-center w-12 h-12 mx-auto text-third-plum hover:bg-plume-wine/10 dark:text-fourth-plum dark:hover:bg-white/10"
            : "w-full p-3 text-linen-cloud hover:bg-linen-cloud/15"}`}
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
    </a>
  );
}

export default NavigationA;