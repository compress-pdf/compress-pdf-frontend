import Image from 'next/image';
import Link from 'next/link';

import PlayStoreIcon from '@/assets/icons/pngs/home/play-store.png';
import AppStoreIcon from '@/assets/icons/pngs/home/app-store.png';

const AppSection = () => {
  return (
    <div className="flex flex-col 2xl:mt-5 mt-2 items-center">
      <p className="dark:text-[#FAFAFA] text-[#163B45] text-[24px] leading-7">
        Download App from
      </p>
      <div className="flex gap-3 2xl:mt-5 mt-2 md:justify-start justify-center">
        <Link
          href="https://play.google.com/store/apps/details?id=com.compresspdf.to"
          target="_blank"
        >
          <Image
            src={PlayStoreIcon}
            width={0}
            height={0}
            alt="play-store"
            className="md:w-[177px] w-[100px] dark:invert"
          />
        </Link>
        <Link
          href="https://apps.apple.com/us/app/compress-pdf-file/id6740256068"
          target="_blank"
        >
          <Image
            src={AppStoreIcon}
            width={0}
            height={0}
            alt="app-store"
            className="md:w-[177px] w-[100px] inv"
          />
        </Link>
      </div>
    </div>
  );
};

export default AppSection;
