import { useRef } from "react";

const SearchInput = ({ search, setSearch }: any) => {
    const ref = useRef<HTMLInputElement>(null);
    const click = () => {
        ref.current?.focus();
    }
    return (
        <div className="flex items-center gap-2  rounded-full px-2 " onClick={click}>
            <img src="/search.png" width={'20px'} alt="" onClick={click} />
            <input type="text" placeholder="Search..." ref={ref} value={search} onChange={(e) => setSearch(e.target.value)}
                className="focus:outline-none" />
        </div>
    );
}
export default SearchInput;