import Link from "next/link";
import HeaderIconSvg from "@/components/svg/HeaderIconSvg";

type Props = {
  onClick: () => void;
};

function Header({ onClick }: Props) {
  return (
    <div
      className="mb-2 p-4 transition-transform duration-200 hover:rotate-3"
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