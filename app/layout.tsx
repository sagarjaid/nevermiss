import { ReactNode } from 'react';
import PlausibleProvider from 'next-plausible';
import { getSEOTags } from '@/libs/seo';
import { GoogleAnalytics } from '@next/third-parties/google';
import { HotJar } from '@/components/helper/hotjar';
import ClientWrapper from '@/components/ClientWrapper';
import config from '@/config';
import './globals.css';

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
        <GoogleAnalytics gaId='G-HJN7SJ6V09' />
        <HotJar />
        <ClientWrapper>{children}</ClientWrapper> {/* Use a client component */}
      </body>
    </html>
  );
}
