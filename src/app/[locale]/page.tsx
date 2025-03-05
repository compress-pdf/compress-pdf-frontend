import Schema from '@/components/common/blocks/Schema';
// import CompressPdf from '@/components/pages/compress-pdf';
import MainComp from '@/components/pages/home';
// import { generalToolsData } from '@/constants/toolsData';
import { generatePageMetadata } from '@/services/metadata';

export async function generateMetadata() {
  return generatePageMetadata('general.metaData');
}

const HomePage = () => (
  <>
    <Schema tool={'general'} />
    <MainComp />
    {/* <CompressPdf tool={'general'} toolInfo={generalToolsData} /> */}
  </>
);

export default HomePage;
