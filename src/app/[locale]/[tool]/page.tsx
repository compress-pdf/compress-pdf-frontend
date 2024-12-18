import { notFound } from 'next/navigation';

import Schema from '@/components/common/blocks/Schema';
import CompressPdf from '@/components/pages/compress-pdf';
import { generatePageMetadata } from '@/services/metadata';
import { toolsData, ToolsDataType } from '@/constants/toolsData';

interface Params {
  params: {
    locale: string;
    tool: string;
  };
}

export async function generateMetadata({ params: { tool } }: Params) {
  const toolInfo = toolsData.find(item => item.url === tool);

  if (!toolInfo) {
    return notFound();
  }
  return generatePageMetadata(`${tool}.metaData`);
}

const ToolPage = ({ params: { tool } }: Params) => {
  const toolInfo = toolsData.find(item => item.url === tool);

  if (!toolInfo) {
    return notFound();
  }

  return (
    <>
      <Schema tool={tool} />
      <CompressPdf tool={tool} toolInfo={toolInfo as ToolsDataType} />
    </>
  );
};

export default ToolPage;
