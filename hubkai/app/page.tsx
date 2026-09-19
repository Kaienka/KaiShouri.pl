import AboutPage from "@/components/mainPage/AboutPage";
import AboutContent from "@/components/mainPage/AboutContent";
import AboutMe from "@/components/mainPage/AboutMe";
import Quote from "@/components/mainPage/Quote";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8  font-[family-name:var(--font-geist-sans)] ">
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
      </main>
    </div>
  );
}
