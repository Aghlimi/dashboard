import React from "react";

type Props = {
    index: number,
    setIndex: (n: number) => void,
    length: number,
    tmpIndex: number,
    setTmpIndex: (n: number) => void,
}

const MultiPageControl = ({ index, setIndex, length, tmpIndex, setTmpIndex }: Props) => {
    const pageSize = Number(process.env.PAGE_SIZE) || 10;
    const totalPages = Math.max(1, Math.floor(length / pageSize));
    return (
        <div className="w-full max-w-7xl mx-auto flex  py-4 justify-between">
            <button className={"px-4 bg-gray-300 rounded mr-2 disabled:opacity-50"} onClick={() => {
                setIndex(index - 1);
            }} disabled={tmpIndex <= 0 || index <= 0}>Prev</button>
            <p>{tmpIndex + 1}/{totalPages || 1}</p>
            <button className="px-4  bg-gray-300 rounded disabled:opacity-50" onClick={() => {
                setIndex(index + 1);
            }} disabled={!(tmpIndex < totalPages - 1)}>Next</button>
        </div>
    );
}
export default MultiPageControl;