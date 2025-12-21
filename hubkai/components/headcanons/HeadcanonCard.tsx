import { Headcanon } from "@/types/types.api";
import NsfwSvg from "../svg/NsfwSvg";

function Card({ character, content, nsfw }: Headcanon) {
  return (
    <div
      className="bg-plume-wine shadow-plume-wine shadow-sm flex flex-col justify-between
      rounded-lg  min-w-[300px] max-w-[350px] m-2 overflow-hidden"
    >
      <div className="flex flex-row items-center">
        {nsfw && <div className="bg-plume-wine text-red-300 ml-2">
        <NsfwSvg/>
        </div>}
        <h1 className="bg-plume-wine text-linen-cloud p-2 rounded-tl-lg w-full font-bold first-letter:uppercase">
          {character}
        </h1>
      </div>
      <div className="flex justify-center items-center flex-1 bg-third-plum">
        <section className="p-4 text-sm  text-linen-cloud">
          {content}
        </section>
      </div>
    </div>
  );
}

export default Card;
