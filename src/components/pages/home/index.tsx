'use client';
// import CustomizeSection from './customize-section';
import DownloadSection from './download-section';
import UploadSection from './upload-section';

const MainComp = () => {
  return (
    <>
      <UploadSection>
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <h1 className="text-[#282F3A] text-[42px] font-bold">Compress PDF</h1>
          <p className="text-[#525E6F] text-[22px] font-normal ">
            Reduce PDF file size online for free
          </p>
        </div>
      </UploadSection>
      {/* <CustomizeSection /> */}

      <DownloadSection />
    </>
  );
};

export default MainComp;
