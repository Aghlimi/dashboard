import { SignOutButton, useClerk } from "@clerk/nextjs";


export default function LeftMenu({ page, setPage }: any) {
    const { signOut } = useClerk();
    return (
        <div className="w-[200px] h-[100%] text-black flex flex-col">
            <h1 className="text-2xl font-bold p-4 border-b border-gray-300">Left Menu</h1>
            <ul className="flex flex-col mt-4">
                <li className={`p-4 hover:bg-gray-200 cursor-pointer ${page === 'a' ? 'bg-gray-300' : ''}`} onClick={() => setPage('a')}>Agencies</li>
                <li className={`p-4 hover:bg-gray-200 cursor-pointer ${page === 'c' ? 'bg-gray-300' : ''}`} onClick={() => setPage('c')}>Contacts</li>
                <li className={`p-4 hover:bg-gray-200 cursor-pointer ${page === 'p' ? 'bg-gray-300' : ''}`} onClick={() => setPage('p')}>Profile</li>
                <li className="p-4 hover:bg-gray-200 text-red-500 cursor-pointer"
                    onClick={()=>{signOut()}}
                >Logout</li>
            </ul>   
        </div>
    );
}