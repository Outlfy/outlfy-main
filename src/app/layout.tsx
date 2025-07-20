import { Metadata } from 'next'
import { Kanit } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/extra.css'
import '../../public/assets/scss/master.scss'
import '@fortawesome/fontawesome-free/css/all.min.css'

const kanit = Kanit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Outlfy - Technology Agency',
  description: 'Custom software development and technology strategy solutions',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/g13.svg"
        />
      </head>
      <body suppressHydrationWarning className={kanit.className}>
        {children}
      </body>
    </html>
  )
}