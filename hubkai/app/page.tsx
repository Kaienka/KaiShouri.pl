import AboutPage from "@/components/mainPageElements/AboutPage";
import AboutContent from "@/components/mainPageElements/AboutContent";
import AboutMe from "@/components/mainPageElements/AboutMe";
import Quote from "@/components/mainPageElements/Quote";
import LastUpdate from "@/components/LastUpdate";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16  font-[family-name:var(--font-geist-sans)] ">
      <main
        className="flex flex-col gap-[1rem] row-start-2 justify-center items-center w-vw text-center text-xl overflow-clip
      w-12/12 sm:w-8/12 md:w-11/12 lg:w-9/12"
      >
        <h1 className="text-plume-wine dark:text-linen-cloud font-inter text-2xl font-bold">
          Na początku byli Lech, Czech i Rus... oraz ich przyrodni brat,
          Deutschland.
        </h1>
        <Quote />
        <AboutMe />
        <section className="text-plume-wine flex flex-col lg:flex-row w-full justify-between">
          <AboutContent />
          <AboutPage />
        </section>
        <section>
          <LastUpdate />
        </section>
      </main>
    </div>
  );
}
