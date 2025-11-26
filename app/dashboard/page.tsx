"use client"
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import ControlBar from "./components/ControlBar";
import AgenciesList from "./components/AgenciesList";
import ContactsList from "./components/ContactsList";
import UpgradeBanner from "./components/UpgradeBanner";
import MultiPageControl from "./components/MultiPageControl";

const dashboardPage = () => {
    const [page, setPage] = useState<string>('a');
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(0);

    useEffect(() => { setIndex(0) }, [search]);
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
                    page === 'a' && <AgenciesList
                        searchM={{ search }}
                        indexM={{ index }}
                        lengthM={{ length, setLength }} />
                }
                {
                    page === 'b' && <ContactsList
                        searchM={{ search, setSearch }}
                        indexM={{ index, setIndex }}
                        lengthM={{ length, setLength }} />
                }
            </>
        }
        <MultiPageControl
            indexM={{ index, setIndex }}
            lengthM={{ length, setLength }} />
    </div>);
}


export default dashboardPage;