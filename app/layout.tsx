import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './app.css';
import ThemeWrapper from './ThemeWrapper';

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
        <header>
          <h1>Checked</h1>
        </header>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
