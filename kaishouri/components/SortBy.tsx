import Dropdown from "@/components/Dropdown"
import sort from "@/dicts/sort"

type Props = {
    onSort: (value:string) => void
}

function SortBy({ onSort }:Props) {

    return <section className="font-mono text-center text-linen-cloud rounded-xl"
    >
        <div className="flex-col">
            <section className="text-left flex flex-row justify-center">
                <Dropdown option="Sortuj" values={sort} onSelect={onSort} />
            </section>
        </div>
    </section>;
}

export default SortBy;