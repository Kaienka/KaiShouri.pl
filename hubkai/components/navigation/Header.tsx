import Link from "next/link";
import * as motion from "motion/react-client";
import HeaderIconSvg from "@/components/svg/HeaderIconSvg";
import { whileHoverLinks } from "@/app/utils/motion";

function Header() {
  return (
    <>
      <motion.div className="mb-2 p-4" whileHover={whileHoverLinks}>
        <Link href="/">
          <motion.div className="flex items-center">
            <HeaderIconSvg />
            <h5 className="ml-2 inline-block antialiased tracking-normal font-mono text-xl font-semibold leading-snug text-linen-cloud">
              Kai Shouri
            </h5>
          </motion.div>
          <p className="font-mono text-xs text-linen-cloud">
            Centrum sterowania Wszechświatem
          </p>
        </Link>
      </motion.div>
    </>
  );
}

export default Header;
