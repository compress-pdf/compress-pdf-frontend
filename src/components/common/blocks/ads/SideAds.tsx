import Image from 'next/image';

export const SideAd = () => {
  return (
    <div className={`hidden xl:flex overflow-x-clip justify-center z-40`}>
      <div className="sticky top-[88px] w-max">
        <Image
          alt="xyz"
          className="hidden"
          width={300}
          height={640}
          src={'https://placehold.jp/300x640.png'}
          unoptimized={true}
          priority
        />
      </div>
    </div>
  );
};
