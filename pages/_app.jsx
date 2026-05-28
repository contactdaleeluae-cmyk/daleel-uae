import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Daleel UAE — UAE&apos;s Most Trusted Business Directory</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
