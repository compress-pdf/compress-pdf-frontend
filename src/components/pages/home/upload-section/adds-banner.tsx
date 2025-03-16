import React from 'react';
import Image from 'next/image';

import AddsBannerIcon from '@/assets/icons/pngs/home/adds-banner.png';

const AddsBanner = () => {
  return (
    <div className="mt-[27px]">
      <Image
        src={AddsBannerIcon}
        width={0}
        height={0}
        alt="play-store"
        className="w-full dark:invert"
      />
    </div>
  );
};

export default AddsBanner;
