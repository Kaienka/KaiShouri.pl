"use client"

import { SpotifyIFrame as Spotify } from "@/types/types.api";
import { useState, useEffect } from "react"

function SpotifyIFrame({ src } : Spotify) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-[152px] rounded-xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-nice-light-purple dark:bg-dark-plume animate-pulse z-10 rounded-xl" />
      )}
      <iframe
        src={src}
        className={`rounded-xl w-full h-[152px] border-0 transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        allowFullScreen={false}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default SpotifyIFrame