import Image from 'next/image';
import React from 'react';

const AdsSection = () => {
  return (
    <div className="lg:w-[180px] xl:w-[300px] h-[300px]">
      <Image
        src="https://placehold.jp/300x300.png"
        alt="Ads"
        width={300}
        height={300}
      />
    </div>
  );
};

export default AdsSection;
