import Image from 'next/image';
import React from 'react';

const AdsSection = () => {
  return (
    <div className="h-300 w-300 ">
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
