"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  title: string;
  description?: string;
  trackCount?: number;
  thumbnail?: string;
  spotifyUrl?: string;
};

type NowPlaying = {
  title: string;
  author?: string;
};

const YT_ORIGIN = "https://www.youtube-nocookie.com";

function getPlaylistId(url: string) {
  try {
    return new URL(url).searchParams.get("list") ?? url;
  } catch {
    return url;
  }
}

function tracksLabel(n: number) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n === 1) return "utwór";
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return "utwory";
  return "utworów";
}

const PlayIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
  </svg>
);

const PrevIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 5h2v14H6zM9.5 12L19 5v14z" />
  </svg>
);

const NextIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16 5h2v14h-2zM14.5 12L5 19V5z" />
  </svg>
);

const ListIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 6h12M4 12h12M4 18h8M18 14v6l4-3z" />
  </svg>
);

const SpotifyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const coverBase =
  "relative w-full aspect-video rounded-xl overflow-hidden grid place-items-center bg-linear-to-br from-third-plum to-dark-plume";

const bigBtn =
  "relative grid place-items-center w-16 h-16 rounded-full bg-linen-cloud text-plume-wine shadow-sm transition-transform duration-200";

const smallBtn =
  "grid place-items-center w-11 h-11 rounded-full bg-linen-cloud/85 text-plume-wine shadow-sm transition-colors hover:bg-linen-cloud";

const iconLink =
  "grid place-items-center w-9 h-9 rounded-full transition-colors text-third-plum hover:text-plume-wine hover:bg-fourth-plum/40 dark:text-fourth-plum dark:hover:text-linen-cloud dark:hover:bg-white/10";

export default function YoutubePlaylistCard({
  url,
  title,
  description,
  trackCount,
  thumbnail,
  spotifyUrl,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [trackIndex, setTrackIndex] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playlistId = getPlaylistId(url);
  const count = trackCount ? `${trackCount} ${tracksLabel(trackCount)}` : null;

  function send(message: Record<string, unknown>) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ id: 1, channel: "widget", ...message }),
      YT_ORIGIN,
    );
  }

  function command(
    func: "playVideo" | "pauseVideo" | "previousVideo" | "nextVideo",
  ) {
    send({ event: "command", func, args: [] });
  }

  useEffect(() => {
    if (!playing) return;
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      let data;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      const payload = data?.info;
      if (!payload) return;
      if (typeof payload.playerState === "number") {
        setPaused(payload.playerState !== 1 && payload.playerState !== 3);
      }
      if (typeof payload.playlistIndex === "number") {
        setTrackIndex(payload.playlistIndex);
      }
      const video = payload.videoData;
      if (video?.title) {
        setNowPlaying({
          title: video.title,
          author: video.author?.replace(/\s*-\s*Topic$/i, ""),
        });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [playing]);

  const coverLayers = (
    <>
      {thumbnail && (
        <Image
          src={thumbnail}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, 100vw"
          className="object-cover"
        />
      )}
      {count && (
        <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 h-[26px] px-2.5 rounded-full bg-dark-plume/85 text-linen-cloud font-mono text-xs">
          <ListIcon />
          {count}
        </span>
      )}
    </>
  );

  const media = playing ? (
    <div className="flex flex-col gap-2.5">
      <iframe
        ref={iframeRef}
        src={`${YT_ORIGIN}/embed/videoseries?list=${encodeURIComponent(playlistId)}&autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
        title={`Playlista: ${title}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        onLoad={() => send({ event: "listening" })}
        className="w-full aspect-video min-h-[200px] rounded-xl border-0 bg-black hidden"
      />
      <div className={coverBase}>
        {coverLayers}
        <div className="relative flex items-center gap-4">
          <button
            type="button"
            onClick={() => command("previousVideo")}
            aria-label="Poprzedni utwór"
            className={smallBtn}
          >
            <PrevIcon />
          </button>
          <button
            type="button"
            onClick={() => command(paused ? "playVideo" : "pauseVideo")}
            aria-label={paused ? "Odtwórz" : "Pauza"}
            className={`${bigBtn} hover:scale-105`}
          >
            {paused ? <PlayIcon size={22} /> : <PauseIcon size={22} />}
          </button>
          <button
            type="button"
            onClick={() => command("nextVideo")}
            aria-label="Następny utwór"
            className={smallBtn}
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Odtwórz playlistę ${title}`}
      className={`group ${coverBase}`}
    >
      {coverLayers}
      <span className={`${bigBtn} group-hover:scale-105`}>
        <PlayIcon size={22} />
      </span>
    </button>
  );

  const info = (
    <div className="flex-1 min-w-0 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-semibold tracking-[0.08em] text-third-plum dark:text-fourth-plum">
          PLAYLISTA · YOUTUBE
        </span>
        <div className="shrink-0 flex items-center gap-1 -my-2">
          <a
            href={`https://www.youtube.com/playlist?list=${encodeURIComponent(playlistId)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} na YouTube`}
            title="Otwórz na YouTube"
            className={iconLink}
          >
            <YoutubeIcon />
          </a>
          {spotifyUrl && (
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} na Spotify`}
              title="Posłuchaj na Spotify"
              className={iconLink}
            >
              <SpotifyIcon />
            </a>
          )}
        </div>
      </div>
      <h3 className="font-mono text-xl lg:text-[22px] font-semibold leading-snug">
        {title}
      </h3>
      {description && (
        <p className="font-inter text-sm leading-relaxed">{description}</p>
      )}
      <span className="font-mono text-[13px] text-third-plum dark:text-fourth-plum">
        {count ? `${count} · Kai` : "Kai"}
      </span>
      {playing && nowPlaying && (
        <div className="mt-3 flex flex-col gap-1" aria-live="polite">
          <span className="font-mono text-xs font-semibold tracking-[0.08em] text-third-plum dark:text-fourth-plum">
            TERAZ GRA
            {trackIndex !== null && trackCount
              ? ` · ${trackIndex + 1}/${trackCount}`
              : ""}
          </span>
          <span className="font-inter text-[15px] font-semibold leading-snug">
            {nowPlaying.title}
          </span>
          {nowPlaying.author && (
            <span className="font-inter text-sm text-third-plum dark:text-fourth-plum">
              {nowPlaying.author}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="col-span-full p-3.5 lg:p-5 rounded-2xl bg-nice-light-purple text-dark-plume dark:bg-dark-plume dark:text-linen-cloud">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center lg:gap-6">
        <div className="w-full lg:w-[360px] lg:shrink-0">{media}</div>
        <div className="flex flex-1 min-w-0">{info}</div>
      </div>
    </div>
  );
}
