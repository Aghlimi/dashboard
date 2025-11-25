"use client"
import { use, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ControlBar from "./components/ControlBar";
import AgenciesList from "./components/AgenciesList";
import ContactsList from "./components/ContactsList";
import UpgradeBanner from "./components/UpgradeBanner";

const dashboardPage = () => {
    const [page, setPage] = useState<string>('a');
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(false);
    
    useEffect(() => {
        async function fetchLimitStatus() {
            try {
                const response = await fetch('/api/limit');
                const result = await response.json();
                setLimit(result.message !== "Allowed");
                console.log("Limit Status:", limit);
            } catch (error) {
                console.log("Error fetching limit status:", error);
            }
        }
        fetchLimitStatus();
    }, []);
    return (<div className="max-w-7xl mx-auto p-4">
        <NavBar />
        <div className="searchControl flex">
            <SearchBar search={search} setSearch={setSearch} />
            <ControlBar page={page} setPage={setPage} />
        </div>
        {
            limit
            &&
            <UpgradeBanner />
            ||
            <>
                {
                    page === 'a' && <AgenciesList search={search} />
                }
                {
                    page === 'b' && <ContactsList search={search} />
                }
            </>
        }
    </div>);
}


export default dashboardPage;