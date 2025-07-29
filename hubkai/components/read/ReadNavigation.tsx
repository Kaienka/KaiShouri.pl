import Link from "next/link";

type Props = {
  lastChapterIndex: number;
  currentChapterIndex: number;
  escapedTtitle: string;
  theme: string
};

function ReadNavigation({
  lastChapterIndex,
  currentChapterIndex,
  escapedTtitle,
  theme
}: Props) {
  return (
    <div className={`p-4 flex flex-row justify-center w-full font-mono ${theme === 'light' ? 'text-plume-wine' : 'text-linen-cloud'} `}>
      {currentChapterIndex != 1 && (
        <Link
          className="border-bg-second-plum border p-2 rounded-md text-sm  sm:text-base mr-2 align-middle"
          href={`/read/${escapedTtitle}/${Number(currentChapterIndex) - 1}`}
        >
          Poprzedni
        </Link>
      )}
      {currentChapterIndex != lastChapterIndex && (
        <Link
          className="border-bg-second-plum border p-2 rounded-md text-sm sm:text-base ml-2 align-middle"
          href={`/read/${escapedTtitle}/${Number(currentChapterIndex) + 1}`}
        >
          Następny
        </Link>
      )}
    </div>
  );
}

export default ReadNavigation;
