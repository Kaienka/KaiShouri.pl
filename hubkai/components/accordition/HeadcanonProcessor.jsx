import { promises as fs } from 'fs';
import HeadcanonCard from "@/components/headcanons/HeadcanonCard"

export default async function HeadcanonProcessor() {


  const file = await fs.readFile(process.cwd() + '/files/headcanons.json', 'utf8');
  const data = JSON.parse(file);
  const headcanons = data.headcanons

  return (
    <div className="w-full h-full p-4 font-mono text-center  rounded-lg sm:p-8">
      <div className="gap-4 flex flex-wrap justify-center p-8 sm:flex items-stretch">
        {headcanons.map((h) => (
          <HeadcanonCard
            key={h.content}
            character={h.character}
            content={h.content}
            category={h.category}
            nsfw={h.nsfw}
          />
        ))}
      </div>
    </div>
  );
}
