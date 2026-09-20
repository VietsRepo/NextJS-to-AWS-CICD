import './globals.css';
import { ballo_2, nunito_sans } from './fonts';
// import type is TypeScript Specific ES Module Syntax
// meaning type is only import types
// and help transpiler like bable, ... imports can be safely removed.
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Drop Time', template: '%s | Drop Time' },
  description:
    'A pet project that helps track prices from any e-commerce website using a URL',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ballo_2.variable} ${nunito_sans.variable} antialiased`}
    >
      <body>
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
