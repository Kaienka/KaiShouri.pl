"use client";

import { OC } from "@/types/types.api";
import OCCard from "./OcCard";

interface Props {
  oc: OC[];
}

function OCWrapper({ oc }: Props) {
  return (
    <>
          <div
            key={oc.length}
            className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch"
          >
            {oc.map(c => (
              <OCCard
                oc={c}
                key={c.name}
              />
            ))}
          </div>
    </>
  )
}


export default OCWrapper;
