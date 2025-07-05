import FileProcessor from "@/components/accordition/FileProcessor";

function HeadcanonsPage() {
      return (
    <>
      <div className="w-full h-full p-4 font-mono text-center bg-linen-cloud  rounded-lg sm:p-8 ">
        <h5 className="mb-2 text-3xl font-bold text-plume-wine dark:text-white">
          ✨ Headcanons ✨
        </h5>
        <p className="mb-5 text-base text-gray-800 sm:text-lg dark:text-gray-400">
          ...czyli Kai wytycza ciężką artylerię. Podjęłam się karkołomnego przedsięwzięcia, czyli wyciągnięcia moich headcanonów z mojej chaotycznej głowy i równie chaotycznych fików z ostatniego dziesięciolecia i zebrania ich w jednym miejscu. Nie pytajcie, jak się to udało.
        </p>
        <div className="items-center justify-center space-y-4 p-8 sm:flex sm:flex-wrap sm:space-x-4 rtl:space-x-reverse">
         <FileProcessor />
        </div>
      </div>
    </>
  );

}

export default HeadcanonsPage;