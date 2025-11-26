import { useEffect, useState } from "react";
function AgenciesList({ search }: { search: string }) {
    const [List, setList] = useState<Array<any>>([]);

    const ClickHandler = (id: string) => {
        window.open(`/dashboard/agencies/${id}`, '_blank');
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/search/agencies?query=${encodeURIComponent(search)}`);
                const data = await response.json();
                setList(data);
            } catch (error) {
                console.log("Error fetching agencies:", error);
            }
        }
        fetchData();
    }, [search]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            {
                List.map((item, index) => (
                    <div key={index} className="p-4 mb-4 border border-gray-300 rounded-md" onClick={() => ClickHandler(item.id)}>
                        <h3 className="text-lg font-bold">{item.name}</h3>
                    </div>
                ))
            }
        </div>
    );
}

export default AgenciesList;