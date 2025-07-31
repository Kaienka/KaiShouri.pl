
type Props = {
    title: string,
    children: React.ReactNode
}

function TextCard({title, children}: Props) {
  return (
    <>
     {title && (<h1 className="font-mono font-bold uppercase bg-fourth-plum p-2 rounded mt-6">
        {title}
      </h1>)} 
      <section className="bg-third-plum p-6 m-2 text-linen-cloud rounded font-mono w-full shadow">
        {children}
      </section>
    </>
  );
}

export default TextCard;
