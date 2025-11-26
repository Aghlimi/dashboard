const MultiPageControl = ({
    indexM,
    lengthM
}: {
    indexM: { index: number, setIndex: (number: number) => void },
    lengthM: { length: number, setLength: (number: number) => void }
}) => {
    console.log(lengthM.length, indexM.index, (lengthM.length / 10) - 1);
    return (<div>
        {indexM.index > 0 && <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={() => {
            indexM.setIndex(indexM.index - 1);
        }}>Previous</button>}
        {indexM.index < (lengthM.length / 10) - 1 && <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => {
            indexM.setIndex(indexM.index + 1);
        }}>Next</button>}
    </div>);
}
export default MultiPageControl;