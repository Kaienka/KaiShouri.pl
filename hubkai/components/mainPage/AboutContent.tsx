import ContentSvg from "@/components/svg/ContentSvg";
import LastUpdate from "./LastUpdate";


function AboutContent() {
  return (
    <div className="bg-violet-200 p-6 lg:mr-2 rounded flex-1 mb-4 shadow">
      <div className="flex justify-center items-center mb-4">
        <ContentSvg />
        <h2 className="lg:ml-2 font-mono text-base font-bold">
          Ostatnie aktualizacje
        </h2>
      </div>
      <LastUpdate/>
    </div>
  );
}

export default AboutContent;
