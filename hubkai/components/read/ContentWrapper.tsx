'use client'
import dynamic from 'next/dynamic';

const ChapterContent = dynamic(() => import('@/components/read/ChapterContent'), {
  ssr: false, // wyłącza server-side rendering oraz prerender
});
type Props = {
    fileContent: string,
    index: number,
    fic: string,
    chapterAmount: number
}

function ContentWrapper({ fileContent, index, fic, chapterAmount } : Props) {
    return <main className="flex flex-col items-center">
            <ChapterContent fileContent={fileContent} index={index} fic={fic} chapterAmount={chapterAmount} />
        </main>
}

export default ContentWrapper;