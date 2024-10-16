import SectionContainer from '@/components/common/containers/SectionContainer';
import GradientTwo from '@/components/pages/compress-pdf/home-page/backgrounds/gradient-two';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <SectionContainer className="text-center" as={'main'}>
      <GradientTwo />
      <div className="flex flex-col gap-[33px] items-center justify-start pt-[60px] min-h-[80vh]">
        <h1 className="text-[146px] font-bold text-[#163B45] dark:text-[#FAFAFA] leading-[160px] ">
          404
        </h1>
        <h2 className="text-[32px] font-bold text-[#163B45] dark:text-[#FAFAFA] leading-10">
          Oops! Page not found
        </h2>
        <p className="text-[#163B45] dark:text-[#FAFAFA] text-md font-normal left-6">
          It seems the link may be broken or the page has been moved.
        </p>
        <Link
          href="/"
          className="rounded-[10px] bg-gradient-to-tr from-[#FF8224] to-[#B33F40] px-10 py-[13px] text-[#FAFAFA] text-lg font-bold"
        >
          Go Back Home
        </Link>
      </div>
    </SectionContainer>
  );
}
