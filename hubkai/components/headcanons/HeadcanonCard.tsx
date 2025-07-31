import NsfwSvg from "../svg/NsfwSvg";

type Props = {
  character: string;
  content: string;
  category: string;
  nsfw: boolean
};

function Card({ character, content, category, nsfw }: Props) {
  return (
    <div
      className="bg-plume-wine shadow-plume-wine shadow-sm flex flex-col justify-between
      rounded-lg  min-w-[300px] max-w-[350px] m-2"
    >
      <div className="flex flex-row items-center">
        {nsfw && <div className="bg-plume-wine text-red-300 ml-2">
        <NsfwSvg/>
        </div>}
        <h1 className="bg-plume-wine text-linen-cloud p-2 rounded-tl-lg w-4/6 font-bold">
          {character}
        </h1>
        <h3 className="w-2/6 bg-fourth-plum p-2 rounded-tr-lg text-plume-wine font-bold truncate">{category}</h3>
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
