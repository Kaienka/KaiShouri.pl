"use client";
import Link from "next/link";
import HeaderIconSvg from "@/components/svg/HeaderIconSvg";
import { useNavCollapsed } from "./NavCollapseContext";

type Props = {
  onClick: () => void;
};

function Header({ onClick }: Props) {
  const collapsed = useNavCollapsed();

  if (collapsed) {
    return (
      <div
        className="mb-2 py-4 flex justify-center text-third-plum dark:text-fourth-plum transition-transform duration-200 hover:rotate-3"
        onClick={onClick}
      >
        <Link href="/" aria-label="Kai Shouri" title="Kai Shouri">
          <HeaderIconSvg />
        </Link>
      </div>
    );
  }

  return (
    <div
      className="mb-2 p-4 text-linen-cloud transition-transform duration-200 hover:rotate-3"
      onClick={onClick}
    >
      <Link href="/">
        <div className="flex items-center">
          <HeaderIconSvg />
          <h5 className="ml-2 inline-block antialiased tracking-normal font-mono text-xl font-semibold leading-snug text-linen-cloud">
            Kai Shouri
          </h5>
        </div>
        <p className="font-mono text-xs text-linen-cloud">
          Centrum sterowania Wszechświatem
        </p>
      </Link>
    </div>
  );
}

export default Header;