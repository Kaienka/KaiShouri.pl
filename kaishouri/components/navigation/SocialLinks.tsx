import NavDivider from "@/components/navigation/NavDivider";
import WattpadSvg from "@/components/svg/WattpadSvg";
import InstaSvg from "@/components/svg/InstaSvg";
import Ao3Svg from "@/components/svg/Ao3Svg";
import FFSvg from "@/components/svg/FFSvg";

const linkClass =
  "flex items-center p-3 rounded-lg text-start leading-tight transition-all duration-200 hover:rotate-3 hover:bg-violet-200 hover:text-plume-wine focus:text-plume-wine";

function SocialLinks() {
  return (
    <div>
      <NavDivider title="jestem tutaj" />

      <nav className="flex flex-row gap-1 p-2 font-mono text-base font-normal text-linen-cloud justify-center">
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