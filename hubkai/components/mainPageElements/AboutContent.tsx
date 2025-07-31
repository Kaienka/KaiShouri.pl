import ContentSvg from "@/components/svg/ContentSvg";
import * as motion from "motion/react-client";
import Link from "next/link";

const whileHover = { scale: 1.1, transition: { duration: 0.2 } };

function AboutContent() {
  return (
    <div className="bg-violet-200 p-6 lg:mr-2 rounded flex-1 mb-4 shadow">
      <div className="flex justify-center items-center mb-4">
        <ContentSvg />
        <h2 className="lg:ml-2 font-mono text-base font-bold">
          co tutaj znajdziecie?
        </h2>
      </div>
      <div>
        <ul className="text-sm font-mono list-none">
          <li className="mb-2">
            <Link href="/read">
              <motion.p whileHover={whileHover}>
                moje fanfiki - do przeczytania i ściągnięcia
              </motion.p>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/headcanons">
              <motion.p whileHover={whileHover}>
                headcanony o postaciach
              </motion.p>
            </Link>
          </li>

          <li className="mb-2">
            <Link href="/music">
              <motion.p whileHover={whileHover}>
                playlisty do moich fanfików
              </motion.p>
            </Link>
          </li>
          <li className="mb-2">
            <motion.p whileHover={whileHover}>
              dodatki - na przykład mapy
            </motion.p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutContent;
