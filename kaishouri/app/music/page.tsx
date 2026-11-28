import MusicSvg from "@/components/svg/MusicSvg";
import YoutubePlaylistCard from "@/components/music/YoutubePlaylistCard";

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

      <h2 className="mt-10 mb-4 font-mono text-sm font-semibold uppercase tracking-widest text-third-plum dark:text-fourth-plum">
        Hetalia
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <YoutubePlaylistCard
          url="https://youtube.com/playlist?list=PLAC86DoRca0Q&si=UUFbae1iVt2H3QyH"
          title="Latawiec"
          description="
Z każdą kolejną porażką Feliks utwierdza się w przekonaniu, że matczyne życzenie pomyślności, zaklęte w jego imieniu, działa całkiem na odwrót. Gdy wszystko idzie źle, mężczyzna powraca do rodzinnego miasteczka, chcąc odzyskać spokój ducha. Zamiast niego znajduje wystraszonego chłopca kochającego latawce, jego starszego brata o dość trudnym charakterze i niepokojące plakaty na niedawno odbudowanych kamienicach... Human AU."
          trackCount={17}
          thumbnail="/playlists/latawiec.png"
          spotifyUrl="https://open.spotify.com/playlist/4l8ReFpJObN8mv02fC1UR8?si=c4c4d848ae814069"
        />
        <YoutubePlaylistCard
          url="https://www.youtube.com/playlist?list=PLGOQRSmYAK1Y"
          title="Polowanie na łabędzia"
          description="Historia alternatywna, rok 2019. Rzesza wygrała. Personifikacje podbitych narodów wyczekują już śmierci, rozsiane po imperium pracują, by wypełnić jakoś swoje dni i mieć na chleb. Litwa pracuje jako nauczyciel muzyki, nosi żałobę i zastanawia się, kiedy nadejdzie koniec. Tymczasem w ogólnoniemieckiej sieci, Netzwerku, znikąd pojawia się niejaki Schwäne i zaczyna wysyłać wiadomości, a Litwa nabiera podejrzeń co do jego prawdziwej tożsamości..."
          trackCount={57}
          thumbnail="/playlists/polowanie.png"
          spotifyUrl="https://open.spotify.com/embed/playlist/3pGnhAVWFWXLtgHetWBqnq"
        />
        <YoutubePlaylistCard
          url="https://www.youtube.com/playlist?list=PLASxKEXSk_Yk"
          title="Paragraf 175"
          description="Przegrywali, a jego brat leżał ciężko chory. Schwytali Łukasiewicza, ale drań był zbyt uparty, by się ugiąć tak, by można było chełpić się złapaniem. Gdy Ludwig odwiedził Feliksa w celi i dowiedział się, że Gilbert jest zagrożony przez Paragraf 175, podjął najtrudniejszą decyzję życia. Nie żałował. Kochając tylko brata, był gotów zrobić wszystko. Nawet zdradzić Rzeszę."
          trackCount={65}
          thumbnail="/playlists/paragraf.png"
          spotifyUrl="https://open.spotify.com/playlist/5L4hi9GttZysSDpQW2nmbu?si=-aP2TizORmSBBjTkK33TUQ"
        />
               <YoutubePlaylistCard
          url="https://youtube.com/playlist?list=PLWVe4SHUhp80&si=2pCVYUVhPOJb5-hP"
          title="Pahonia & Vytis"
          description="LietBela"
          trackCount={27}
          thumbnail="/playlists/lietbela.png"
          spotifyUrl="https://open.spotify.com/embed/playlist/5FczYxKPdUWZbgS0aLL0Ss?utm_source=generator"
        /> 
      </div>
    </div>
  );
}

export default MusicPage;
