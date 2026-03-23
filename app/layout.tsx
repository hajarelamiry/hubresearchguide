import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
   title: "The AI Platform Connecting Research, Funding and Innovation",
  description:
    "ResearchGuide helps researchers, universities and companies discover funding opportunities, showcase research projects, and connect with experts to turn ideas into real-world innovations.'s National Vision 2030.",
  icons: { icon: "/favicon.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}