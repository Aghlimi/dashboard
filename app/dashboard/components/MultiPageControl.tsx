import React from "react";

type Props = {
    index: number,
    setIndex: (n: number) => void,
    length: number
}

const MultiPageControl = ({ index, setIndex, length }: Props) => {
    const pageSize = Number(process.env.PAGE_SIZE) || 10;
    const totalPages = Math.max(1, Math.floor(length / pageSize));

    return (
        <div className="w-full max-w-7xl mx-auto flex  py-4 justify-between">
            <button className={"px-4 bg-gray-300 rounded mr-2 disabled:opacity-50"} onClick={() => {
                setIndex(index - 1);
            }} disabled={index <= 0}>Prev</button>
            <p>{index+1}/{totalPages}</p>
            <button className="px-4  bg-gray-300 rounded disabled:opacity-50" onClick={() => {
                setIndex(index + 1);
            }} disabled={!(index < totalPages - 1)}>Next</button>
        </div>
    );
}
export default MultiPageControl;