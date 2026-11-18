function Quote() {
  return (
    <figure className="relative flex flex-col gap-3 p-6 sm:p-7 pl-14 sm:pl-16 rounded-2xl bg-nice-light-purple dark:bg-dark-plume">
      <span
        aria-hidden="true"
        className="absolute left-4 sm:left-5 top-2 font-mono text-6xl leading-none text-fourth-plum dark:text-third-plum select-none"
      >
        &bdquo;
      </span>
      <blockquote className="font-mono italic text-[15px] leading-[1.75] text-dark-plume dark:text-linen-cloud">
        Czy można wiedzieć, o czym będzie pisana powieść? Czy taka
        uprzednia wiedza nie kwestionuje samej powieści? Wiedzieć, co się chce
        powiedzieć - to czyni powieść zbędną, redukuje ją do roli narzędzia do
        opowiedzenia tego, co już wcześniej znane i przemyślane. Dowiadywać się
        za pomocą pisania powieści, co chce się powiedzieć, wędrować powieścią
        jak po drodze, to dopiero wyzwanie.
      </blockquote>
      <figcaption className="self-end flex items-center gap-2 font-mono text-sm text-third-plum dark:text-fourth-plum">
        <span aria-hidden="true" className="w-6 h-px bg-current" />
        Witt Szostak &ndash; &bdquo;Poniewczasie&rdquo;
      </figcaption>
    </figure>
  );
}

export default Quote;