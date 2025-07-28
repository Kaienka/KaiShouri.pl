'use client'
import ReadNavigation from "@/components/read/ReadNavigation"
import FontSizeChanger from "@/components/read/FontSizeChanger"
import ThemeChanger from "@/components/read/ThemeChanger"

import { useState, useEffect } from "react";


function getCookie(name) {
    if (typeof window === 'undefined') return null
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : null
}

function setCookie(name, value, days = 365) {
    if (typeof window === 'undefined') return
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}


function ChapterContent({ fileContent, index, fic, chapterAmount, initialTheme = 'light', initialFontSize = 1 }) {
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

    const [theme, setTheme] = useState(() => {
        const cookieTheme = getCookie('theme')
        return cookieTheme === 'light' || cookieTheme === 'dark' ? cookieTheme : 'light'
    })

    const fontSizeStyle = {
        fontSize: fontSize + 'rem',
    }

    function increaseSize() {
        setFontSize((prev) => prev += 0.25)
    }

    function decreaseSize() {
        setFontSize((prev) => prev -= 0.25)
    }

    function switchTheme() {
        setTheme((prev) => {
            return prev === 'light' ? 'dark' : 'light'
        })
    }

    useEffect(() => {
        setCookie('fontSize', fontSize.toString())
    }, [fontSize])

    useEffect(() => {
        setCookie('theme', theme)
    }, [theme])

    let themeStyles = theme === 'light' ? 'text-dark-plume' : 'bg-dark-plume text-linen-cloud'

    return <main className={`flex flex-col items-center ${themeStyles}`}>
        <section className="flex flex-row w-full">
            <section className="flex flex-row w-[50%] justify-start">
                <FontSizeChanger  onDecrease={decreaseSize} onIncrease={increaseSize} theme={theme} />

            </section>
            <section className="flex flex-row w-[50%] justify-end">
                <ThemeChanger onSwitch={switchTheme} theme={theme} />
            </section>

        </section>
        <div className="m-4 p-4 w-8/12 font-inter flex flex-col items-center"
            style={fontSizeStyle}
            dangerouslySetInnerHTML={{ __html: styledContent }} />
        <ReadNavigation currentChapterIndex={index} escapedTtitle={fic}
            lastChapterIndex={chapterAmount} theme={theme} />
    </main>;
}

export default ChapterContent;