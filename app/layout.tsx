import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Valkompass Prisma',
  description: 'En neutral valkompass på svenska och spanska inför riksdagsvalet 2026.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
