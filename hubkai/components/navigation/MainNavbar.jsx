import NavDivider from "@/components/navigation/NavDivider";
import NavigationLink from "@/components/navigation/NavigationLink";
import NavigationA from "@/components/navigation/NavigationA";
import ReadSvg from "@/components/svg/ReadSvg";
import ToolSvg from "@/components/svg/ToolSvg";
import PlaySvg from "@/components/svg/PlaySvg";
import IdeaFilledSvg from "@/components/svg/IdeaFilledSvg";
import CoffeeSvg from "@/components/svg/CoffeeSvg";
import MapSvg from "@/components/svg/MapSvg";

function MainNavbar() {
  return (
    <nav className="flex flex-col gap-1 p-2 font-mono text-base font-normal text-linen-cloud">
      <NavigationLink href="/read" title="Czytaj">
        <ReadSvg />
      </NavigationLink>
      <NavigationLink href="/tools" title="Narzędzia">
        <ToolSvg />
      </NavigationLink>

      <NavigationLink href="/music" title="Playlisty">
        <PlaySvg />
      </NavigationLink>

      <NavigationLink href="/headcanons" title="Headcanony">
        <IdeaFilledSvg />
      </NavigationLink>

      <NavDivider title="poza stroną" />

      <NavigationA
        href="https://ko-fi.com/kaishouri"
        title="Ko-Fi"
        desc="Tipy kawowe zawsze mile widziane :)"
      >
        <CoffeeSvg />
      </NavigationA>

      {/*       <NavigationLink
        href="https://barwinek.vercel.app/"
        title="Barwinek"
        desc="narzędzie do sprawdzania statystyk na Wattpadzie"
      >
        <StatsSvg />
      </NavigationLink> */}

      <NavigationA
        href="https://kaishouri.github.io/"
        title="Mapa imperium"
        desc='Interaktywna mapa kraju z "Polowania na łabędzia"'
        target="_blank"
      >
        <MapSvg />
      </NavigationA>
    </nav>
  );
}

export default MainNavbar;
