import CompressPdf from '@/components/pages/compress-pdf';
import { generalToolsData } from '@/constants/toolsData';

interface PageProps {
  params: { uid: string; locale: string };
}

const page = ({ params }: PageProps) => {
  return (
    <CompressPdf
      tool={'general'}
      staticCustomize={true}
      uid={params.uid}
      toolInfo={generalToolsData}
    />
  );
};

export default page;
