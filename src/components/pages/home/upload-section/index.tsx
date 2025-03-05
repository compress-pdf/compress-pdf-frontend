import dynamic from 'next/dynamic';

const InputArea = dynamic(() => import('./input-area'), { ssr: false });

const PropsData = {
  label: 'Select PDF Files',
  toolInfo: 'Up to 4 files, 0 KB - 50 Kb per file, 100 pages per file',
  dropzoneText: 'Or, drop the files here',
};

type Props = {
  children: React.ReactNode;
};

const UploadSection = ({ children }: Props) => {
  return (
    <section className="mt-[15px]">
      {children}
      <InputArea
        dropzoneText={PropsData.dropzoneText}
        label={PropsData.label}
        toolInfo={PropsData.toolInfo}
      />
    </section>
  );
};

export default UploadSection;
