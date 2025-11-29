function SearchBar({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
    return (
        <div className="w-full px-4 py-4 flex  items-center max-w-7xl mx-auto ">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-[100%] p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default SearchBar;