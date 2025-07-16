import SpotifyFrame from "@/components/SpotifyFrame";
import Announcement from "@/components/Announcement";
import MusicSvg from "@/components/svg/MusicSvg";

function MusicPage() {
  return (
    <>
      <div className="w-full h-full p-4 font-mono text-center bg-linen-cloud  rounded-lg sm:p-8 flex flex-col">
        <header className="flex flex-row justify-center mb-2 items-center">
          <div className="mr-2">
            <MusicSvg/>
          </div>
          <h5 className=" text-3xl font-bold text-plume-wine">
            Posłuchaj ze mną
          </h5>
          <div className="ml-2">
            <MusicSvg/>
          </div>
        </header>

        <p className="mb-5  text-base text-plume-wine sm:text-lg ">
          Moje playlisty stworzone dla fanfików, shipów i postaci.
        </p>
        <Announcement>
          Ze względu na ograniczenia Spotify, playlisty embedded pozwalają na
          odtwarzanie tylko 30 sekund pojedynczego utworu. Mam nadzieję, że w
          niedługim czasie uda mi się znaleźć jakąś darmową alternatywę, by
          udostepnić Wam playlisty bez konieczności posiadania tam konta ;)
        </Announcement>
        <h1 className="text-2xl uppercase text-plume-wine mt-4  p-4 text-bold text-inter">
          Hetalia
        </h1>

        <div className="items-center justify-center align-top p-8 sm:flex sm:flex-wrap sm:space-x-4 rtl:space-x-reverse">
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/3pGnhAVWFWXLtgHetWBqnq?utm_source=generator" />
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/4l8ReFpJObN8mv02fC1UR8?utm_source=generator" />
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/5L4hi9GttZysSDpQW2nmbu?utm_source=generator" />
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/5FczYxKPdUWZbgS0aLL0Ss?utm_source=generator" />
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/3jRX6qugXwMlQ2FrdoGkvO?utm_source=generator" />
        </div>
        <h1 className="text-2xl uppercase text-plume-wine mt-4  p-4 text-bold text-inter ">
          Inne
        </h1>
        <div className="items-center justify-center space-y-4 p-8 sm:flex sm:flex-wrap sm:space-x-4 rtl:space-x-reverse">
          <SpotifyFrame src="https://open.spotify.com/embed/playlist/3jRX6qugXwMlQ2FrdoGkvO?utm_source=generator" />
        </div>
      </div>
    </>
  );
}

export default MusicPage;
