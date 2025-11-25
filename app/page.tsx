import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import './globals.css';
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b bg-red-500 from-slate-50 to-slate-100 flex flex-col">
      <nav className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-bold text-xl tracking-tight text-slate-900">
          <a href="/">
            <img src="/logo.jpeg" className='w-[50px] rounded-[100em]' alt="Logo" />
          </a>
        </div>

        <a href="https://infinitivebyte.io/" target="_blank" >About Us</a>

      </nav>
      <div className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto"></div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 gap-8 -mt-16">

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Home Page
            </span>
          </h1>
          <p className="text-lg text-slate-600">
            Your journey starts here. Sign in to access your dashboard <br className="hidden md:block" />
            or learn more about what we do.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">

          <SignedIn>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 p-2 pr-6 bg-white shadow-sm border border-slate-200 rounded-full">
                <UserButton afterSignOutUrl="/" />
                <span className="text-sm font-medium text-slate-700">Welcome back!</span>
              </div>

              <Link href="/dashboard">
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                  Go to Dashboard
                  <span>→</span>
                </button>
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 font-mono bg-slate-200/50 px-4 py-2 rounded-md">
            <span>&lt;/&gt;</span>
            <p>
              Dashboard developed by{' '}
              <a
                href="https://aghlimi.github.io/resume"
                target="_blank"
                className="font-bold text-slate-600 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
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