import { Metadata } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/extra.css'
import '../../public/assets/scss/master.scss'

export const metadata: Metadata = {
  title: 'Axtra - Digital Agency',
  description: 'Modern Digital Agency Template',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}