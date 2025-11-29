"use client"
import { useState, useEffect } from "react";
import '../../../globals.css';

type AgencyData = {
    id: string;
    name: string | null;
    state: string | null;
    state_code: string | null;
    type: string | null;
    population: number | null;
    website: string | null;
    total_schools: string | null;
    total_students: string | null;
    mailing_address: string | null;
    grade_span: string | null;
    locale: string | null;
    csa_cbsa: string | null;
    domain_name: string | null;
    physical_address: string | null;
    phone: string | null;
    status: string | null;
    student_teacher_ratio: string | null;
    supervisory_union: string | null;
    county: string | null;
    created_at: string | null;
    updated_at: string;
};

export default function AgencyPage({ params }: any) {
    const [agencyData, setAgencyData] = useState<AgencyData | null|'notfound'>(null);
    useEffect(() => {
        async function fetchAgencyData() {
            const { id } = await params;
            try {
                const response = await fetch(`/api/search/agencies/${id}`);
                if (!response.ok) {
                    setAgencyData('notfound');
                    return;
                }
                const result = await response.json();
                setAgencyData(result);
            } catch (error) {
                console.log("Error fetching agency data:", error);
            }
        }
        fetchAgencyData();
    }, []);
    const data = new Array<any>();
    for (let a in agencyData as any) {
        if (a == 'id' || a == 'created_at' || a == 'updated_at' || (agencyData as any)[a as keyof AgencyData] === null || (agencyData as any)[a as keyof AgencyData] === undefined || (agencyData as any)[a as keyof AgencyData] === '') continue;
        data.push({ key: a, value: (agencyData as any)[a] });
    }
    console.log("agencyData", data);
    return (<div className="max-w-7xl mx-auto p-4">
        {/* <button onClick={() => window.location.href = '/dashboard'} className="mb-4 px-4 py-2 bg-gray-300 rounded">Back</button> */}
        {agencyData === 'notfound' && <p>Agency not found.</p>}
        {
            agencyData && agencyData !== 'notfound' ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">details that we have about <em>{agencyData?.name}</em></h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.map((item, index) => (
                            <div key={index} className="datacontainer p-4 border border-gray-300 rounded-md flex justify-between "
                                onClick={(e: any) => {
                                    if (item.key == 'website' && agencyData?.id) {
                                        window.open(agencyData.website as string, '_blank');
                                    }
                                }}
                            >
                                <h3 className="text-lg font-semibold">{item.key}</h3>
                                <p className="text-black">{item.value !== null ? item.value.toString() : 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </>
            ) : null
        }
    </div>);
};

