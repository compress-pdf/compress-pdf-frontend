import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
// import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
// import { Metadata } from 'next';

import Header from '@/components/common/blocks/Header';
import Footer from '@/components/common/blocks/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { UploadingProvider } from '@/context/UploadingContext';
import { CompressionProvider } from '@/context/CompressionContext';
import { FooterProvider } from '@/context/FooterContext';
import { RatingProvider } from '@/context/RatingContext';
import { SideAd } from '@/components/common/blocks/ads/SideAds';
import { RootLayoutType } from '@/types/Layout';
import { OverflowProvider } from '@/context/OverflowContext';

import ReduxProvider from '../../../providers/redux';

// const poppins = Poppins({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
//   subsets: ['latin'],
//   // display: 'swap',
//   variable: '--font-poppins',
// });

// const openSans = Open_Sans({
//   weight: ['300', '400', '500', '600', '700', '800'],
//   subsets: ['latin'],
//   // display: 'swap',
//   variable: '--font-open-sans',
// });

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     verification: {
//       google: 'dxE8MFXwc-dN-w_M-r5BBbkL2rBho9fRKl1xwu_g0iM',
//     },
//   };
// }

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutType) {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      {/* <GoogleTagManager gtmId="GTM-53MD585D" />
      <GoogleAnalytics gaId="G-HSMFDWT6WR" /> */}

      <body
        className={`flex flex-col items-center justify-center w-full bg-[#FBFBFB] dark:bg-[#232323]`}
      >
        <OverflowProvider>
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
                          <main className="w-full mx-auto px-0">
                            {children}
                          </main>
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
        </OverflowProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
