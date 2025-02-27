/* eslint-disable @next/next/no-page-custom-font */
import '../styles/globals.css'
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Inter:wght@400;500;700&family=Helvetica:wght@400;500;700&display=swap" />
      </Head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
