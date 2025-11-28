"use client"
import Link from 'next/link';
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import './globals.css';
import { useEffect } from 'react';

export default function Home() {

  return (
    // FIXED: Changed dark gradient to bg-white
    <main className="min-h-screen w-full bg-white flex flex-col">
      <nav className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto">
        {/* FIXED: Changed text color to dark slate */}
        <div className="font-bold text-xl tracking-tight text-slate-800"> 
          <a href="/">
            <img src="/logo.jpeg" className='w-[50px] rounded-[100em]' alt="Logo" />
          </a>
        </div>
        {/* FIXED: Changed link color to dark slate */}
        <a href="https://infinitivebyte.io/" target="_blank" className="text-slate-800 hover:text-cyan-600 transition-colors">About Us</a> 

      </nav>
      <div className="w-full px-8 py-6 flex justify-between items-center max-w-7xl mx-auto"></div>
      <div className="flex-1 flex flex-col justify-center items-center text-center px-4 gap-8 -mt-16">

        <div className="space-y-4 max-w-2xl">
          {/* FIXED: Changed heading color to dark slate */}
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900"> 
            Welcome to the <br />
            {/* Kept the gradient for the span for branding/pop */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500"> 
              Home Page
            </span>
          </h1>
          {/* FIXED: Changed paragraph color to medium slate */}
          <p className="text-lg text-slate-600"> 
            Your journey starts here. Sign in to access your dashboard <br className="hidden md:block" />
            or learn more about what we do.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">

          <SignedIn>
            <div className="flex flex-col items-center gap-4">
              {/* FIXED: Changed signed-in box background and border to light theme */}
              <div className="flex items-center gap-4 p-2 pr-6 bg-slate-100 shadow-lg border border-slate-300 rounded-full"> 
                <UserButton afterSignOutUrl="/" />
                {/* FIXED: Changed text color to dark slate */}
                <span className="text-sm font-medium text-slate-700">Welcome back!</span> 
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
              <button  className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-400 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          {/* FIXED: Changed background and text colors to fit light theme */}
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 font-mono bg-slate-100/50 px-4 py-2 rounded-md border border-slate-200"> 
            <span>&lt;/&gt;</span>
            <p>
              Dashboard developed by{' '}
              <a
                href="https://aghlimi.github.io/resume"
                target="_blank"
                // FIXED: Changed link color to dark slate
                className="font-bold text-slate-800 hover:text-cyan-600 hover:underline transition-colors cursor-pointer"
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