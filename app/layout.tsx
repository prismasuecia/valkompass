import type {Metadata} from 'next';
import {BetaGate} from '@/components/BetaGate';
import './globals.css';
import uiText from '@/uiText.json';

export const metadata: Metadata = {
  title: uiText.app.title,
  description: uiText.app.subtitle
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>
        <BetaGate>{children}</BetaGate>
      </body>
    </html>
  );
}
