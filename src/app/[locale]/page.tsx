import Schema from '@/components/common/blocks/Schema';
import CompressPdf from '@/components/pages/compress-pdf';
import { generatePageMetadata } from '@/services/metadata';

export async function generateMetadata() {
  return generatePageMetadata('general.metaData');
}

const HomePage = () => {
  return (
    <>
      <Schema tool={'general'} />
      <CompressPdf tool={'general'} />
    </>
  );
};

export default HomePage;
