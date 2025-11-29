import { useUser } from "@clerk/nextjs";

export default function Profile() {
    const { user } = useUser();
    if (!user) return null;

    const email = user.emailAddresses?.[0]?.emailAddress;
    const name = user.fullName;
    const username = user.username || email?.split('@')[0];
    const img = user.imageUrl;

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4 p-4 ">
            <img className="w-[300px] rounded-full" src={img || ""} alt={name || username || "User"} />
            <h2>{name || username}</h2>
            <p>{email}</p>
        </div>
    );
}
