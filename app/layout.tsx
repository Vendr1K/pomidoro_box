import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { Metadata } from "next"
import { Providers } from "@/redux/provider";
import './globals.css'
// import { Inter } from 'next/font/google'


// const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Pomidoro box',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Header/>
            <div className="container">
            
              {children}
            </div>
            <div id="modal_root" />
          <Footer/>
          </body>
      </Providers>
    </html>
  )
}
