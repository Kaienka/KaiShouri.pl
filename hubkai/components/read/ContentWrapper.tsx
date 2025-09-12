'use client'
import dynamic from 'next/dynamic';
import CommentSection from "@/components/comment/CommentSection"

const ChapterContent = dynamic(() => import('@/components/read/ChapterContent'), {
  ssr: false,
});


type Props = {
    fileContent: string,
    index: number,
    fic: string,
    chapterAmount: number
}

function ContentWrapper({ fileContent, index, fic, chapterAmount } : Props) {
    return <>
    <main className="flex flex-col items-center">
            <ChapterContent fileContent={fileContent} index={index} fic={fic} chapterAmount={chapterAmount} />
        </main>

        <section className='mt-4'>
          <p>Sekcja tymczasowo niedziałająca! Poprawiam!</p>
          <CommentSection ficTitle={fic} chapterNo={index} />
        </section>
    </>
}

export default ContentWrapper;