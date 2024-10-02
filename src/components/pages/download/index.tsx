/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';

import SplitButton from '@/components/common/core/SplitButton';
import ModalWithButton from '@/components/common/core/ModalWithButton';
import { Button } from '@/components/common/core/Button';
import CustomToast from '@/components/common/core/ToastMessage';
import { Link } from '@/i18n/routing';

import FileItem from './FileItem';

import FacebookIcon from '@assets/icons/pngs/facebook.png';
import TwitterIcon from '@assets/icons/pngs/twitter.png';
import MailIcon from '@assets/icons/pngs/email.png';
import LinkedinIcon from '@assets/icons/pngs/linkedin.png';
import QRIcon from '@assets/icons/pngs/qrBar.png';
import dropBoxIcon from '@assets/icons/pngs/dropboxWhite.png';
import oneDriveIcon from '@assets/icons/pngs/onedriveWhite.png';
import goBackIcon from '@assets/icons/pngs/go-back.png';
import googleDriveIcon from '@assets/icons/pngs/googledriveWhite.png';

const DownloadMain = () => {
  const [fileName, setFileName] = useState('Dummy dcsfwvcdsd');
  const [isEditing, setIsEditing] = useState(false);
  const [qr, setQr] = useState<string>('');
  const url = `https://pdfpack.com/TGxKkBC6L2k`;

  const generateQR = async (link: string): Promise<string | null> => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(link);
      return qrCodeDataUrl;
    } catch (err) {
      console.error('Error generating QR code:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchQRCode = async () => {
      const qrCode = await generateQR(url);
      // console.log(qrCode);
      setQr(qrCode || '');
    };

    fetchQRCode();
  }, [url]);

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

  const files = [
    {
      name: 'Dummy dcsfwvcdsd',
      size: '2MB',
      compressionPercentage: '-70%',
      compressedSize: '50KB',
    },
    // Add more files if needed
  ];
  return (
    <>
      <div className="bg-[#163B45] dark:bg-[#3A3A3A] text-white rounded-lg w-full appear-anim  shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in">
        {/* header  */}
        <div className="flex md:flex-row flex-col md:gap-[10px] justify-center md:justify-normal items-center md:items-start mb-4 w-full md:p-4 p-2">
          <div className="w-full md:w-[48%] lg:w-[44%] xl:w-[44%] 3xl:w-[56%] flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="flex flex-col gap-2 md:gap-4 justify-start text-center md:text-start">
              <h1 className="text-[#FF8224] text-md font-bold md:text-base lg:text-lg xl:text-base 2xl:text-lg 3xl:text-xl leading-4">
                Download Compressed Files
              </h1>
              <p className="text-xs md:text-sm lg:text-md xl:text-sm 2xl:text-[0.875rem] text-center md:text-left">
                1 pdf optimized | 610 KB Total
              </p>
            </div>

            <div className="flex md:flex-col flex-row items-center gap-3">
              <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] 3xl:text-[1.125rem] text-[#FF8224] leading-4 md:leading-6">
                -70%
              </p>
              <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem] 3xl:text-[0.875rem] font-bold leading-4 md:leading-6 mt-0">
                50KB
              </p>
            </div>
          </div>

          <div className="w-full md:w-[52%] lg:w-[56%] xl:w-[56%] 3xl:w-[44%] flex flex-col md:flex-row items-center md:items-start justify-end md:gap-4">
            <div className="flex md:flex-col flex-row items-center gap-3">
              <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] 3xl:text-[1.125rem] text-[#FF8224] leading-4 md:leading-6">
                Compression Time
              </p>
              <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem]  3xl:text-[0.875rem] font-bold leading-4 md:leading-6">
                00:59 sec
              </p>
            </div>

            <div className="text-end mt-2 md:mt-0">
              <SplitButton
                label={
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="22"
                      viewBox="0 0 17 22"
                      fill="none"
                    >
                      <path
                        d="M8.97296 12.5366V11.3193H7.67522V12.5366C7.67521 12.6429 7.66213 12.7488 7.63628 12.852L7.11719 14.9258L8.32409 15.7304L9.53099 14.9258L9.01189 12.852C8.98605 12.7488 8.97297 12.6429 8.97296 12.5366Z"
                        fill="#FAFAFA"
                      />
                      <path
                        d="M3.1326 0.289062H13.5145C14.2029 0.289063 14.8631 0.562515 15.3498 1.04926C15.8366 1.53601 16.11 2.19618 16.11 2.88455V18.4575C16.11 19.1458 15.8366 19.806 15.3498 20.2928C14.8631 20.7795 14.2029 21.053 13.5145 21.053H3.1326C2.44423 21.053 1.78406 20.7795 1.29731 20.2928C0.810561 19.806 0.537109 19.1458 0.537109 18.4575V2.88455C0.537109 2.19618 0.810561 1.53601 1.29731 1.04926C1.78406 0.562515 2.44423 0.289063 3.1326 0.289062ZM6.37695 11.3199V12.5372L5.85786 14.6123C5.79318 14.8719 5.81034 15.1452 5.90698 15.3947C6.00362 15.6442 6.17502 15.8577 6.39772 16.006L7.60462 16.8106C7.81774 16.9526 8.06812 17.0284 8.32422 17.0284C8.58032 17.0284 8.83069 16.9526 9.04382 16.8106L10.2507 16.006C10.4732 15.8575 10.6443 15.6439 10.7407 15.3944C10.8371 15.1449 10.8541 14.8718 10.7893 14.6123L10.2702 12.5372V11.3199C10.2702 10.9757 10.1335 10.6456 9.89008 10.4022C9.64671 10.1589 9.31662 10.0221 8.97244 10.0221H7.6747C7.33051 10.0221 7.00043 10.1589 6.75705 10.4022C6.51368 10.6456 6.37695 10.9757 6.37695 11.3199ZM7.6747 4.18229H6.37695V5.48003H7.6747V6.77778H6.37695V8.07552H7.6747V9.37326H9.62131V8.07552H8.32357V6.77778H9.62131V5.48003H8.32357V4.18229H9.62131V2.88455H8.32357V1.58681H6.37695V2.88455H7.6747V4.18229Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                    Download Zip
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
                      <span className="text-base font-bold text-[#FAFAFA] flex items-center gap-3">
                        <Image
                          src={googleDriveIcon}
                          height={14}
                          width={14}
                          alt={'download to google drive'}
                        />
                        Save to Google Drive
                      </span>
                    ),
                  },
                ]}
                onMainClick={() => console.log('aa')}
                className="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white focus:outline-none md:py-3 md:px-3 px-10  w-full text-sm md:text-[0.875rem] border-0 border-e-[1px] dark:border-0 dark:border-e-[1px] dark:border-[#dbdbdbe0]"
                classNameDropdownIcon="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white border-0 dark:border-s-transparent"
                classNameDropdown="bg-[#FF8224] dark:bg-[#FF8224] dark:hover:bg-[#ff7044] hover:bg-[#ff7044] text-white"
              />
            </div>
          </div>
        </div>

        {files.map((file, index) => (
          <FileItem key={index} file={file} />
        ))}

        {/* Footer  */}
        <div className="md:mt-4 flex items-center justify-center md:p-4 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 35 35"
            fill="none"
          >
            <path
              d="M21.3976 5.04242C21.5797 4.95661 21.7832 4.92187 21.9848 4.94216C22.1865 4.96245 22.3781 5.03696 22.538 5.15718L32.2756 12.4604C32.4011 12.5544 32.5036 12.674 32.5758 12.8105C32.648 12.9471 32.6881 13.0973 32.6933 13.2505C32.6985 13.4037 32.6686 13.5561 32.6057 13.6969C32.5429 13.8377 32.4486 13.9634 32.3297 14.065L22.5921 22.4116C22.4361 22.5451 22.2435 22.6324 22.0373 22.6628C21.8311 22.6932 21.6203 22.6655 21.43 22.5831C21.2398 22.5006 21.0783 22.3669 20.9651 22.198C20.8518 22.0292 20.7916 21.8323 20.7917 21.6312V17.5748C20.281 17.6582 19.6145 17.8043 18.8355 18.0547C16.9464 18.664 14.3908 19.8889 11.8201 22.3699C11.6628 22.5221 11.4605 22.6238 11.241 22.6611C11.0215 22.6983 10.7955 22.6693 10.5937 22.578C10.392 22.4866 10.2244 22.3374 10.1139 22.1508C10.0034 21.9642 9.95539 21.7492 9.97639 21.5352C10.2858 18.2571 11.2769 15.8658 12.625 14.1423C13.7827 12.6552 15.355 11.5161 17.1584 10.8579C18.3222 10.4336 19.5487 10.1913 20.7917 10.1401V5.98141C20.7913 5.78587 20.8479 5.59415 20.955 5.42813C21.0621 5.26211 21.2155 5.12846 21.3976 5.04242ZM4.56226 12.2413C4.56226 10.8578 5.13222 9.53093 6.14675 8.55263C7.16129 7.57433 8.53729 7.02473 9.97206 7.02473H14.2999C14.5869 7.02473 14.8621 7.13465 15.065 7.33031C15.2679 7.52597 15.3819 7.79134 15.3819 8.06805C15.3819 8.34475 15.2679 8.61012 15.065 8.80578C14.8621 9.00144 14.5869 9.11136 14.2999 9.11136H9.97206C9.1112 9.11136 8.2856 9.44113 7.67688 10.0281C7.06815 10.6151 6.72618 11.4112 6.72618 12.2413V24.7612C6.72618 25.5913 7.06815 26.3874 7.67688 26.9744C8.2856 27.5614 9.1112 27.8911 9.97206 27.8911H22.9556C23.8165 27.8911 24.6421 27.5614 25.2508 26.9744C25.8595 26.3874 26.2015 25.5913 26.2015 24.7612V22.6745C26.2015 22.3978 26.3155 22.1324 26.5184 21.9368C26.7213 21.7411 26.9965 21.6312 27.2834 21.6312C27.5704 21.6312 27.8456 21.7411 28.0485 21.9368C28.2514 22.1324 28.3654 22.3978 28.3654 22.6745V24.7612C28.3654 26.1447 27.7954 27.4715 26.7809 28.4499C25.7664 29.4282 24.3904 29.9778 22.9556 29.9778H9.97206C8.53729 29.9778 7.16129 29.4282 6.14675 28.4499C5.13222 27.4715 4.56226 26.1447 4.56226 24.7612V12.2413Z"
              fill="#FAFAFA"
            />
          </svg>
          <p className="mr-4 font-bold">Share :</p>
          <div className="flex space-x-2 items-center">
            <button className="bg-transparent ">
              <Image
                width={0}
                height={0}
                src={FacebookIcon}
                alt="print-logo"
                className="h-[32px] md:h-[38px] w-auto rounded"
              />
            </button>
            <button className="bg-transparent ">
              <Image
                width={0}
                height={0}
                src={LinkedinIcon}
                alt="print-logo"
                className="h-[32px] md:h-[38px] w-auto rounded"
              />
            </button>
            <button className="bg-transparent ">
              <Image
                width={0}
                height={0}
                src={TwitterIcon}
                alt="print-logo"
                className="h-[35px] md:h-[40px] w-auto rounded"
              />
            </button>
            <button className="bg-transparent ">
              <Image
                width={0}
                height={0}
                src={MailIcon}
                alt="print-logo"
                className="h-[44px] md:h-[50px] w-auto rounded"
              />
            </button>

            <ModalWithButton
              buttonLabel={
                <button className="bg-transparent ">
                  <Image
                    width={0}
                    height={0}
                    src={QRIcon}
                    alt="print-logo"
                    className="h-[32px] md:h-[42px] w-auto rounded"
                  />
                </button>
              }
            >
              {/* Modal Content */}
              <div>
                <div className="flex flex-col my-2 items-center gap-3">
                  <p className="text-[#163B45] dark:text-white text-[1.125rem] font-bold w-full text-center mb-5">
                    Share QR
                  </p>

                  {qr && (
                    <Image
                      src={qr}
                      width={0}
                      height={0}
                      className="w-[200px] h-[200px]"
                      alt="qr code"
                    />
                  )}
                  <p className="text-[#6B7280] text-sm mb-2">
                    Scan QR to Instantly Download{' '}
                  </p>

                  <div className="relative flex w-full border border-[#D8DAE5] dark:bg-[#353535] dark:border-transparent rounded-[8px] text-sm items-center">
                    <input
                      type="text"
                      placeholder={'https://example.com/result'}
                      value={url}
                      className="py-4 px-[18px] ps-4 w-full focus:outline-none h-8 bg-transparent font-light text-[#163B45] dark:text-[#ffffff] text-[0.875rem] pe-6"
                      readOnly
                    />
                    <Button
                      onClick={handleCopyURL}
                      className="rounded-[7px] my-1 me-1"
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-[#F81818] mt-[13px]">
                    Your files will be automatically deleted after
                    {44}hour {37}min {9}
                    sec
                  </p>
                </div>
              </div>
            </ModalWithButton>
          </div>
        </div>
      </div>
      <p className="text-[#A8A4A4] dark:text-[#E1DEDE] font-light text-base md:text-lg w-fit flex items-center mx-auto gap-1">
        Need further customization?
        <Link
          href="https://www.google.com"
          className="text-[#B23F40] flex items-center gap-1 font-normal"
        >
          <Image
            src={goBackIcon}
            height={22}
            width={22}
            alt="go-back"
            unoptimized
          ></Image>
          Go back
        </Link>
      </p>
    </>
  );
};

export default DownloadMain;
