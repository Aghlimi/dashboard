"use client"
import { useState } from "react";



const dashboardPage = () => {
    const [page, setPage] = useState<string>('a');
    return (<div id="container" className="w-full h-[100vh] p-10 bg-[#54595f]">
        <header>
            <a href="/">
                <img src="https://media.licdn.com/dms/image/v2/D4E0BAQGwXWaBd7gVRw/company-logo_200_200/company-logo_200_200/0/1697922914052?e=1765411200&v=beta&t=zRKvb_RI5-a0PaqQ6UM1x2SmSmjyx8GvJSGSJHy2vT4" className="w-[50px] rounded-[100em]" alt="Logo" />
            </a>
        </header>
        <nav className="w-full flex justify-end gap-[20%]">
            <button className="bg-[#757a80] border-0 text-gray-500" onClick={() => setPage('a')}>
                agencies
            </button>
            <button className="bg-[#757a80] border-0" onClick={() => setPage('b')}>
                contacts
            </button>
        </nav>
        <div>
            {page === 'a' && <div>Agencies Page</div>}
            {page === 'b' && <div>Contacts Page</div>}
        </div>
    </div>);
}


export default dashboardPage;