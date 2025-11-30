import { it } from "node:test";
import { useEffect, useState } from "react";

type props = {
    search: string,
    index: number,
    setLength: (number: number) => void,
    page: string,
    filters: {
        agncyname: boolean,
        setAgncyname: (value: boolean) => void,
        Type: 'All' | 'City' | 'County',
        setType: (value: 'All' | 'City' | 'County') => void,
    },
    setTmpIndex: (n: number) => void,
    setLimit: (n: boolean) => void,
};

function List({ search, index, setLength, page, filters, setTmpIndex, setLimit }: props) {
    const [List, setList] = useState<Array<any> | null>([]);
    useEffect(() => {
        setList(null);
    }, [page]);
    const ClickHandler = (id: string) => {
        window.open(`/dashboard/${page == 'a' ?
            'agencies' :
            'contacts'
            }/${id}`, '_blank');
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/search/${page == 'a' ?
                    'agencies' :
                    'contacts'
                    }?${page == 'a' ?
                        (filters.Type !== 'All' ?
                            `filter=${filters.Type}` :
                            '') :
                        (filters.agncyname ?
                            'filter=agency' :
                            '')
                    }&index=${index}&query=${encodeURIComponent(search)}`);
                const data = await response.json();
                if (!response.ok || response.status === 403) {
                    setLimit(true);
                }
                setList(data.data);
                setLength(data.length);
                setTmpIndex(index);
            } catch (error) {
                console.log("Error fetching agencies:", error);
            }
        }
        fetchData();
    }, [search, index, page, filters.Type, filters.agncyname]);
    const content = (item: any) => {
        type Obj = { first?: string, second?: string, thrid?: string, id?: string };
        const obj: Obj = page == 'a' ? { first: item.name, second: item.state, thrid: item.type, id: item.id }
            : page == 'c' ? { first: item.first_name, second: item.last_name, thrid: item.agency_name ? item.agency_name : 'unknow', id: item.id } : { first: '', second: '', thrid: '', id: item.id };

        return obj;
    }
    const name = () => {
        type Obj = { first?: string, second?: string, thrid?: string };
        const obj: Obj = page == 'a' ? { first: 'Agency Name', second: 'State', thrid: filters.Type !== 'All' ? `Type: ${filters.Type}` : 'Type' }
            : page == 'c' ? { first: 'First Name', second: 'Last Name', thrid: 'Agency' } : { first: '', second: '', thrid: '' };
        return obj;
    }
    return (
        <div className="w-full  max-w-7xl mx-auto flex flex-col gap-2 h-full">
            <div
                key={index}
                className=" px-5 flex items-center"
            >
                <p className="flex-1 text-[18px] text-gray-400 block first_field">
                    {name().first?.trim()}
                </p>

                <p className="flex-1 text-[18px] text-center text-gray-400 block second_field">
                    {name().second?.trim()}
                </p>

                <p className={`flex-1 text-[18px] text-right text-gray-400 block cursor-pointer select-none third_field ${filters.agncyname || filters.Type !== 'All' ? 'text-blue-800' : 'text-gray-500'
                    }`} onClick={() => {
                        if (page == 'a') {
                            const types: Array<'All' | 'City' | 'County'> = ['All', 'City', 'County'];
                            filters.setType(types[types.indexOf(filters.Type) + 1] ?? 'All');
                        }
                        else if (page == 'c') {
                            filters.setAgncyname(!filters.agncyname);
                        }
                    }}>
                    {name().thrid?.trim()}
                </p>
            </div>
            {List?.map((item, index) => (
                <div
                    key={index}
                    className="p-1  overflow-hidden min-h-[40px] px-4 h-fit border border-gray-300 rounded-md flex items-center"
                    onClick={() => ClickHandler(content(item).id || '')}
                >
                    <p className="flex-1 text-16 text-gray-500 block first_field">
                        {content(item).first?.trim().split(' ').slice(0, 3).join(' ')}
                    </p>
                    <p className="flex-1 text-16 text-center text-gray-500 block second_field">
                        {content(item).second?.trim().split(' ').slice(0, 3).join(' ')}
                    </p>
                    <p className="flex-1 text-16 text-right text-gray-500 block third_field">
                        {content(item).thrid?.trim().split(' ').slice(0, 3).join(' ')}
                    </p>
                </div>
            ))
            }
        </div>
    );
}

export default List;