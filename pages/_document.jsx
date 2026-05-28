import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts - Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Meta tags */}
        <meta name="theme-color" content="#0F172A" />
        <meta name="description" content="UAE's most trusted business directory. Find verified businesses across all 7 emirates by area, by category, by service." />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Daleel UAE" />
        <meta property="og:description" content="UAE's most trusted business directory connecting customers with verified local businesses across all 7 emirates." />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@daleeluae" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
