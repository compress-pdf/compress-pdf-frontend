import { notFound } from 'next/navigation';

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
  const tools = ['100kb', '200kb'];

  if (!tools.includes(tool)) {
    return notFound();
  }
  return generatePageMetadata(`${tool}.metaData`);
}

const ToolPage = ({ params: { tool } }: Params) => {
  const tools = ['100kb', '200kb'];

  if (!tools.includes(tool)) {
    return notFound();
  }

  return (
    <>
      <Schema tool={tool} />
      <CompressPdf tool={tool} />
    </>
  );
};

export default ToolPage;
