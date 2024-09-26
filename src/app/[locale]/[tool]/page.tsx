import Schema from '@/components/common/blocks/Schema';
import CompressPdf from '@/components/pages/compress-pdf';
import { generatePageMetadata } from '@/services/metadata';

interface Params {
  params: {
    locale: string;
    tool: string;
  };
}

export async function generateMetadata({ params: { tool } }: Params) {
  return generatePageMetadata(`${tool}.metaData`);
}

const ToolPage = ({ params: { tool } }: Params) => {
  return (
    <>
      <Schema tool={tool} />
      <CompressPdf tool={tool} />
    </>
  );
};

export default ToolPage;
