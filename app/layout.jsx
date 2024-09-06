import './globals.css'
import { Poppins } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider';

const poppins = Poppins({ subsets: ['latin'],weight:['400'] })

import Navbar from '@/components/Navbar';


export const metadata = {
  title: "Diary",
  description: "Capture your thoughts, memories, and experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./title-logo.png" />
      </head>
      <AuthProvider>

      <body className={poppins.className}>
        
        <Navbar/>
        
        <main>
          {children}
        </main>
        
        
        </body>
      </AuthProvider>
    </html>
  )
}
