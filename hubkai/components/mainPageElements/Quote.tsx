function Quote() {
  return (
    <section className="flex flex-col w-full sm:text-base p-4 border rounded shadow text-plume-wine dark:text-linen-cloud font-mono">
      <blockquote>
        &quot;Czy można wiedzieć, o czym będzie pisana powieść? Czy taka
        uprzednia wiedza nie kwestionuje samej powieści? Wiedzieć, co się chce
        powiedzieć - to czyni powieść zbędną, redukuje ją do roli narzędzia do
        opowiedzenia tego, co już wcześniej znane i przemyślane. Dowiadywać się
        za pomocą pisania powieści, co chce się powiedzieć, wędrować powieścią
        jak po drodze, to dopiero wyzwanie.
      </blockquote>
      <p className="text-right p-2">
        Witt Szostak &ndash; &bdquo;Poniewczasie&rdquo;
      </p>
    </section>
  );
}

export default Quote;
