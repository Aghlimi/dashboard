"use client"
import { useState, useEffect } from "react";
import '../../../globals.css';
type Contact = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    title: string | null;
    email_type: string | null;
    contact_form_url: string | null;
    created_at: string | null;
    updated_at: string | null;
    agency_id: string | null;
    firm_id: string | null;
    department: string | null;
};

export default function ContactPage({ params }: any) {
    const [contactData, setContactData] = useState<Contact | null | 'notfound'>(null);
    useEffect(() => {
        async function fetchContactData() {
            const { id } = await params;
            try {
                const response = await fetch(`/api/search/contacts/${id}`);
                if (!response.ok) {
                    setContactData(null);
                    return;
                }
                const result = await response.json();
                setContactData(result);
            } catch (error) {
                console.log("Error fetching contact data:", error);
            }
        }
        fetchContactData();
    }, []);
    const data = new Array<any>();
    if (contactData && contactData !== 'notfound') {
        for (let a in contactData as any) {
            if (a == 'agency_id' || a == 'id' || a == 'created_at' || a == 'updated_at' || contactData[a as keyof Contact] === null || contactData[a as keyof Contact] === undefined || contactData[a as keyof Contact] === '') continue;
            data.push({ key: a, value: contactData[a as keyof Contact] });
        }
    }
    return (<div className="max-w-7xl mx-auto p-4">
        <button onClick={() => window.history.back()} className="mb-4 px-4 py-2 bg-gray-300 rounded">Back</button>
        {contactData === 'notfound' && <p>Contact not found.</p>}

        {contactData && contactData !== 'notfound' ? (
            <>
                <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.map((item, index) => (
                        <div key={index} className="datacontainer p-4 border border-gray-300 rounded-md flex justify-between  "
                            onClick={(e: any) => {

                                if (item.key == 'agency_name' && contactData.agency_id) {
                                    window.open(`/dashboard/agencies/${contactData.agency_id}`);
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

