import AdsSection from './ads';
import DownloadButton from './download-button';
import FooterButton from './footer-button';
import ItemRow from './item-row';

const erase = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="14"
    // height="19"
    viewBox="0 0 14 19"
    fill="none"
    className="w-[10.5px] h-[13.5px] md:w-[14px] md:h-[18px]"
  >
    <path
      d="M14 1.5H10.5L9.5 0.5H4.5L3.5 1.5H0V3.5H14M1 16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H11C11.5304 18.5 12.0391 18.2893 12.4142 17.9142C12.7893 17.5391 13 17.0304 13 16.5V4.5H1V16.5Z"
      fill="white"
    />
  </svg>
);

const restart = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="22"
    // height="21"
    viewBox="0 0 22 21"
    fill="none"
    className="w-[13.5px] h-[13.5px] md:w-[18px] md:h-[18px]"
  >
    <path
      d="M11.0002 1.5C13.1232 1.50003 15.1779 2.2506 16.8011 3.61905C18.4243 4.98749 19.5114 6.8857 19.8704 8.97819C20.2294 11.0707 19.8371 13.2227 18.7629 15.0539C17.6886 16.8851 16.0016 18.2776 13.9999 18.9853C11.9983 19.693 9.81093 19.6702 7.82443 18.9211C5.83792 18.172 4.18019 16.7448 3.14422 14.8916C2.10826 13.0385 1.76076 10.8788 2.16315 8.79421C2.56553 6.70964 3.6919 4.83442 5.34316 3.5"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.00024 3H6.00024V7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const share = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="28"
    // height="27"
    viewBox="0 0 28 27"
    fill="none"
    className="w-[21px] h- [22px] md:w-[28px] md:h-[27px] "
  >
    <path
      d="M17.1152 3.45869C17.2625 3.38929 17.4271 3.3612 17.5902 3.37761C17.7532 3.39401 17.9082 3.45427 18.0375 3.5515L25.9125 9.45775C26.014 9.53378 26.0969 9.63046 26.1553 9.74089C26.2137 9.85132 26.2461 9.9728 26.2503 10.0967C26.2545 10.2206 26.2303 10.3438 26.1795 10.4577C26.1286 10.5715 26.0524 10.6732 25.9562 10.7554L18.0812 17.5054C17.9551 17.6134 17.7993 17.684 17.6326 17.7086C17.4659 17.7332 17.2953 17.7108 17.1415 17.6441C16.9877 17.5774 16.8571 17.4693 16.7655 17.3327C16.6739 17.1961 16.6252 17.037 16.6252 16.8743V13.5938C16.2122 13.6613 15.6732 13.7794 15.0432 13.9819C13.5155 14.4747 11.4487 15.4652 9.36974 17.4717C9.24254 17.5948 9.079 17.6771 8.90149 17.7072C8.72398 17.7373 8.54115 17.7138 8.37799 17.64C8.21484 17.5661 8.07932 17.4455 7.98996 17.2945C7.9006 17.1436 7.86176 16.9697 7.87874 16.7967C8.12899 14.1456 8.93049 12.2117 10.0207 10.8179C10.957 9.61525 12.2285 8.69407 13.687 8.16175C14.6281 7.81865 15.62 7.62268 16.6252 7.58125V4.21806C16.6249 4.05993 16.6707 3.90488 16.7573 3.77062C16.844 3.63635 16.968 3.52827 17.1152 3.45869ZM3.50024 9.28056C3.50024 8.16168 3.96118 7.08862 4.78165 6.29745C5.60212 5.50628 6.71492 5.06181 7.87524 5.06181H11.3752C11.6073 5.06181 11.8299 5.15071 11.994 5.30894C12.1581 5.46717 12.2502 5.68178 12.2502 5.90556C12.2502 6.12934 12.1581 6.34395 11.994 6.50218C11.8299 6.66042 11.6073 6.74931 11.3752 6.74931H7.87524C7.17905 6.74931 6.51137 7.016 6.01909 7.4907C5.52681 7.9654 5.25024 8.60923 5.25024 9.28056V19.4056C5.25024 20.0769 5.52681 20.7207 6.01909 21.1954C6.51137 21.6701 7.17905 21.9368 7.87524 21.9368H18.3752C19.0714 21.9368 19.7391 21.6701 20.2314 21.1954C20.7237 20.7207 21.0002 20.0769 21.0002 19.4056V17.7181C21.0002 17.4943 21.0924 17.2797 21.2565 17.1214C21.4206 16.9632 21.6432 16.8743 21.8752 16.8743C22.1073 16.8743 22.3299 16.9632 22.494 17.1214C22.6581 17.2797 22.7502 17.4943 22.7502 17.7181V19.4056C22.7502 20.5244 22.2893 21.5975 21.4688 22.3887C20.6484 23.1798 19.5356 23.6243 18.3752 23.6243H7.87524C6.71492 23.6243 5.60212 23.1798 4.78165 22.3887C3.96118 21.5975 3.50024 20.5244 3.50024 19.4056V9.28056Z"
      fill="#282F3A"
    />
  </svg>
);

const DownloadSection = () => {
  return (
    <section className="border-[#FFD2AF] border-2 border-dashed bg-[#FAFAFA] rounded-lg my-36 ">
      <div className="flex md:gap-3 pt-[15px] px-[10px] md:pt-[39px] md:px-[64px] lg:px-[2px] xl:px-4">
        <div className="lg:w-[180px] xl:w-[300px] lg:block hidden">
          <AdsSection />
        </div>
        <div className="flex-1">
          <div>
            <h2 className="text-[#525E6F] text-center text-sm md:text-md font-semibold font-sans px-[23px] py-1 rounded-[4px] bg-[#FEFDF4] border-[#E6E6E6] min-h-6 mb-1 md:mb-[7.5px]">
              {`DPI:144,Image quality: 75, Color: No change`}
            </h2>
            {Array(4)
              .fill('')
              .map((_, i) => (
                <ItemRow key={i} />
              ))}
          </div>

          <div className="border border-[#E6E6E6] bg-[#FFF] rounded px-6 py-3 mt-[17px]">
            <div className="flex justify-center gap-[6px] items-center px-[14.3px] md:px-[19px] py-[4.16px] md:py-[6.14px]">
              <DownloadButton />
            </div>
          </div>

          <div className="flex justify-center gap-[7.5px] md:gap-[10px] mt-[25.25px] mb-[13px]">
            <FooterButton
              text="Erase"
              icon={erase}
              className="bg-[#F59E0B]"
              btnClassName="text-[#FFFFFF]"
            />
            <FooterButton
              text="Restart"
              icon={restart}
              className="bg-[#DA5942]"
              btnClassName="text-[#FFFFFF]"
            />
            <FooterButton
              text="Share"
              icon={share}
              className="bg-[#E7E7E7]"
              btnClassName="text-[#282F3A]"
            />
          </div>
        </div>
        <div className="lg:w-[180px] xl:w-[300px] lg:block hidden">
          <AdsSection />
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
