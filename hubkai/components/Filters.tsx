'use client'
import Dropdown from "@/components/Dropdown"
import SearchBar from "@/components/SearchBar"
import ships from "@/dicts/ships"
import fandoms from "@/dicts/fandoms"
import nsfw from "@/dicts/nsfw"
import types from "@/dicts/types"
import finished from "@/dicts/finished"

type Props = {
    onFilter: (value :string, filterType :string) => void;
}

function Filters({ onFilter }:Props) {

    function onSelect(data:string, filter:string) {
        onFilter(data, filter)
    }

    return <section className="p-4 font-mono text-center text-linen-cloud rounded-xl"
    >
        <section className="text-center md:text-left flex flex-col md:flex-row gap-5 justify-center items-center flex-wrap">
            <SearchBar option="Tytuł" onSelect={(e) => onSelect(e, 'title')} />
            <Dropdown option="Fandom" values={fandoms} onSelect={(e) => onSelect(e, 'fandom')} />
            <Dropdown option="Nsfw" values={nsfw} onSelect={(e) => onSelect(e, 'nsfw')} />
            <Dropdown option="Typ" values={types} onSelect={(e) => onSelect(e, 'type')} />
            <Dropdown option="Główny ship" values={ships} onSelect={(e) => onSelect(e, 'ship')} />
            <Dropdown option="Zakończone" values={finished} onSelect={(e) => onSelect(e, 'finished')} />
        </section>
    </section>;
}

export default Filters;