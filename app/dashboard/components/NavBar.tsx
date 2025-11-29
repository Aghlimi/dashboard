import { UserButton } from "@clerk/nextjs";
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

function NavBar({ search, setSearch }: any) {
    return (
        <nav className="w-full p-3 NavBar bg-white  rounded-xl shadow-xl flex justify-between">
            <SearchInput search={search} setSearch={setSearch}  />
            <div className="flex">
            <UserButton afterSignOutUrl="/" />
            </div>
        </nav>
    );
}
export default NavBar;