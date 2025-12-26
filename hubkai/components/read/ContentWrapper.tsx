'use client'
import dynamic from 'next/dynamic';
import CommentSection from "@/components/comment/CommentSection"
import { Content } from '@/types/types.api';
import { useState } from 'react';

const ChapterContent = dynamic(() => import('@/components/read/ChapterContent'), {
  ssr: false,
});


function ContentWrapper({ fileContent, index, fic, chapterAmount } : Content) {


  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);

  function showComments() {
    setCommentsVisible(true)
  }

    return <>
    <main className="flex flex-col items-center">
            <ChapterContent fileContent={fileContent} index={index} fic={fic} chapterAmount={chapterAmount} onLoad={showComments} />
        </main>

        {commentsVisible && <section className='mt-4'>
          <CommentSection ficTitle={fic} chapterNo={index} />
        </section>}
    </>
}

export default ContentWrapper;