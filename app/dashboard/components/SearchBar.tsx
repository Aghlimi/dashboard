function SearchBar({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
    return (
        <div className="w-full px-4 py-4 flex  items-center max-w-7xl mx-auto bg-[#54595f]">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full max-w-md p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default SearchBar;