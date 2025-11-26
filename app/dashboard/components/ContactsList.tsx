import { useEffect, useState } from "react";

function ContactsList({ searchM, indexM, lengthM }: { searchM: { search: string, setSearch: (search: string) => void }, indexM: { index: number, setIndex: (number: number) => void }, lengthM: { length: number, setLength: (number: number) => void } }) {
    const { search } = searchM;
    const { index } = indexM;
    const { length, setLength } = lengthM;
    const [List, setList] = useState<Array<any>>([]);
    const ClickHandler = (id: string) => {
        window.open(`/dashboard/contacts/${id}`, '_blank');
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/search/contacts?index=${index}&query=${encodeURIComponent(search)}`);
                const data = await response.json();
                setList(data.data);
                setLength(data.length);
            } catch (error) {
                console.log("Error fetching contacts:", error);
            }
        }
        fetchData();
    }, [search,index,length]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {
                List.map((item, index) => (
                    <div key={index} className="p-4 mb-4 border border-gray-300 rounded-md" onClick={(e: any) => {
                        ClickHandler(item.id);
                    }}>
                        <h3 className="text-lg font-bold">{item.first_name} {item.last_name}</h3>
                    </div>
                ))
            }
        </div>
    );
}

export default ContactsList;