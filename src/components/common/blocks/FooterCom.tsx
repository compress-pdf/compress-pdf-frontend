'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { useFooterContext } from '@/context/FooterContext';

import SectionContainer from '../containers/SectionContainer';

import FacebookIcon from '@assets/icons/pngs/footer/facebook.png';
import TwitterIcon from '@assets/icons/pngs/footer/twitter.png';
import LinkedInIcon from '@assets/icons/pngs/footer/linkedin.png';

const FooterCom = () => {
  const t = useTranslations('common');
  const footerLinks = t.raw('footer.links');
  const { showScreen } = useFooterContext();

  const socialClasses =
    'rounded-[var(--Radius-sm,_6px)] border-[1.5px] border-[var(--Neutrals-Base-White,_#FAFAFA)] bg-[var(--Base-Base-White,_#FAFAFA)] shadow-[inset_0px_12px_12px_0px_rgba(255,_255,_255,_0.12),_inset_0px_-2px_2px_0px_rgba(48,_48,_48,_0.10)] h-10 w-10 flex items-center justify-center dark:border-[#3C3C3C] dark:bg-[#323232] dark:shadow-none dark:border-[#404040]';
  if (showScreen === 'customize') {
    return null;
  } else {
    return (
      <footer className="bg-[#ECECEC] dark:bg-[#3C3C3C] w-full py-4 mx-auto">
        <SectionContainer className="flex 2xl:flex-row flex-col gap-y-2 justify-between items-center text-sm font-normal md:font-semibold">
          <div className="flex gap-x-2">
            <div className={socialClasses}>
              <Image
                src={FacebookIcon}
                width={20}
                height={20}
                alt="logo"
                unoptimized={true}
                // className="dark:bg-red-500 rounded-full"
              />
            </div>
            <div className={socialClasses}>
              <Image
                src={LinkedInIcon}
                width={20}
                height={20}
                alt="logo"
                unoptimized={true}
              />
            </div>
            <div className={socialClasses}>
              <Image
                src={TwitterIcon}
                className="invert dark:invert-0"
                width={20}
                height={20}
                alt="logo"
                unoptimized={true}
              />
            </div>
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
        <SectionContainer className="flex justify-center items-center ">
          <p className="text-[10px] md:text-sm 2xl:text-md text-[#949494] dark:text-[#FAFAFA] leading-4">
            {t('footer.copyright')}
          </p>
        </SectionContainer>
      </footer>
    );
  }
};

export default FooterCom;
