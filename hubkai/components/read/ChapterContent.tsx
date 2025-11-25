'use client'
import ReadNavigation from "@/components/read/ReadNavigation"
import FontSizeChanger from "@/components/read/FontSizeChanger"
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Chapter } from "@/types/types.api";


function getCookie(name:string) {
    if (typeof window === 'undefined') return null
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : null
}

function setCookie(name:string, value:string, days = 365) {
    if (typeof window === 'undefined') return
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

function ChapterContent({ fileContent, index, fic, chapterAmount }:Chapter) {
    const styledContent = `
  <style>
    p { margin:0; padding:0.5rem 0;}
    h1, h2 { margin-bottom:1rem; }
  </style>
` + fileContent;

    const [fontSize, setFontSize] = useState(() => {
        const cookieFontSize = getCookie('fontSize')
        return cookieFontSize ? parseFloat(cookieFontSize) : 1
    })



    const { theme } = useTheme();


    const fontSizeStyle = {
        fontSize: fontSize + 'rem',
    }

    function increaseSize() {
        if (fontSize <= 5.5) {
            setFontSize((prev) => prev += 0.25)
        }
    }

    function decreaseSize() {
        if (fontSize >= 0.75) {
            setFontSize((prev) => prev -= 0.25)
        }
    }

    useEffect(() => {
        setCookie('fontSize', fontSize.toString())
    }, [fontSize])



    return <main className="flex flex-col items-center">
        <section className="flex flex-row w-full items-center mt-2">
            <ReadNavigation currentChapterIndex={index} escapedTtitle={fic}
                lastChapterIndex={chapterAmount} theme={theme} />
            <section className="flex flex-row justify-center w-full">
                <FontSizeChanger onDecrease={decreaseSize} onIncrease={increaseSize} theme={theme} />
            </section>
        </section>
        <div className=" m-4 p-4 w-10/12 sm:w-8/12 font-inter flex flex-col items-center text-dark-plume dark:text-linen-cloud wrap-normal"
            style={fontSizeStyle}
            dangerouslySetInnerHTML={{ __html: styledContent }} />
        <ReadNavigation currentChapterIndex={index} escapedTtitle={fic}
            lastChapterIndex={chapterAmount} theme={theme} />
    </main>;
}

export default ChapterContent;