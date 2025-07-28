'use client'
import ReadNavigation from "@/components/read/ReadNavigation"
import FontSizeChanger from "@/components/read/FontSizeChanger"
import ThemeChanger from "@/components/read/ThemeChanger"

import { useState, useEffect } from "react";

function ChapterContent({ fileContent, index, fic, chapterAmount }) {
    const styledContent = `
  <style>
    p { margin:0; padding:0.5rem 0;}
    h1, h2 { margin-bottom:1rem; }
  </style>
` + fileContent;

    const [fontSize, setFontSize] = useState(() => {
            const fontSize = localStorage.getItem('fontSize')
            return fontSize ? JSON.parse(fontSize) : 1
        })
    const [theme, setTheme] = useState(() => {
            const theme = localStorage.getItem('theme')
            return theme ? JSON.parse(theme) : 'light'
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
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])

    useEffect(() => {
        localStorage.setItem("fontSize", JSON.stringify(fontSize))
    }, [fontSize])

    let themeStyles = theme === 'light' ? 'text-dark-plume' : 'bg-dark-plume text-linen-cloud'

    return <main className={`flex flex-col items-center ${themeStyles}`}>
        <ThemeChanger onSwitch={switchTheme} theme={theme} />
        <FontSizeChanger onDecrease={decreaseSize} onIncrease={increaseSize} theme={theme} />
        <div className="m-4 p-4 w-8/12 font-inter flex flex-col items-center"
            style={fontSizeStyle}
            dangerouslySetInnerHTML={{ __html: styledContent }} />
        <ReadNavigation currentChapterIndex={index} escapedTtitle={fic}
            lastChapterIndex={chapterAmount} theme={theme} />
    </main>;
}

export default ChapterContent;