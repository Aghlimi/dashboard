import { UserButton } from "@clerk/nextjs";
import SearchInput from "./SearchInput";



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