function NavBar() {
    return (
        <nav className="w-full p-4 flex justify-between items-center max-w-7xl bg-[#54595f] mx-auto">
            <div className="font-bold text-xl tracking-tight text-slate-900">
                <a href="/">
                    <img src="/logo.jpeg" className='w-[50px] rounded-[100em]' alt="Logo" />
                </a>
            </div>
            <h1
                className="text-slate-50 font-bold text-xl shadow-lg"
                style={{
                    fontFamily: "Poppins, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                    fontStyle: "italic",
                }}
            >
                Dashboard Page
            </h1>
        </nav>
    );
}
export default NavBar;