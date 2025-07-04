"use client"

import { useState, useEffect } from "react"

function SpotifyFrame({ src }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // temporary solution - wait to iframes to render a bit to avoid flickering
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative max-w-xs w-full h-[352px] rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-violet-200  animate-pulse z-10 rounded-xl" />
      )}
      <iframe
        src={src}
        className={`rounded-xl w-full h-[352px] transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default SpotifyFrame

