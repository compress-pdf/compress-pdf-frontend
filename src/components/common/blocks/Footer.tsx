'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useFooterContext } from '@/context/FooterContext';
import { apiTracker } from '@/services/helpers';

import SectionContainer from '../containers/SectionContainer';

import SoftekoLogo from '@assets/icons/pngs/softeko-logo.png';

const Footer = () => {
  const t = useTranslations('common');
  const footerLinks = t.raw('footer.links');
  const { showScreen } = useFooterContext();
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchIPData = async () => {
      try {
        const ipData = await apiTracker(); // Call the tracker API
        const url =
          ipData.countryName === 'United Arab Emirates'
            ? 'https://www.softeko.ae'
            : 'https://www.softeko.co';
        setUrl(url);
      } catch (error) {
        console.error('Error fetching IP data', error);
      }
    };

    fetchIPData();
  }, []);

  if (showScreen === 'customize') {
    return null;
  } else {
    return (
      <footer className="bg-[#ECECEC] dark:bg-[#3C3C3C] w-full py-4 mx-auto">
        <SectionContainer className="flex 2xl:flex-row flex-col gap-y-2 justify-between items-center text-sm font-normal md:font-semibold">
          <div className="flex gap-2 items-center text-xs md:text-[0.875rem] text-[#949494] dark:text-[#FAFAFA]">
            <p>A Product of</p>
            <Link href={url || ''} target="_blank">
              <Image
                src={SoftekoLogo}
                className="w-[90px] h-auto"
                alt="Softeko Logo"
              />
            </Link>
          </div>

          <ul className="flex items-center flex-wrap gap-x-5 gap-y-1 md:mt-4 mt-1 2xl:mt-0 justify-center">
            {footerLinks?.map((item: { label: string; link: string }) => (
              <li key={item.label}>
                <Link
                  className=" text-sm md:text-md 2xl:text-base leading-7 text-[#163B45] dark:text-[#FAFAFA] font-normal"
                  href={item.link}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </SectionContainer>
        <hr className="my-3 border[0.2px] border-gray dark:border-[#727272]" />
        <SectionContainer className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-[10px] md:text-sm 2xl:text-md text-[#949494] dark:text-[#FAFAFA] leading-4">
            {t('footer.copyright')}
          </p>
        </SectionContainer>
      </footer>
    );
  }
};

export default Footer;
