"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkElement } from "@/types/types.api";

function NavigationLink({ title, desc, href, children }: LinkElement) {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <Link href={href}>
      <div
        className={`bg-plume-wine flex items-center w-full p-3 rounded-lg text-start
          leading-tight transition-all duration-200 hover:rotate-3 hover:bg-violet-200 hover:text-plume-wine
          focus:text-plume-wine ${isActive ? "outline-none text-plume-wine bg-violet-200" : ""}`}
      >
        <div className="grid place-items-center mr-4">{children}</div>
        {!desc && title}
        {desc && (
          <div className="block">
            <h3>{title}</h3>
            <p className="text-xs">{desc}</p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default NavigationLink;