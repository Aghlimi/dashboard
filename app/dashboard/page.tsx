"use client"
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import List from "./components/List";
import UpgradeBanner from "./components/UpgradeBanner";
import MultiPageControl from "./components/MultiPageControl";
import './page.css';
import LeftMenu from "./components/LeftMenu";
import Profile from "./components/Profile";


const dashboardPage = () => {
    const [page, setPage] = useState<string>('a');
    const [search, setSearch] = useState<string>('');
    const [limit, setLimit] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [length, setLength] = useState<number>(0);
    const [agncyname, setAgncyname] = useState<boolean>(false);
    const [tmpIndex, setTmpIndex] = useState<number>(0);
    const [Type, setType] = useState<'All' | 'City' | 'County'>('All');

    useEffect(() => { setIndex(0) ,setTmpIndex(0)}, [search, page, Type, agncyname]);
    

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
    }, [page]);

    return (
        <div className="flex bg-blue-100  p-4 gap-4 h-screen">
            <img className="absolute w-5 h-5 menu-button" src="/menu.jpeg" alt="menu" onClick={() => {
                const k = document.querySelector('.menucontainer');
                if (k instanceof HTMLElement) {
                    if (k.style.visibility === 'hidden' || k.style.visibility === '') {
                        k.style.visibility = 'visible';
                    }
                    else {
                        k.style.visibility = 'hidden';
                    }
                }
            }} />
            <LeftMenu page={page} setPage={setPage} />
            <div className="w-full h-full flex flex-col  gap-4 items-center">
                <NavBar search={search} setSearch={setSearch} />
                <div className="bg-white rounded-xl  overflow-y-scroll shadow-2xl h-full w-full flex flex-col justify-between p-4 pb-0 pt-2">
                    {
                        (limit && page === 'c')  ? <UpgradeBanner /> :
                            <>
                                {
                                    (page === 'c' || page === 'a') ?
                                        <>
                                            <List
                                                search={search}
                                                index={index}
                                                setLength={setLength}
                                                page={page}
                                                filters={{ agncyname, setAgncyname, Type, setType }}
                                                setTmpIndex={setTmpIndex}
                                            />
                                            <MultiPageControl
                                                index={index}
                                                setIndex={setIndex}
                                                length={length}
                                                setTmpIndex={setTmpIndex}
                                                tmpIndex={tmpIndex}

                                            />
                                        </> : null
                                }
                                {page === 'p' ?
                                    <Profile />
                                    : null
                                }
                            </>
                    }
                </div>
            </div>
        </div >
    );
}


export default dashboardPage;