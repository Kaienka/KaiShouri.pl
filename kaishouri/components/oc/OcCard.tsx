import { OC } from "@/types/types.api";

interface Props {
  oc: OC;
}

function OCCard({ oc }: Props) {
  return (
    <div
      className="bg-plume-wine shadow-plume-wine shadow-sm flex flex-col justify-between
      rounded-lg  min-w-[300px] max-w-[350px] m-2 overflow-hidden"
    >
      <div className="flex flex-col items-center">
        <h1 className="bg-plume-wine text-linen-cloud p-2 rounded-tl-lg w-full font-bold first-letter:uppercase">
          {oc.name} {oc.surname}
        </h1>
        <h1 className="bg-plume-wine text-linen-cloud pb-2 rounded-tl-lg w-full font-bold first-letter:uppercase text-sm">
          {oc.uniwersum}
        </h1>
      </div>
      <div className="flex justify-center items-center flex-1 bg-third-plum flex-col">
        <section className="p-4 text-sm  text-linen-cloud flex-col">
          {oc.age && <p className="text-start"><span className="font-bold">Wiek: </span>{oc.age}</p>}
          {oc.gender && <p className="text-start"><span className="font-bold">Płeć: </span>{oc.gender}</p>}
          {oc.sexuality && <p className="text-start"><span className="font-bold">Seksualność: </span>{oc.sexuality}</p>}
        </section>
        <section className="p-4 text-sm  text-linen-cloud">
          {oc.description}
        </section>
      </div>
    </div>
  );
}

export default OCCard;
