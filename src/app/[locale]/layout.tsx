import '../globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

import { RootLayoutType } from '@/types/Layout';
import Header from '@/components/common/blocks/Header';
import Footer from '@/components/common/blocks/Footer';
import { SideAd } from '@/components/common/blocks/ads/SideAds';

import ReduxProvider from '../../../providers/redux';

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="flex flex-col items-center justify-center w-full">
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <NextIntlClientProvider messages={messages}>
              <Header />
              <div className="w-full grid grid-cols-1 xl:grid-cols-[324px_1fr_324px] 2xl:grid-cols-[320px_1fr_320px] 3xl:grid-cols-[340px_1fr_340px]">
                <SideAd />
                <main className="w-full mx-auto min-h-screen px-0 xl:max-w-[1920px]">
                  {children}
                </main>
                <SideAd />
              </div>
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
