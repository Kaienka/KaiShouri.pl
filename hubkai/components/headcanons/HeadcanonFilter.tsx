'use client'
import Dropdown from "@/components/Dropdown"
import headcanons from "@/dicts/headcanons"

type Props = {
    onFilter: (value :string, filterType?: string) => void;
}

function HeadcanonFilter({ onFilter }:Props) {

    function onSelect(data:string, filter:string) {
        onFilter(data, filter)
    }

    return <section className="p-4 font-mono text-center text-linen-cloud rounded-xl"
    >
        <section className="text-center md:text-left flex flex-col md:flex-row gap-5 justify-center items-center flex-wrap">
            <Dropdown option="Headcanony dla" values={headcanons} onSelect={(e) => onSelect(e, 'character')} />
        </section>
    </section>;
}

export default HeadcanonFilter;