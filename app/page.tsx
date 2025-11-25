import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#54595f] from-slate-700 to-slate-800 flex flex-col">
      <nav className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold text-xl tracking-tight text-slate-100"> 
          <a href="/">
            <img src="/logo.jpeg" className='w-[50px] rounded-[100em]' alt="Logo" />
          </a>
        </div>

        <a href="https://infinitivebyte.io/" target="_blank" className="text-slate-100 hover:text-cyan-400 transition-colors">About Us</a> 

      </nav>
      <div className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto"></div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 gap-8 -mt-16">

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-50"> 
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300"> 
              Home Page
            </span>
          </h1>
          <p className="text-lg text-slate-300"> 
            Your journey starts here. Sign in to access your dashboard <br className="hidden md:block" />
            or learn more about what we do.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">

          <SignedIn>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 p-2 pr-6 bg-slate-700 shadow-lg border border-slate-600 rounded-full"> 
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm font-medium text-slate-50">Welcome back!</span> 
              </div>

              <Link href="/dashboard">
                <button className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                  Go to Dashboard
                  <span>→</span>
                </button>
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-300 font-mono bg-slate-700/50 px-4 py-2 rounded-md"> 
            <span>&lt;/&gt;</span>
            <p>
              Dashboard developed by{' '}
              <a
                href="https://aghlimi.github.io/resume"
                target="_blank"
                className="font-bold text-slate-50 hover:text-cyan-400 hover:underline transition-colors cursor-pointer"
              >
                Aghlimi
              </a>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}