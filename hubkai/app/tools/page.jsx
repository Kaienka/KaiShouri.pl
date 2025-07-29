
function ToolsPage() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center
     min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] "
    >
       iframe here
      <iframe
        width="425"
        height="350"
        src="https://www.openstreetmap.org/export/embed.html?bbox=5.075683593750001%2C47.58393661978137%2C30.454101562500004%2C56.05363501913437&amp;layer=mapnik"
      ></iframe>
      <br />
      <small>
        <a href="https://www.openstreetmap.org/?#map=7/52.019/17.765">
          Wyświetl większą mapę
        </a>
      </small>
    </div>
  );
}

export default ToolsPage;
