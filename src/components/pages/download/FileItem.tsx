'use client';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';
import axios from 'axios';

import SplitButton from '@/components/common/core/SplitButton';
import Tooltip from '@/components/common/core/Tooltip';
import ModalWithButton from '@/components/common/core/ModalWithButton';
import { Button } from '@/components/common/core/Button';
import { calculateTimeLeft } from '@/services/helpers';
import CustomToast from '@/components/common/core/ToastMessage';
import { FileData } from '@/types/General';
import { API_URL } from '@/constants/credentials/const';

import Preview from '../preview/Preview';
import SaveDrive from '../save-drive/SaveDrive';

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

interface FileItemProps {
  file: FileData; // Assuming FileData is already defined
  handleDelete: (id: string, index: number) => void;
  handleNameChange: (uid: string, name: string, index: number) => void;
  storedState: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  handleDelete,
  handleNameChange,
  storedState,
}) => {
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
  const [fileName, setFileName] = useState<string>(
    file.file_name.endsWith('.pdf')
      ? file.file_name.replace(/\.pdf$/i, '')
      : file.file_name
  );
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(file?.expire));
  const url = `${API_URL}/${file.file_path}`;

  useEffect(
    () => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(file?.expire));
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

  // const handleNameChange = () => {
  //   setIsEditing(false); // Exit editing mode on blur
  // };
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const handlePrint = async () => {
  //   try {
  //     const response = await axios.get(url, {
  //       responseType: 'blob', // Fetch the file as a blob
  //     });

  //     // Create a blob URL for the fetched PDF
  //     const blobUrl = URL.createObjectURL(
  //       new Blob([response.data], { type: 'application/pdf' })
  //     );

  //     // Open the blob URL in a new tab
  //     const newWindow = window.open(blobUrl, '_blank');

  //     if (newWindow) {
  //       // When the new window is loaded, trigger print
  //       newWindow.onload = () => {
  //         newWindow.focus();
  //         newWindow.print();
  //       };
  //     }
  //   } catch (error) {
  //     console.error('Error fetching PDF for printing:', error);
  //   }
  // };

  const handlePrint = async () => {
    try {
      // Fetch the PDF as a blob
      const response = await axios.get(url, {
        responseType: 'blob',
      });

      // Create a blob URL for the PDF
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );

      // Set the blob URL as the iframe source
      if (iframeRef.current) {
        iframeRef.current.src = blobUrl;
      }
    } catch (error) {
      console.error('Error fetching PDF for printing:', error);
    }
  };

  useEffect(() => {
    // Trigger print when the iframe is loaded
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        iframeRef.current?.contentWindow?.focus();
        iframeRef.current?.contentWindow?.print();
      };
    }
  }, []);

  const handleCopyURL = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        CustomToast({
          type: 'success',
          message: `URL copied successfully`,
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
      });

      if (response.status === 200) {
        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.pdf`;

        // Append the anchor to the body (required for Firefox)
        document.body.appendChild(a);
        a.click();

        // Cleanup: remove the element and revoke the object URL
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-[10px] justify-normal items-start bg-[#FDE9D4] dark:bg-[#2F2F2F] md:p-4 p-2 w-full border-b-4 border-white dark:border-gray-800">
      <div className="flex flex-row items-start gap-1 w-full md:w-[48%] lg:w-[44%] xl:w-[44%] 3xl:w-[56%]">
        <div className="bg-white p-2 mr-2 md:mr-4 rounded">
          <div className="w-10 h-12 bg-gray-200"></div>
        </div>
        <div className="self-start max-w-[50%] flex flex-col flex-wrap">
          <span className="text-md text-[#163B45] dark:text-white font-bold flex flex-row items-center gap-[2px] max-w-full flex-wrap">
            {isEditing ? (
              <span className="flex items-center max-w-full flex-nowrap">
                <input
                  aria-label="edit filename"
                  type="text"
                  value={fileName}
                  onChange={handleInputChange}
                  onBlur={() => {
                    handleNameChange(file.uid_fk, fileName, file.file_index);
                    setIsEditing(false);
                  }}
                  className="text-[#163B45] dark:text-white font-normal text-sm md:text-xs lg:text-sm xl:text-xs 2xl:text-sm 3xl:text-[0.875rem] bg-white border-none outline-none w-full rounded-md dark:bg-[#2e150e50] px-1 py-2"
                />
                <p className="ml-2">.pdf</p>
              </span>
            ) : (
              <p className="text-[#163B45] dark:text-white font-bold text-start text-sm md:text-xs lg:text-sm xl:text-xs 2xl:text-sm 3xl:text-[0.875rem] break-words whitespace-normal max-w-full">
                {fileName}.pdf
              </p>
            )}
            {storedState && (
              <>
                <Tooltip content="Edit File Name">
                  <button
                    title="Edit File Name"
                    className="edit text-orange-500 ml-[1px] cursor-pointer"
                    onClick={() => setIsEditing(true)}
                  >
                    {editIcon}
                  </button>
                </Tooltip>
                <ModalWithButton
                  buttonLabel={
                    <Tooltip content="Delete File">
                      <span className="delete text-red-500 -mt-[5.8px]">
                        {deleteIcon}
                      </span>
                    </Tooltip>
                  }
                >
                  {/* Modal Content */}
                  <div>
                    <p className="text-[1.125rem] text-[#163B45] dark:text-[#ffffff] font-bold mx-auto w-max">
                      File available time
                    </p>
                    <p className="my-5 text-[0.875rem] text-[#6B7280] dark:text-[#E5E7EB] font-normal mx-auto w-max">
                      All your files will be automatically deleted after
                    </p>
                    <div className="mb-5 text-[#163B45] dark:text-[white] flex items-center justify-evenly">
                      <span className="flex flex-col gap-1 items-center justify-center">
                        <p className="text-2xl md:text-[2.125rem] font-bold">
                          {timeLeft.hours}
                        </p>
                        <p className="text-lg md:text-xl font-normal">Hours</p>
                      </span>
                      <span className="flex flex-col gap-1 items-center justify-center">
                        <p className="text-2xl md:text-[2.125rem] font-bold">
                          {timeLeft.minutes}
                        </p>
                        <p className="text-lg md:text-xl font-normal">
                          Minutes
                        </p>
                      </span>
                      <span className="flex flex-col gap-1 items-center justify-center">
                        <p className="text-2xl md:text-[2.125rem] font-bold">
                          {timeLeft.seconds}
                        </p>
                        <p className="text-lg md:text-xl font-normal">
                          Seconds
                        </p>
                      </span>
                    </div>
                    <Button
                      className="w-full justify-center"
                      onClick={() => handleDelete(file.uid_fk, file.file_index)}
                    >
                      Delete Now
                    </Button>
                  </div>
                </ModalWithButton>
              </>
            )}
          </span>
          <p className="text-sm text-left mt-[7px]">
            <span className="rounded bg-[#FFD5B6] dark:bg-[#59402D] px-2 mr-2 text-slate-900 dark:text-white">
              PDF
            </span>
            <span className="text-md text-[#163B45] dark:text-white">
              {file.input_file_size.toFixed(2)}MB
            </span>
          </p>
        </div>
        <div className="ml-auto">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] text-[#163B45] dark:text-slate-50 font-[1.15rem] leading-6">
              {file.compression_ratio.toFixed(2)}%
            </p>
            <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem] 3xl:text-[0.875rem] font-bold leading-6 mt-0 text-slate-900 dark:text-white">
              {file.output_file_size.toFixed(2)}MB
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[52%] lg:w-[56%] xl:w-[56%] 3xl:w-[44%] flex flex-row gap-2 items-center justify-between md:justify-end">
        <div className="flex gap-1 2xl:gap-2 items-center">
          <ModalWithButton
            buttonLabel={
              <button
                aria-label="share"
                className="bg-orange-200 dark:bg-[#59402D] rounded w-8 h-8 2xl:w-10 2xl:h-10 mt-[1px]"
              >
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
                  Share
                </p>

                <div className="flex items-center gap-4 md:gap-6 mt-2">
                  <div className="flex flex-col items-center">
                    <FacebookShareButton url={url}>
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
                    <LinkedinShareButton url={url}>
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
                    <TwitterShareButton url={url}>
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
                    <EmailShareButton url={url}>
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
                    disabled
                    className="py-4 px-[18px] ps-4 w-full focus:outline-none h-8 bg-transparent rounded-[4px] font-light text-[#163B45] dark:text-[#ffffff] text-[0.875rem] pe-6"
                  />
                  <Button
                    onClick={handleCopyURL}
                    className="rounded-[7px] my-1 me-1"
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-[#F81818] mt-[13px]">
                  Your files will be automatically deleted after{' '}
                  {timeLeft.hours}hour {timeLeft.minutes}min {timeLeft.seconds}
                  sec
                </p>
              </div>
            </div>
          </ModalWithButton>
          <button
            className="bg-orange-200 dark:bg-[#59402D] rounded w-8 h-8 2xl:w-10 2xl:h-10"
            onClick={() => handlePrint()}
          >
            <Image
              width={0}
              height={0}
              src={PrinterIcon}
              className="dark:mix-blend-multiply dark:brightness-150 dark:contrast-200"
              alt="print-logo"
            />
          </button>
          <iframe ref={iframeRef} style={{ display: 'none' }} title="print" />
          <Preview url={url}>
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
              <button
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Image
                  width={18}
                  height={18}
                  src={downloadIcon}
                  alt="download icon"
                />
                Download
              </button>
            }
            dropdownActions={[
              {
                label: (
                  <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                    <Image
                      src={dropBoxIcon}
                      height={14}
                      width={14}
                      alt={'download to dropbox'}
                    />
                    Save to Dropbox
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
                      alt={'download to onedrive'}
                    />
                    Save to OneDrive
                  </span>
                ),
              },
              {
                label: (
                  <SaveDrive PDF_URL={url}>
                    <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                      <Image
                        src={googleDriveIcon}
                        height={14}
                        width={14}
                        alt={'download to google drive'}
                      />
                      Save to Google Drive
                    </span>
                  </SaveDrive>
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
