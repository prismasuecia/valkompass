import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import {GA_MEASUREMENT_ID} from '@/lib/analytics';
import uiText from '@/uiText.json';

export const metadata: Metadata = {
  title: uiText.app.title,
  description: uiText.app.subtitle
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>
        {children}
        {GA_MEASUREMENT_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
