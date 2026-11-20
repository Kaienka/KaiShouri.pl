'use client'
import dynamic from 'next/dynamic';
import CommentSection from "@/components/comment/CommentSection"
import NotesSection from "@/components/read/NotesSection"
import { Content } from '@/types/types.api';
import { useCallback, useState } from 'react';

const ChapterContent = dynamic(() => import('@/components/read/ChapterContent'), {
  ssr: false,
});

function ContentWrapper({ fileContent, index, fic, chapterAmount, chapterTitles, notes }: Content) {
  const [commentsVisible, setCommentsVisible] = useState<boolean>(false);

  const showComments = useCallback(() => setCommentsVisible(true), []);

  return <>
    <div className="flex flex-col items-center w-full">
      <ChapterContent
        fileContent={fileContent}
        index={index}
        fic={fic}
        chapterAmount={chapterAmount}
        chapterTitles={chapterTitles}
        onLoad={showComments}
      />
    </div>

    {commentsVisible && notes && <section className='mt-4 w-full'>
      <NotesSection notes={notes} />
    </section>}

    {commentsVisible && <section className={`${notes ? 'mt-0' : 'mt-4'} w-full`}>
      <CommentSection ficTitle={fic} chapterNo={index} />
    </section>}
  </>
}

export default ContentWrapper;
