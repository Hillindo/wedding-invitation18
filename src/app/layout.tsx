import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
require('dotenv').config()
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <title>{process.env.og_title}</title>      
      <meta name="description" content={process.env.og_description} />
      <meta property="og:title" content={process.env.og_title} />
      <meta property="og:type" content="website" />
      <meta name="og:description" content={process.env.og_description} />
      <meta property="og:url" content={process.env.og_url}></meta>
      <meta property="og:image" content={process.env.og_image} />
      <meta property="og:image:secure_url" content={process.env.og_image} />
      <meta property="og:image:height" content="400"></meta>
      <meta property="og:image:width" content="720"></meta>
      <body className={inter.className}>{children}</body>
      <link rel="icon" href="/logo/iconpastinikah.svg" />
    </html>
  )
}
