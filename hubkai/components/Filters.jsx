'use client'
import Dropdown from "@/components/Dropdown"

const fandomValues = ['wszystko', 'Hetalia', 'Genshin Impact', 'Voltron Legendary Defender', 'Tsubasa Reservoir Chronicle', 'światy oryginalne']
const nsfwValues = ['wszystko', 'nie', 'tak']
const typeValues = ['wszystko', 'one-shot', 'wielorozdziałowiec']
const shipValues = ['wszystko', 'brak shipu', 'Polska x Litwa', 'Polska x Prusy', 'Polska x Litwa x Prusy',
    'Wriothesley x Neuvillette', 'różności', 'Polska x Francja', 'Zhongli x Childe', 'Litwa x Prusy',
    'Polska x Ukraina', 'Polska x Saksonia', 'Litwa x Białoruś', 'Kaeya x Dainsleif', 'Kazuha x OC']
const finishedValues = ['wszystko', 'zakończone', 'trwające']

function Filters({ onFilter }) {

    function onSelect(data, filter) {
        onFilter(data, filter)
    }

    return <section className="p-4 font-mono text-center text-linen-cloud rounded-xl"
    >
            <section className="text-center md:text-left flex flex-col md:flex-row gap-5 justify-center items-center flex-wrap">
                <Dropdown option="Fandom" values={fandomValues} onSelect={(e) => onSelect(e, 'fandom')} />
                <Dropdown option="Nsfw" values={nsfwValues} onSelect={(e) => onSelect(e, 'nsfw')} />
                <Dropdown option="Typ" values={typeValues} onSelect={(e) => onSelect(e, 'type')} />
                <Dropdown option="Główny ship" values={shipValues} onSelect={(e) => onSelect(e, 'ship')} />
                <Dropdown option="Zakończone" values={finishedValues} onSelect={(e) => onSelect(e, 'finished')} />
            </section>
    </section>;
}

export default Filters;