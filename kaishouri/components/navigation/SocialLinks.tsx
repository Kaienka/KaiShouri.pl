"use client";
import NavDivider from "@/components/navigation/NavDivider";
import WattpadSvg from "@/components/svg/WattpadSvg";
import InstaSvg from "@/components/svg/InstaSvg";
import Ao3Svg from "@/components/svg/Ao3Svg";
import FFSvg from "@/components/svg/FFSvg";
import { useNavCollapsed } from "./NavCollapseContext";

const linkBase =
  "flex items-center p-3 rounded-xl text-start leading-tight transition-all duration-200 hover:rotate-3";

function SocialLinks() {
  const collapsed = useNavCollapsed();
  const linkClass = `${linkBase} ${
    collapsed
      ? "hover:bg-plume-wine/10 focus-visible:bg-plume-wine/10 dark:hover:bg-white/10"
      : "hover:bg-linen-cloud/15 focus-visible:bg-linen-cloud/15"
  }`;

  return (
    <div>
      <NavDivider title="jestem tutaj" />

      <nav className={`flex gap-1 p-2 font-mono text-base font-normal justify-center ${collapsed ? "flex-col items-center text-third-plum dark:text-fourth-plum" : "flex-row text-linen-cloud"}`}>
        <a href="https://www.instagram.com/kai_shouri/" className="w-fit" target="_blank" aria-label="Link do Instagrama">
          <div className={linkClass}>
            <div className="grid place-items-center">
              <InstaSvg />
            </div>
          </div>
        </a>
        <a href="https://www.wattpad.com/user/KaiShouri" className="w-fit" target="_blank" aria-label="Link do Wattpada">
          <div className={linkClass}>
            <div className="grid place-items-center">
              <WattpadSvg />
            </div>
          </div>
        </a>
        <a href="https://archiveofourown.org/users/KaiShouri" className="w-fit" target="_blank" aria-label="Link do Ao3">
          <div className={linkClass}>
            <div className="grid place-items-center">
              <Ao3Svg />
            </div>
          </div>
        </a>
        <a href="https://www.fanfiction.net/u/3120196/" className="w-fit" target="_blank" aria-label="Link do fanfiction.net">
          <div className={linkClass}>
            <div className="grid place-items-center">
              <FFSvg />
            </div>
          </div>
        </a>
      </nav>
    </div>
  );
}

export default SocialLinks;
