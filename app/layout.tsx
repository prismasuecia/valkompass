import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Brújula electoral Prisma',
  description: 'Una brújula electoral neutral en español para las elecciones parlamentarias suecas de 2026.'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
