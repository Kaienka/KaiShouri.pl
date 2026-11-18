import AboutPage from "@/components/mainPage/AboutPage";
import AboutContent from "@/components/mainPage/AboutContent";
import AboutMe from "@/components/mainPage/AboutMe";
import Quote from "@/components/mainPage/Quote";

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-8 text-left">
      <main className="flex flex-col gap-4">
        <h1 className="font-mono text-2xl sm:text-[28px] font-semibold leading-snug text-dark-plume dark:text-linen-cloud">
          Na początku byli Lech, Czech i Rus... oraz ich przyrodni brat,
          Deutschland.
        </h1>
        <Quote />
        <AboutMe />
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AboutContent />
          <AboutPage />
        </section>
      </main>
    </div>
  );
}