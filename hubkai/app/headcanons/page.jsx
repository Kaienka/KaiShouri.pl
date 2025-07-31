import HeadcanonProcessor from "@/components/accordition/HeadcanonProcessor";
import IdeaSvg from "@/components/svg/IdeaSvg";

function HeadcanonsPage() {
  return (
    <>
      <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8 ">
        <header className="flex flex-row justify-center mb-2 items-center">
          <div className="mr-2">
            <IdeaSvg />
          </div>
          <h5 className=" text-3xl font-bold text-plume-wine dark:text-linen-cloud">
            Headcanons
          </h5>
          <div className="ml-2 text-plume-wine dark:text-linen-cloud">
            <IdeaSvg />
          </div>
        </header>

        <div className="flex items-center justify-center mb-2">
          <p className="mb-5 text-base w-4/6 lg:w-3/6 text-plume-wine sm:text-lg dark:text-linen-cloud">
            ...czyli Kai wytycza ciężką artylerię. Podjęłam się karkołomnego
            przedsięwzięcia, czyli wyciągnięcia moich headcanonów z mojej
            chaotycznej głowy i równie chaotycznych fików z ostatniego
            dziesięciolecia i zebrania ich w jednym miejscu. Nie pytajcie, jak
            się to udało.
          </p>
        </div>
        <div className="items-center justify-center space-y-4 p-8 sm:flex sm:flex-wrap sm:space-x-4 rtl:space-x-reverse">
          <HeadcanonProcessor />
        </div>
      </div>
    </>
  );
}

export default HeadcanonsPage;
