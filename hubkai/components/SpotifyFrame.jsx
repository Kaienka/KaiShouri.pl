"use client"

import { useState, useEffect } from "react"

function SpotifyFrame({ src }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative max-w-xs m-2 w-full h-[22rem] rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-violet-200 animate-pulse z-10 rounded-xl" />
      )}
      <iframe
        src={src}
        className={`rounded-xl w-full h-[22rem] transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        frameBorder="0"
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default SpotifyFrame

