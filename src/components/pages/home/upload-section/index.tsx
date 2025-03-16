import dynamic from 'next/dynamic';

import AppSection from './app-section';
import AddsBanner from './adds-banner';

const InputArea = dynamic(() => import('./input-area'));

const PropsData = {
  label: 'Select PDF Files',
  toolInfo:
    ' Up to 4 files , 0 KB - 50 KB per file, 500 KB total, max 200 pages',
  dropzoneText: 'Or, drop the files here',
};

type Props = {
  children: React.ReactNode;
};

const UploadSection = ({ children }: Props) => {
  return (
    <section className="mt-[25px] xl:mt-[15px]">
      {children}
      <InputArea
        dropzoneText={PropsData.dropzoneText}
        label={PropsData.label}
        toolInfo={PropsData.toolInfo}
      />
      <AppSection />
      <AddsBanner />
    </section>
  );
};

export default UploadSection;
