import { SignOutButton, useClerk } from "@clerk/nextjs";


export default function LeftMenu({ page, setPage }: any) {
    const { signOut } = useClerk();
    return (
        <div className="w-[200px] menucontainer h-full gap-3 text-black flex  flex-col">
            <img src="/Dashboard.png" alt="Dashboard Image" className="w-full h-auto px-2" onClick={()=>{
                window.location.href = '/';
            }} />
            <div className="flex flex-col justify-between h-full bg-white rounded-xl shadow-2xl overflow-hidden">
                <ul className="flex flex-col justify-between ">
                    <li className={`p-3 flex pl-4 hover:bg-gray-200 text-gray-600 text-[18px] cursor-pointer ${page === 'a' ? 'bg-gray-300' : ''}`} onClick={() => setPage('a')}>Agencies</li>
                    <li className={`p-3 flex pl-4 hover:bg-gray-200 text-gray-600 text-[18px] cursor-pointer ${page === 'c' ? 'bg-gray-300' : ''}`} onClick={() => setPage('c')}>Contacts</li>
                    <li className={`p-3 flex pl-4 hover:bg-gray-200 text-gray-600 text-[18px] cursor-pointer ${page === 'p' ? 'bg-gray-300' : ''}`} onClick={() => setPage('p')}>Profile</li>
                </ul>
                <ul>
                    <li className="p-4 flex justify-center items-center w-full hover:bg-gray-200 text-red-500 cursor-pointer"
                        onClick={() => { signOut() }}
                        >Logout</li>
                </ul>
            </div>
        </div>
    );
}