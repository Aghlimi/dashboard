import { useEffect, useState } from "react";



function ContactsList({ search }: { search: string }) {
    const [List, setList] = useState<Array<any>>([]);
    const ClickHandler = (id: string) => {
        window.location.href = `/dashboard/contacts/${id}`;
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/search/contacts?query=${encodeURIComponent(search)}`);
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.log("Error fetching contacts:", error);
            }
        }
        fetchData();
    }, [search]);

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