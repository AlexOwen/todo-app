import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './app.css';
import { SiteHeader } from './Components/SiteHeader';

const poppins = Poppins({ weight: '500', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Checked',
  description: 'Based on create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
