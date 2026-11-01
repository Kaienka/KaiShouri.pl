import OpenSvg from "@/components/svg/OpenSvg";
import CloseSvg from "@/components/svg/CloseSvg";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

function HamburgerBtn({ isOpen, onClick }: Props) {
  return (
    <button
      className="text-linen-cloud rounded-md p-4"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <OpenSvg />
      ) : (
        <CloseSvg />
      )}
    </button>
  );
}

export default HamburgerBtn;
