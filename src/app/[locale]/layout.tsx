import '../globals.css';
import { Poppins, Open_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import { RootLayoutType } from '@/types/Layout';
import Header from '@/components/common/blocks/Header';
import Footer from '@/components/common/blocks/Footer';
import { SideAd } from '@/components/common/blocks/ads/SideAds';

import 'react-toastify/dist/ReactToastify.css';

import { UploadingProvider } from '@/context/UploadingContext';
import { CompressionProvider } from '@/context/CompressionContext';
import { FooterProvider } from '@/context/FooterContext';
import { RatingProvider } from '@/context/RatingContext';

import ReduxProvider from '../../../providers/redux';

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  // display: 'swap',
  variable: '--font-poppins',
});

const openSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  // display: 'swap',
  variable: '--font-open-sans',
});

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${openSans.variable} ${'flex flex-col items-center justify-center w-full bg-[#FBFBFB] dark:bg-[#232323]'}`}
      >
        <RatingProvider>
          <CompressionProvider>
            <UploadingProvider>
              <FooterProvider>
                <ReduxProvider>
                  <ThemeProvider attribute="class" defaultTheme="system">
                    <NextIntlClientProvider messages={messages}>
                      <Header />
                      <div className="w-full grid grid-cols-1 xl:grid-cols-[324px_1fr_324px] 2xl:grid-cols-[320px_1fr_320px] 3xl:grid-cols-[340px_1fr_340px] xl:max-w-[1920px]">
                        <SideAd />
                        <main className="w-full mx-auto px-0">{children}</main>
                        <SideAd />
                      </div>
                      <Footer />
                    </NextIntlClientProvider>
                  </ThemeProvider>
                </ReduxProvider>
              </FooterProvider>
            </UploadingProvider>
          </CompressionProvider>
        </RatingProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
