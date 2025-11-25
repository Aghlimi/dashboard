function ControlBar({ page, setPage }: { page: string, setPage: (page: string) => void }) {
    return (
        <div className="w-full px-4 flex justify-end items-center gap-4 max-w-7xl mx-auto bg-[#54595f]">
            <button
                className={`px-3  rounded-[100] font-medium ${page === 'a' ? 'bg-[#4285F4] text-white' : 'bg-white text-[#6C757D] hover:bg-[#7d858d] hover:text-white'}`}
                onClick={() => setPage('a')}
            >
                agencies
            </button>
            <button
                className={`px-3 rounded-[100] font-medium ${page === 'b' ? 'bg-[#4285F4] text-white' : 'bg-white text-[#6C757D] hover:bg-[#7d858d] hover:text-white'}`}
                onClick={() => setPage('b')}
            >
                contacts
            </button>
        </div>
    );
}

export default ControlBar;