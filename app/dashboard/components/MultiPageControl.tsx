import { use, useRef } from "react";

type Props = {
    index: number,
    setIndex: (number: number) => void,
    length: number
}

const MultiPageControl = ({ index, setIndex, length }: Props) => {
    return (
        <div className="w-full max-w-7xl mx-auto flex  py-4 justify-between">
            <button className={"px-4 bg-gray-300 rounded mr-2 disabled:opacity-50"} onClick={() => {
                setIndex(index - 1);
            }} disabled={index <= 0}>Prev</button>
            <button className="px-4  bg-gray-300 rounded " onClick={() => {
                setIndex(index + 1);
            }} disabled={!(index < (length / 10) - 1)}>Next</button>
        </div>
    );
}
export default MultiPageControl;