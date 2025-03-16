import Schema from '@/components/common/blocks/Schema';
import MainComp from '@/components/pages/home';
import { generatePageMetadata } from '@/services/metadata';

export async function generateMetadata() {
  return generatePageMetadata('general.metaData');
}

const HomePage = () => (
  <>
    <Schema tool={'general'} />
    <MainComp />
  </>
);

export default HomePage;
