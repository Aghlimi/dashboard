// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className='bg-[#54595f]'>
        <body >{children}</body>
      </html>
    </ClerkProvider>
  )
}