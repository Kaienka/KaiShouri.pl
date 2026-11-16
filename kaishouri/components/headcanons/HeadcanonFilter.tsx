'use client'
import { useState } from "react"
import FilterChip from "@/components/filters/FilterChip"
import headcanons from "@/dicts/headcanons"

type Props = {
    onFilter: (value :string, filterType?: string) => void;
}

function HeadcanonFilter({ onFilter }:Props) {
    const [character, setCharacter] = useState(headcanons[0])

    function onSelect(data:string, filter:string) {
        setCharacter(data)
        onFilter(data, filter)
    }

    return <section className="p-4 font-inter text-left text-dark-plume dark:text-linen-cloud">
        <div className="flex flex-wrap gap-2 justify-center">
            <FilterChip
                label="Headcanony dla"
                options={headcanons}
                value={character}
                onChange={(e) => onSelect(e, 'character')}
            />
        </div>
    </section>;
}

export default HeadcanonFilter;