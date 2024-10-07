'use client';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';
import { useTranslations } from 'next-intl';

import SplitButton from '@/components/common/core/SplitButton';
import Tooltip from '@/components/common/core/Tooltip';
import ModalWithButton from '@/components/common/core/ModalWithButton';
import { Button } from '@/components/common/core/Button';
import { calculateTimeLeft } from '@/services/helpers';
import CustomToast from '@/components/common/core/ToastMessage';

import Preview from '../preview/Preview';

import ShareIcon from '@assets/icons/pngs/share.png';
import PrinterIcon from '@assets/icons/pngs/print.png';
import ViewIcon from '@assets/icons/pngs/view.png';
import downloadIcon from '@assets/icons/pngs/browseFileIcon.png';
import dropBoxIcon from '@assets/icons/pngs/dropboxWhite.png';
import oneDriveIcon from '@assets/icons/pngs/onedriveWhite.png';
import googleDriveIcon from '@assets/icons/pngs/googledriveWhite.png';
import fbLogo from '@assets/icons/pngs/share-modal/fbLogo.png';
import linkedinLogo from '@assets/icons/pngs/share-modal/linkedinLogo.png';
import xLogo from '@assets/icons/pngs/share-modal/xLogo.png';
import mailLogo from '@assets/icons/pngs/share-modal/mailLogo.png';

// Interface for file properties
interface FileItemProps {
  file: {
    name: string;
    size: string;
    compressionPercentage: string;
    compressedSize: string;
  };
}

