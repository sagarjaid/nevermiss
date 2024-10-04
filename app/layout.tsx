import { ReactNode } from 'react';
import PlausibleProvider from 'next-plausible';
import { getSEOTags } from '@/libs/seo';
import config from '@/config';
import './globals.css';
import ClientWrapper from '@/components/ClientWrapper';

// Define SEO metadata
export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      data-theme={config.colors.theme}
      // className={font.className}
    >
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        <ClientWrapper>{children}</ClientWrapper> {/* Use a client component */}
      </body>
    </html>
  );
}
