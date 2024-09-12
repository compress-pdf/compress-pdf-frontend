import SectionContainer from '@/components/common/containers/SectionContainer';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <SectionContainer className="bg-blue-200 dark:bg-slate-800 py-10 text-center">
      <h2 className="text-xl font-bold text-red-500">404 Not Found</h2>
      <Link
        href="/"
        className="bg-primary dark:bg-slate-600 px-2 py-1 rounded-md shadow-md text-slate-200 font-semibold inline-block my-8"
      >
        Return Home
      </Link>
    </SectionContainer>
  );
}
