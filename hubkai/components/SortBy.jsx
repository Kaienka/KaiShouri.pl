import Dropdown from "@/components/Dropdown"


const sortValues = ['Najnowsze', 'Najstarsze', 'Najdłuższe', 'Najkrótsze']

function SortBy({ onSort }) {

    return <section className="p-4 font-mono text-center text-linen-cloud rounded-xl"
    >
        <div className="flex-col">
            <section className="text-left flex flex-row gap-5 justify-center">
                <Dropdown option="Sortuj" values={sortValues} onSelect={onSort} />
            </section>
        </div>
    </section>;
}

export default SortBy;