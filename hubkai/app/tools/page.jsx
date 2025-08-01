import ToolSvg from "@/components/svg/ToolSvg";
import TextCard from "@/components/tools/TextCard";

function ToolsPage() {
  return <div
    className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8 flex flex-col items-center">

    <header className="mt-4 flex flex-row justify-center mb-2 items-center">
      <div className="mr-2 text-plume-wine dark:text-linen-cloud">
        <ToolSvg />
      </div>
      <h5 className=" text-3xl font-bold text-plume-wine dark:text-linen-cloud">
        Programy i narzędzia
      </h5>
      <div className="ml-2 text-plume-wine dark:text-linen-cloud">
        <ToolSvg />
      </div>
    </header>

    <main
      className="flex flex-col justify-center items-center w-vw text-center text-base overflow-clip
      w-12/12 sm:w-8/12 md:w-11/12 lg:w-7/12">
      <p className="mb-5  text-base text-plume-wine sm:text-lg dark:text-linen-cloud">
        Jakiś czas temu na moim Instagramie zapytałam obserwujących, czy są zainteresowani małym wpisem na temat programów i narzędzi, których używam. Poniżej znajduje się zaktualizowana wersja tamtego wpisu (2025)
      </p>

      <TextCard title="tak ogólnie">
        <div>
          Obecnie siedzę na Windows 11, używam rozwiązań zarówno płatnych jak i bezpłatnych. Przetestowałam dziesiątki narzędzi, by znaleźć coś dla siebie, więc zachęcam też do szukania na własną rękę narzędzi, które będą wam odpowiadać. Bardzo lubię wypróbowywać nowe programy, sama czasami napiszę sobie jakieś narzędzie, i lubię się dzielić polecajkami :D
        </div>
      </TextCard>

      <TextCard title="Quoll Writer" link="https://quollwriter.com/pl/">
        <p className="p-4">Program, który widzicie w prawie każdym poście na moim Instagramie.
          Jest darmowy i ma polską wersję językową, chociaż niektóre funkcje, jak
          system redaktorów albo sprawdzanie czytelności tekstu będą działać jedynie dla języka angielskiego.
          Po utworzeniu nowego projektu (opcjonalnie chronionego hasłem), możecie dodawać nowe rozdziały, miejsca, sceny itp.
          Program pozwala na sprawdzenie statystyk, ustawianie celów, planu i powiązań dla danego rozdziału.
          Pozwala również na wyeksportowanie rozdziałów do docx, epub, html, pojedynczo lub do jednego pliku,
          a miłym i klimatycznym dodatkiem są dźwięki maszyny do pisania, które można włączyć w opcjach.
          Program jest tworzony przez jednego programistę, Gary'ego Bentleya, jako projekt po godzinach. Nie jest wolny od bugów (autor podkreśla w licencji, by mieć zawsze kopię zapasową swoich plików, do czego i ja zachęcam)
          i nieczęsto ma aktualizacje, ale używam go od kilku lat i nigdy nie sprawił mi dużych problemów. To oprogramowanie open source,
          kod źrodłowy znajduje się na <a className="font-bold" href="https://github.com/garybentley/quollwriter" target="_blank">GitHubie.</a> </p>
        <p className="p-4"> <a href="https://quollwriter.com/pl/" target="_blank" className="font-bold">Quoll Writer</a> pozostaje moim głównym programem, w którym trzymam wszystkie pisane obecnie fanfiki, oraz fragmenty, ścinki czy odrzucone pomysły, które leżą w specjalnym projekcie o nazwie „Cmentarzysko”. Dzięki niemu łatwiej mi organizować dłuższe teksty,
          gdzie oprócz rozdziałów mam też osobne scenki pisane sporo naprzód albo spis pomysłów.</p>
        <p className="p-4">Bardzo przydatną opcją jest automatyczne tworzenie kopii zapasowych. Quoll Writer tworzy je co wyznaczony czas, a ja nastepnie robię sobie kopię zapasową moich plików na dysk zewnętrzny za pomocą FreeFileSync, więc nie boję się o utratę czegokolwiek.</p>
        <p className="p-4">Programem o podobnej, chociaż znacznie rozbudowanej funkcjonalności jest Scrivener, ale to już oprogramowanie płatne (ponad 200 zł), z darmową wersją testową.</p>
      </TextCard>

      <TextCard title="Calmly Writer" link="https://www.calmlywriter.com">
        <p className="p-4">Calmly Writer to program typu „czysta kartka”,  która poza pisaniem oferuje jedynie statystyki i kilka dodatkowych opcji.
          Opiera się na minimalizmie i w założeniu ma posiadać jak najmniej rozpraszaczy, które mogą nas odciągnąć od pracy nad tekstem.
          Calmly Writer ma kilka opcji formatowania, w tym wybór rozmiaru, koloru i kroju fontu, oraz kilka motywów kolorystycznych.
          Oprócz tego oferuje sprawdzanie pisowni (można ustawić język polski) oraz pozwala na ustawienie stylu cudzysłowów.
          Pozostałe opcje pisowni dotyczą głównie języka angielskiego, w którym ten program jest oferowany. Ciekawą opcją jest focus mode,
          który pozwala wyróżnić tylko jeden akapit, nad którym aktualnie pracujemy (pozostałe są wyszarzone). </p>
        <p className="p-4">Lubię Calmly, ale nie używałam go od dłuższego czasu. </p>
        <p className="p-4">Program oferuje darmową wersję online oraz płatną wersję do ściągnięcia, której koszt wynosi około 100 zł (płatność jednorazowa). Ta wersja ma również wersję trial – obecnie bez limitu czasowego, wcześniej wynosił 30 dni. </p>
        <p className="p-4">Podobne programy: ZenPen, FocusWriter.</p>
      </TextCard>

      <TextCard title="Microsoft Word">
        <p className="p-4">Worda chyba nie trzeba przedstawiać. Jako część pakietu Microsoft Office, jest zaawansowanym narzędziem do pisania tekstu. Ma wszystko, co potrzebne: formatowanie, statystyki, możliwości eksportu, opcję redaktora służącą do wykrywania błędów pisowni i gramatyki i wiele, wiele więcej. Napisałam w nim dziesiątki referatów na studia, trzy prace dyplomowe i dużo, dużo więcej, ale w kontekście fanfiction służy mi głównie do ostatecznej korekty oraz formatowania (które i tak Wattpad wyrzuci na śmietnik, ale w tej kwestii akurat jestem perfekcjonistką, tekst ma ładnie wyglądać i tyle). </p>
        <p className="p-4">Word jest oprogramowaniem płatnym, nie można zakupić go poza pakietem Office, a roczny abonament wynosi około 300 zł. Jeśli jesteś uczniem albo studentem, możesz uzyskać darmową licencję na Microsoft Office, o ile twoja szkoła lub uczelnia ją oferuje. Polecam się rozejrzeć, bo Microsoft Office naprawdę ułatwia życie.</p>
        <p className="p-4">Zalecam wyłączyć opcję Copilota w opcjach, by LLM nie miał dostęp do treści (wstaw tu rant na zwalnianie programistów piszących dobre skrypty i zastępowaniu ich LLMami, bo biznes myśli, że to się bardziej opłaca).</p>
        <p className="p-4">Ze względu na politykę Microsoftu i ceny, nie jestem fanką, ale ciężko o tak dobry procesor tekstu. Libre Office jest co prawda alternatywą, ale nie cierpię z niego korzystać, jest bardzo toporny i po prostu brzydki. </p>
      </TextCard>

      <TextCard title="Cold Turkey Writer" link="https://getcoldturkey.com/">
        <p className="p-4">Zasada tego działania jest surowa, ale prosta: nie wyjdziesz z programu, dopóki nie napiszesz ustalonej liczby słów albo nie upłynie określona ilość minut (jest też opcja bardziej litościwa, czyli pisanie bez blokady). Pomaga mi w rozpisaniu się lub przełamaniu blokady pisarskiej, bo świadomość, że to okno będę mieć przed oczami przez kolejny kwadrans, jakoś sprawia, że napiszę z trudem to jedno zdanie, a potem drugie, a potem to już jakoś leci. </p>
        <p className="p-4">
          Program jest w wersji darmowej lub płatnej (60 zł, płatność jednorazowa). Wersja darmowa oferuje główną funkcjonalność, wersja płatna dodatkowo ciemny motyw, możliwość zmiany fontu, soundtrack (burza lub odgłosy kawiarni) i kilka pomniejszych opcji, jak włączenie możliwości kopiowania i wklejania czy wyłączenie możliwości używania backspace (w myśl zasady: pisz, edytować będziesz później). Interfejs programu w języku angielskim.
        </p>
      </TextCard>

      <TextCard title="Workflowy" link="https://workflowy.com/">
        <p className="p-4">
          Aplikacja do notowania, który opiera się na listach i podlistach, z możliwością formatowania tekstu. Każda lista może mieć wiele podlist i każdą z nich można zwijać i rozwijać. Używam WorkFlowy do rozpisywania fabuły oraz do osobistych notatek. Można podkreślać, kolorować, zakreślać itd. Dostęp do notatek mam na każdym urządzeniu, gdyż Workflowy działa w przeglądarce i w aplikacjach na właściwie wszystkcih systemach.
        </p>
        <p className="p-4">Wersja darmowa pozwala na 250 podlist miesięcznie, co według mnie jest wystarczającą ilością oraz 100 MB na pliki, które można w nie wrzucać. Wersja pro oferuje dodatkowe motywy i fonty, nielimitowaną ilość list i plików, które można wrzucić oraz więcej możliwości dzielenia się listami. Wersja pro kosztuje 5 dolarów miesięcznie.</p>
      </TextCard>

      <TextCard title="Google Keep" link="https://keep.google.com">
        <p className="p-4">
          Darmowa aplikacja od Google'a, oparta na idei samoprzylepnych karteczek, które można przypiąć, oznaczyć kolorem albo otagować. Można dołączać zdjęcia oraz pola wyboru do odhaczenia. Dostępne zarówno w wersji przeglądarkowej, jak i mobilnej (Android, iOS) służy mi do zapisywania szybkich notatek lub scenek, jeśli przyjdą mi do głowy poza domem.            </p>
        <p className="p-4">
          Podobne: Notion, Evernote, Microsoft One Note</p>
      </TextCard>

      <TextCard title="Cold Turkey Blocker" link="https://getcoldturkey.com/">
        <p className="p-4">Program tych samych twórców co Cold Turkey Writer, pozwalający w wersji darmowej blokować strony internetowe (a w wersji płatnej również programy zainstalowane na komputerze). </p>
        <p className="p-4">Płatna wersja kosztuje 169 zł i jest to płatność jednorazowa. Blokować można na różne sposoby: na określony czas, do ponownego uruchomienia komputera, na hasło (lub konieczność wpisania długiego, skomplikowanego ciągu znaków, by zwolnić blokadę). Można też blokować w określonych dniach/godzinach. </p>
        <p className="p-4">Po co tego używam? Dla samokontroli – media społecznościowe i nie tylko dość często mnie rozpraszają, a ustawienie blokady pozwala mi skupić się na jednej rzeczy, czy to pisaniu, nauce czy innej pracy. Program w języku angielskim, zalecam ustawianie blokad z rozwagą :)</p>
      </TextCard>

      <TextCard title="Raindrop" link="https://raindrop.io/">
        <p className="p-4">I na koniec mój faworyt, czyli program, bez którego nie wyobrażam sobie już researchu do pisania. Raindrop to aplikacja, która pozwala na zapisywanie linków i grupowanie ich w kolekcjach i grupach, z których każdą można nazwać i oznaczyć odpowiednią ikonką. Pozwala podglądnąć treść zapisanych stron, ma wbudowaną wyszukiwarkę, obsługuje filtry i tagi. Mam 1800 zapisanych linków i bez Raindropa dawno już bym się w tym wszystkim pogubiła. Zapisywanie linka jest banalnie proste – instaluje się wtyczkę do przeglądarki i dwoma kliknięciami zapisuje link tam, gdzie trzeba. Działa online, w wersji bezpłatnej oferuje wszystko, co potrzebne, a wersja płatna ma kilka dodatkowych opcji, takich jak znajdywanie duplikatów czy linków, które się zepsuły.</p>
        <p className="p-4">Podobne: Instapaper, Pocket.</p>
      </TextCard>
    </main>
  </div>

}

export default ToolsPage;
