import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { Metadata } from "next"
import './globals.css'
// import { Inter } from 'next/font/google'


// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pomidoro box',
  description: 'strat page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
          <div className="container">
          
            {children}
          </div>
        <Footer/>
        </body>
    </html>
  )
}
