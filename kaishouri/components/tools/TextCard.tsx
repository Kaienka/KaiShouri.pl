import { Text } from "@/types/types.api";


function TextCard({title, children, link}: Text) {
  return (
    <>
      <section className="bg-third-plum m-2 text-linen-cloud rounded font-mono w-full shadow">
        <div className="bg-plume-wine p-2 rounded-t">
        <a href={link} target="_blank" className="font-bold text-lg underline ">{title}</a>
          </div>
          <section className="p-2">
        {children}
            </section>
      </section>
    </>
  );
}

export default TextCard;
