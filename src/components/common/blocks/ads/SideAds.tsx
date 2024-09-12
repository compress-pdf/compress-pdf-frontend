import Image from 'next/image';

export const SideAd = () => {
  return (
    <div
      className={`hidden xl:flex min-h-[800px] overflow-x-clip justify-center`}
    >
      <div className="sticky top-[88px] w-max h-[800px]">
        <Image
          alt="xyz"
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
