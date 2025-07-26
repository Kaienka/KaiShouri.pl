
async function Read({params}) {
    const {fic, index} = await params;
    return (<p>reaad {index} rozdział {fic}</p>);
}

export default Read;