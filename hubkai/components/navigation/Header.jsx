import Link from "next/link";
import * as motion from "motion/react-client";

const whileHover = { rotate: 3, transition: { duration: 0.2 } };

function Header() {
  return (
    <motion.div className="mb-2 p-4" whileHover={whileHover}>
      <Link href="/">
        <motion.div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-signature inline-block text-linen-cloud"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 17c3.333 -3.333 5 -6 5 -8c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 4.877 2.5 6c1.5 2 2.5 2.5 3.5 1l2 -3c.333 2.667 1.333 4 3 4c.53 0 2.639 -2 3 -2c.517 0 1.517 .667 3 2" />
          </svg>
          <h5 className="ml-2 inline-block antialiased tracking-normal font-mono text-xl font-semibold leading-snug text-linen-cloud">
            Kai Shouri
          </h5>
        </motion.div>
        <p className="font-mono text-xs text-linen-cloud">
          Centrum sterowania Wszechświatem
        </p>
      </Link>
    </motion.div>
  );
}

export default Header;
