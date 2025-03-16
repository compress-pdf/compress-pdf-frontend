// import CustomizeSection from './customize-section';
import DownloadSection from './download-section';
import UploadSection from './upload-section';

const MainComp = () => {
  return (
    <div>
      <div className="w-[334px] md:w-[730px] lg:w-[988px] mx-auto">
        <UploadSection>
          <div className="flex flex-col gap-[10px] items-center justify-center">
            <h1 className="text-[#282F3A] dark:text-white text-[30px] md:text-[32px] xl:text-[42px] font-bold leading-10 xl:leading-[54px]">
              Compress PDF
            </h1>
            <p className="text-[#525E6F] dark:text-white text-[18px] md:text-[20px] xl:text-[22px]  font-normal leading-6 md:leading-7 xl:leading-[30px]">
              Reduce PDF file size online for free
            </p>
          </div>
        </UploadSection>
        {/* <CustomizeSection /> */}
      </div>

      <DownloadSection />
    </div>
  );
};

export default MainComp;
