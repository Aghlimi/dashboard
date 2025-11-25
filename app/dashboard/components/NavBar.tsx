function NavBar() {
    return (
        <nav className="w-full p-4 flex justify-between items-center max-w-7xl bg-[#54595f] mx-auto">
            <div className="font-bold text-xl tracking-tight text-slate-900">
                <a href="/">
                    <img src="/logo.jpeg" className='w-[50px] rounded-[100em]' alt="Logo" />
                </a>
            </div>
            <a href="https://infinitivebyte.io/" target="_blank" className="font-bold">About Us</a>
        </nav>
    );
}
export default NavBar;