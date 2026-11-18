import SpotifyIFrame from "@/components/music/SpotifyIFrame";
import Info from "@/components/music/Info";
import MusicSvg from "@/components/svg/MusicSvg";

function MusicPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-24 text-left text-dark-plume dark:text-linen-cloud">
      <header className="flex flex-row items-center gap-3">
        <div className="text-third-plum dark:text-fourth-plum">
          <MusicSvg />
        </div>
        <h1 className="font-mono text-3xl sm:text-4xl font-semibold">
          Posłuchaj ze mną
        </h1>
      </header>

      <p className="mt-4 font-inter text-base sm:text-[17px] leading-relaxed">
        Moje playlisty stworzone dla fanfików, shipów i postaci.
      </p>

      <div className="mt-4">
        <Info>
          Ze względu na ograniczenia Spotify, playlisty embedded pozwalają na
          odtwarzanie tylko 30 sekund pojedynczego utworu. Mam nadzieję, że w
          niedługim czasie uda mi się znaleźć jakąś darmową alternatywę, by
          udostepnić Wam playlisty bez konieczności posiadania tam konta ;)
        </Info>
      </div>

      <h2 className="mt-10 mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-third-plum dark:text-fourth-plum">
        Hetalia
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpotifyIFrame src="https://open.spotify.com/embed/playlist/3pGnhAVWFWXLtgHetWBqnq?utm_source=generator" />
        <SpotifyIFrame src="https://open.spotify.com/embed/playlist/4l8ReFpJObN8mv02fC1UR8?utm_source=generator" />
        <SpotifyIFrame src="https://open.spotify.com/embed/playlist/5L4hi9GttZysSDpQW2nmbu?utm_source=generator" />
        <SpotifyIFrame src="https://open.spotify.com/embed/playlist/5FczYxKPdUWZbgS0aLL0Ss?utm_source=generator" />
      </div>

      <h2 className="mt-10 mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-third-plum dark:text-fourth-plum">
        Inne
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpotifyIFrame src="https://open.spotify.com/embed/playlist/3jRX6qugXwMlQ2FrdoGkvO?utm_source=generator" />
      </div>
    </div>
  );
}

export default MusicPage;