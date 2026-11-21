import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="flex flex-col gap-4 text-left">
        <div className="font-mono text-8xl sm:text-9xl font-semibold leading-none text-fourth-plum dark:text-third-plum">
          404
        </div>
        <h1 className="font-mono text-2xl sm:text-3xl font-semibold text-dark-plume dark:text-linen-cloud">
          Strona nie istnieje.
        </h1>
        <div className="flex flex-wrap gap-2.5 mt-4">
          <Link
            href="/read"
            className="inline-flex items-center h-12 px-5 rounded-xl font-inter text-[15px] font-semibold transition-colors bg-plume-wine text-linen-cloud hover:bg-dark-plume dark:bg-fourth-plum dark:text-dark-plume dark:hover:bg-nice-light-purple"
          >
            Wszystkie teksty
          </Link>
          <Link
            href="/"
            className="inline-flex items-center h-12 px-5 rounded-xl font-inter text-[15px] font-semibold transition-colors bg-fourth-plum/40 text-plume-wine hover:bg-fourth-plum/70 dark:bg-fourth-plum/20 dark:text-nice-light-purple dark:hover:bg-fourth-plum/35"
          >
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}
