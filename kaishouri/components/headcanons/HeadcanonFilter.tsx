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

    return <FilterChip
        label="Headcanony dla"
        options={headcanons}
        value={character}
        onChange={(e) => onSelect(e, 'character')}
    />;
}

export default HeadcanonFilter;