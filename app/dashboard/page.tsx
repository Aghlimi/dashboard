"use client"
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import List from "./components/List";
import UpgradeBanner from "./components/UpgradeBanner";
import MultiPageControl from "./components/MultiPageControl";
import './page.css';
import LeftMenu from "./components/LeftMenu";

const Profile = () => { return <div>Profile Page</div>; }
const dashboardPage = () => {
    const [page, setPage] = useState<string>('a');
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(true);
    const [index, setIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(0);
    const [agncyname, setAgncyname] = useState<boolean>(false);
    const [Type, setType] = useState<'All' | 'City' | 'County'>('All');

    useEffect(() => { setIndex(0) }, [search, page, Type, agncyname]);

    useEffect(() => {
        async function fetchLimitStatus() {
            try {
                const response = await fetch('/api/limit');
                const result = await response.json();
                setLimit(result.message !== "Allowed");
            } catch (error) {
                console.log("Error fetching limit status:", error);
            }
        }
        fetchLimitStatus();
    }, []);

    return (
        <div className="flex bg-[#f0f0f0] p-4 gap-4 h-screen">
            <div className="w-[200px] h-full bg-white menucontainer rounded-xl shadow-2xl">
                <LeftMenu page={page} setPage={setPage} />
            </div>
            <div className="w-full h-full flex flex-col gap-4 items-center">
                <NavBar search={search} setSearch={setSearch} />
                <div className="bg-white rounded-xl  overflow-y-scroll shadow-2xl h-full w-full flex flex-col justify-between p-4 pb-0">
                    {
                        limit ? <UpgradeBanner />:
                    <>
                    {
                        (page === 'c' || page === 'a') &&
                        <>
                            <List
                                search={search}
                                index={index}
                                setLength={setLength}
                                page={page}
                                filters={{ agncyname, setAgncyname, Type, setType }}
                            />
                            <MultiPageControl
                                index={index}
                                setIndex={setIndex}
                                length={length}
                            />
                        </>
                    }
                    {page === 'p' &&
                        <Profile />
                    }
                    </>
                }
                </div>
            </div>
        </div >
    );
}


export default dashboardPage;