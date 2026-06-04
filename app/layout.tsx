import type {Metadata} from 'next';
import './globals.css';
import uiText from '@/uiText.json';

export const metadata: Metadata = {
  title: uiText.app.title,
  description: uiText.app.subtitle
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
