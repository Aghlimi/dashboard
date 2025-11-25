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

    }, []);
    return (<>
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
    </>);
}


export default dashboardPage;