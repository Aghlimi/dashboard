// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className='bg-[#54595f]'>
        <link rel="icon" href="/logo.jpeg" type="image/x-icon"></link>
        <body >
          <p id='unsuported' >
            THIS SCREEN SIZE NOT SUPORTED
          </p>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}