// Reusable FileItem component
const FileItem: React.FC<FileItemProps> = ({ file }) => {
  const deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3778 4.98494L12.797 14.8572C12.7754 15.2265 12.6134 15.5735 12.3443 15.8273C12.0751 16.0811 11.7192 16.2224 11.3492 16.2223H6.10897C5.73904 16.2224 5.38307 16.0811 5.11392 15.8273C4.84477 15.5735 4.6828 15.2265 4.66116 14.8572L4.08189 4.98494H2.56665V4.25994C2.56665 4.1638 2.60484 4.0716 2.67282 4.00362C2.7408 3.93564 2.83301 3.89745 2.92915 3.89745H14.529C14.6252 3.89745 14.7174 3.93564 14.7854 4.00362C14.8534 4.0716 14.8915 4.1638 14.8915 4.25994V4.98494H13.3778ZM7.27911 2.08496H10.1791C10.2752 2.08496 10.3674 2.12315 10.4354 2.19113C10.5034 2.25912 10.5416 2.35132 10.5416 2.44746V3.17245H6.91661V2.44746C6.91661 2.35132 6.9548 2.25912 7.02279 2.19113C7.09077 2.12315 7.18297 2.08496 7.27911 2.08496ZM6.55412 6.79742L6.91661 13.3224H8.0041L7.71411 6.79742H6.55412ZM9.81659 6.79742L9.45409 13.3224H10.5416L10.9041 6.79742H9.81659Z"
        fill="#FF8224"
      />
    </svg>
  );
  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_1466_26704)">
        <path
          d="M1.86372 10.1267L1.07658 13.5238C1.04943 13.648 1.05036 13.7767 1.07931 13.9005C1.10825 14.0242 1.16449 14.14 1.2439 14.2393C1.32331 14.3385 1.42389 14.4188 1.53829 14.4742C1.65269 14.5296 1.77803 14.5588 1.90515 14.5595C1.96435 14.5659 2.02408 14.5659 2.08329 14.5595L5.50112 13.7724L12.0633 7.23502L8.40109 3.58105L1.86372 10.1267Z"
          fill="#FF8224"
        />
        <path
          d="M14.1271 3.96246L11.6828 1.5182C11.5221 1.35831 11.3046 1.26855 11.078 1.26855C10.8513 1.26855 10.6338 1.35831 10.4731 1.5182L9.11426 2.87704L12.7724 6.53515L14.1312 5.17631C14.2107 5.09638 14.2737 5.00156 14.3166 4.89727C14.3594 4.79298 14.3812 4.68127 14.3809 4.56852C14.3805 4.45578 14.3579 4.34422 14.3143 4.24022C14.2708 4.13623 14.2071 4.04184 14.1271 3.96246Z"
          fill="#FF8224"
        />
      </g>
      <defs>
        <clipPath id="clip0_1466_26704)">
          <rect
            width="14.9142"
            height="14.9142"
            fill="white"
            transform="translate(0.115479 0.515625)"
          />
        </clipPath>
      </defs>
    </svg>
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>(file.name);
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft('2024-10-05T13:02:48.845+00:00')
  );
  const url = 'https://sample.com/test.pdf';
  const t = useTranslations('common.download');

  useEffect(
    () => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft('2024-10-05T13:02:48.845+00:00'));
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(timer);
    },
    []
    //   [file.expireTime]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const handleNameChange = () => {
    setIsEditing(false); // Exit editing mode on blur
  };

  const handlePrint = (pdfUrl: string) => {
    console.log(pdfUrl);
    // print(pdfUrl).then(console.log);
    // const printWindow = window.open(pdfUrl, '_blank');
    // if (printWindow) {
    //   printWindow.onload = () => {
    //     setTimeout(() => {
    //       printWindow.print();
    //     }, 500); // Delay to ensure the PDF has fully loaded
    //   };
    // } else {
    //   console.error('Failed to open print window.');
    // }
  };

  const handleCopyURL = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        CustomToast({
          type: 'success',
          message: t('body.shareModal.successMessage'),
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-[10px] justify-normal items-center bg-[#FDE9D4] dark:bg-[#2F2F2F] md:p-4 p-2 w-full border-y-4 border-white dark:border-gray-800">
      <div className="flex flex-row items-center gap-1 w-full md:w-[48%] lg:w-[44%] xl:w-[44%] 3xl:w-[56%]">
        <div className="bg-white p-2 mr-2 md:mr-4 rounded">
          <div className="w-10 h-12 bg-gray-200"></div>
        </div>
        <div className="self-start">
          <span className="text-md text-[#163B45] dark:text-white font-bold flex flex-row items-center gap-[2px]">
            {isEditing ? (
              <span className="flex items-center">
                <input
                  type="text"
                  value={fileName}
                  onChange={handleInputChange}
                  onBlur={handleNameChange}
                  // autoFocus
                  className="text-[#163B45] dark:text-white font-bold text-sm md:text-xs lg:text-sm xl:text-xs 2xl:text-sm 3xl:text-[0.875rem] bg-white border-none outline-none w-max px-1 py-2"
                />
                <p className="ml-2">.pdf</p>
              </span>
            ) : (
              <p className="text-[#163B45] dark:text-white font-bold text-start text-sm md:text-xs lg:text-sm xl:text-xs 2xl:text-sm 3xl:text-[0.875rem]">
                <span>{fileName}</span>.pdf
              </p>
            )}
            <Tooltip content={t('body.editTooltip')}>
              <button
                title={t('body.editTooltip')}
                className="edit text-orange-500 ml-[1px] cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {editIcon}
              </button>
            </Tooltip>
            <ModalWithButton
              buttonLabel={
                <Tooltip content={t('body.deleteModal.deleteTooltip')}>
                  <span className="delete text-red-500 -mt-[5.8px]">
                    {deleteIcon}
                  </span>
                </Tooltip>
              }
            >
              {/* Modal Content */}
              <div>
                <p className="text-[1.125rem] text-[#163B45] dark:text-[#ffffff] font-bold mx-auto w-max">
                  {t('body.deleteModal.title')}
                </p>
                <p className="my-5 text-[0.875rem] text-[#6B7280] dark:text-[#E5E7EB] font-normal mx-auto w-max">
                  {t('body.deleteModal.description')}
                </p>
                <div className="mb-5 text-[#163B45] dark:text-[white] flex items-center justify-evenly">
                  <span className="flex flex-col gap-1 items-center justify-center">
                    <p className="text-2xl md:text-[2.125rem] font-bold">
                      {timeLeft.hours}
                    </p>
                    <p className="text-lg md:text-xl font-normal">
                      {t('body.deleteModal.hours')}
                    </p>
                  </span>
                  <span className="flex flex-col gap-1 items-center justify-center">
                    <p className="text-2xl md:text-[2.125rem] font-bold">
                      {timeLeft.minutes}
                    </p>
                    <p className="text-lg md:text-xl font-normal">
                      {t('body.deleteModal.min')}
                    </p>
                  </span>
                  <span className="flex flex-col gap-1 items-center justify-center">
                    <p className="text-2xl md:text-[2.125rem] font-bold">
                      {timeLeft.seconds}
                    </p>
                    <p className="text-lg md:text-xl font-normal">
                      {t('body.deleteModal.sec')}
                    </p>
                  </span>
                </div>
                <Button className="w-full justify-center">
                  {t('body.deleteModal.btnLabel')}
                </Button>
              </div>
            </ModalWithButton>
          </span>
          <p className="text-sm text-left mt-[7px]">
            <span className="rounded bg-[#FFD5B6] dark:bg-[#59402D] px-2 mr-2 text-slate-900 dark:text-white">
              PDF
            </span>
            <span className="text-md text-[#163B45] dark:text-white">
              {file.size}
            </span>
          </p>
        </div>
        <div className="ml-auto">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] 3xl:text-[1.125rem] text-[#FF8224] font-[1.15rem] leading-6">
              {file.compressionPercentage}
            </p>
            <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem] 3xl:text-[0.875rem] font-bold leading-6 mt-0 text-slate-900 dark:text-white">
              {file.compressedSize}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[52%] lg:w-[56%] xl:w-[56%] 3xl:w-[44%] flex flex-row gap-2 items-center justify-between md:justify-end">
        <div className="flex gap-1 2xl:gap-2 items-center">
          <ModalWithButton
            buttonLabel={
              <button className="bg-orange-200 dark:bg-[#59402D] rounded w-8 h-8 2xl:w-10 2xl:h-10 mt-[1px]">
                <Image
                  width={0}
                  height={0}
                  src={ShareIcon}
                  className="dark:mix-blend-multiply dark:brightness-150 dark:contrast-200"
                  alt="share-logo"
                />
              </button>
            }
          >
            {/* Modal Content */}
            <div>
              <div className="flex flex-col my-2 items-center gap-3">
                <p className="text-[#163B45] dark:text-white text-[1.125rem] font-bold w-full text-center mb-5">
                  {t('body.shareModal.title')}
                </p>

                <div className="flex items-center gap-4 md:gap-6 mt-2">
                  <div className="flex flex-col items-center">
                    <FacebookShareButton url={'url'}>
                      <div className="flex flex-col w-full items-center justify-center">
                        <button
                          type="button"
                          className="w-12 h-12 cursor-pointer relative rounded-full bottom-1 bg-transparent border dark:border-0 dark:bg-[#353535] flex items-center justify-center hover:scale-125 transition-all duration-200 ease-in-out"
                          // onClick={() => handleColorClick("")}
                          title="facebook share"
                        >
                          <Image
                            src={fbLogo}
                            className="w-[25px] h-[25px] cursor-pointer"
                            width={0}
                            height={0}
                            alt="facebook share"
                            unoptimized={true}
                          />
                        </button>
                        <p className="pt-1 font-medium text-sm text-[#163B45] dark:text-white">
                          Facebook
                        </p>
                      </div>
                    </FacebookShareButton>
                  </div>
                  <div className="flex flex-col items-center">
                    <LinkedinShareButton url={'url'}>
                      <div className="flex flex-col w-full items-center justify-center">
                        <button
                          type="button"
                          className="w-12 h-12 cursor-pointer relative rounded-full bottom-1 bg-transparent border dark:border-0 dark:bg-[#353535] flex items-center justify-center hover:scale-125 transition-all duration-200 ease-in-out"
                          // onClick={() => handleColorClick("")}
                          title="linkedin share"
                        >
                          <Image
                            src={linkedinLogo}
                            className="w-[25px] h-[25px] cursor-pointer"
                            width={0}
                            height={0}
                            alt="linkedin share"
                            unoptimized={true}
                          />
                        </button>
                        <p className="pt-1 font-medium text-sm text-[#163B45] dark:text-white">
                          LinkedIn
                        </p>
                      </div>
                    </LinkedinShareButton>
                  </div>
                  <div className="flex flex-col items-center">
                    <TwitterShareButton url={'url'}>
                      <div className="flex flex-col w-full items-center justify-center">
                        <button
                          type="button"
                          className="w-12 h-12 cursor-pointer relative rounded-full bottom-1 bg-transparent border dark:border-0 dark:bg-[#353535] flex items-center justify-center hover:scale-125 transition-all duration-200 ease-in-out"
                          // onClick={() => handleColorClick("")}
                          title="x(twitter)"
                        >
                          <Image
                            src={xLogo}
                            className="w-[25px] h-[25px] cursor-pointer dark:invert dark:brightness-50"
                            width={0}
                            height={0}
                            alt="social-x"
                            unoptimized={true}
                          />
                        </button>
                        <p className="pt-1 font-medium text-sm text-[#163B45] dark:text-white">
                          X(Twitter)
                        </p>
                      </div>
                    </TwitterShareButton>
                  </div>
                  <div className="flex flex-col items-center">
                    <EmailShareButton url={'url'}>
                      <div className="flex flex-col w-full items-center justify-center">
                        <button
                          type="button"
                          className="w-12 h-12 cursor-pointer relative rounded-full bottom-1 bg-transparent border dark:border-0 dark:bg-[#353535] flex items-center justify-center hover:scale-125 transition-all duration-200 ease-in-out"
                          // onClick={() => handleColorClick("")}
                          title="mail share"
                        >
                          <Image
                            src={mailLogo}
                            className="w-[25px] h-auto cursor-pointer"
                            width={0}
                            height={0}
                            alt="mail share"
                            unoptimized={true}
                          />
                        </button>
                        <p className="pt-1 font-medium text-sm text-[#163B45] dark:text-white">
                          Mail
                        </p>
                      </div>
                    </EmailShareButton>
                  </div>
                </div>

                <div className="relative flex w-full border border-[#D8DAE5] dark:bg-[#353535] dark:border-transparent text-sm items-center rounded-[8px]">
                  <input
                    type="text"
                    placeholder={'https://example.com/result'}
                    value={url}
                    className="py-4 px-[18px] ps-4 w-full focus:outline-none h-8 bg-transparent rounded-[4px] font-light text-[#163B45] dark:text-[#ffffff] text-[0.875rem] pe-6"
                  />
                  <Button
                    onClick={handleCopyURL}
                    className="rounded-[7px] my-1 me-1"
                  >
                    {t('body.shareModal.btn')}
                  </Button>
                </div>
                <p className="text-sm text-[#F81818] mt-[13px]">
                  {t('body.shareModal.alert', {
                    hour: timeLeft.hours,
                    min: timeLeft.minutes,
                    sec: timeLeft.seconds,
                  })}
                </p>
              </div>
            </div>
          </ModalWithButton>
          <button
            className="bg-orange-200 dark:bg-[#59402D] rounded w-8 h-8 2xl:w-10 2xl:h-10"
            onClick={() => handlePrint('https://sample.com/test.pdf')}
          >
            <Image
              width={0}
              height={0}
              src={PrinterIcon}
              className="dark:mix-blend-multiply dark:brightness-150 dark:contrast-200"
              alt="print-logo"
            />
          </button>
          <Preview
            url={
              'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
            }
          >
            <Image
              width={0}
              height={0}
              src={ViewIcon}
              className="dark:mix-blend-multiply dark:brightness-150 dark:contrast-200"
              alt="view-logo"
            />
          </Preview>
        </div>

        <div className="text-end">
          <SplitButton
            label={
              <span className="flex items-center gap-2">
                <Image
                  width={18}
                  height={18}
                  src={downloadIcon}
                  alt="download icon"
                />
                {t('body.downloadModal.label')}
              </span>
            }
            dropdownActions={[
              {
                label: (
                  <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                    <Image
                      src={dropBoxIcon}
                      height={14}
                      width={14}
                      alt={t('body.downloadModal.drive')}
                    />
                    {t('body.downloadModal.drive')}
                  </span>
                ),
              },
              {
                label: (
                  <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                    <Image
                      src={oneDriveIcon}
                      height={14}
                      width={14}
                      alt={t('body.downloadModal.onedrive')}
                    />
                    {t('body.downloadModal.onedrive')}
                  </span>
                ),
              },
              {
                label: (
                  <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                    <Image
                      src={googleDriveIcon}
                      height={14}
                      width={14}
                      alt={t('body.downloadModal.dropbox')}
                    />
                    {t('body.downloadModal.dropbox')}
                  </span>
                ),
              },
            ]}
            onMainClick={() => console.log('Download clicked')}
            className="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white focus:outline-none text-sm md:text-[0.875rem] border-0 border-e-[1px] dark:border-0 dark:border-e-[1px] dark:border-[#dbdbdbe0] h-full"
            classNameDropdownIcon="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white border-0 dark:border-s-transparent"
            classNameDropdown="bg-[#FF8224] dark:bg-[#FF8224] dark:hover:bg-[#ff7044] hover:bg-[#ff7044] text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FileItem;
