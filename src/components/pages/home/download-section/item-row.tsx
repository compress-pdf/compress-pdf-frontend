/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

import ModalWithButton from '@/components/common/core/ModalWithButton';
import Tooltip from '@/components/common/core/Tooltip';

import Preview from '../../preview/Preview';

import DownloadButton from './download-button';

import ShareIcon from '@assets/icons/pngs/share.png';
import PrinterIcon from '@assets/icons/pngs/print.png';
import ViewIcon from '@assets/icons/pngs/view.png';

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

const ItemRow = () => {
  const [isEditing, setIsEditing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <div className="border border-[#E6E6E6] bg-[#FFF] rounded my-1">
      <div className="flex justify-between items-center p-3">
        <div className="flex flex-col gap-[6.5px]">
          <div className="flex items-center gap-2">
            <h2 className="text-[#163B45] text-md font-semibold">
              {' '}
              dummy Text Random & Orem.pdf
            </h2>
            <Tooltip content="Edit">
              <button
                title="Edit"
                className="edit text-orange-500 ml-[1px] cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {editIcon}
              </button>
            </Tooltip>
            <ModalWithButton
              buttonLabel={
                <Tooltip content="Delte">
                  <span className="delete text-red-500 -mt-[3px]">
                    {deleteIcon}
                  </span>
                </Tooltip>
              }
            >
              {/* Modal Content */}
              <div>
                <p> Delete modal</p>
              </div>
            </ModalWithButton>
          </div>

          <div className="flex items-center">
            <p className={`text-sm text-left`}>
              <span className="rounded bg-[#FFD5B6] dark:bg-[#59402D] p-[7px] mr-2 text-slate-900 dark:text-white text-left">
                Compressed: 70%
              </span>
              <span className="text-md text-[#163B45] dark:text-white">
                1.2MB
              </span>
            </p>

            <div className="flex items-center">
              <ModalWithButton
                buttonLabel={
                  <span
                    aria-label="share"
                    className=" dark:bg-[#A6BFD2] dark:invert rounded w-8 h-8 flex items-center justify-center"
                  >
                    <Image
                      width={0}
                      height={0}
                      src={ShareIcon}
                      className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
                      alt="share-logo"
                    />
                  </span>
                }
              >
                {/* Modal Content */}
                <div>
                  <div className="flex flex-col my-2 items-center gap-3">
                    <p className="text-[#163B45] dark:text-white text-[1.125rem] font-bold w-full text-center mb-5">
                      Share
                    </p>
                  </div>
                </div>
              </ModalWithButton>
              <span
                aria-label="print"
                role="button"
                tabIndex={0}
                onKeyDown={() => {}}
                className=" dark:invert rounded w-8 h-8 p-0 flex items-center justify-center"
                onClick={() => {}}
              >
                <Image
                  width={0}
                  height={0}
                  src={PrinterIcon}
                  className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
                  alt="print-logo"
                />
              </span>
              <iframe
                ref={iframeRef}
                style={{ display: 'none' }}
                title="print"
              />
              <Preview url={'https://pdfobject.com/pdf/sample.pdf'}>
                <Image
                  width={0}
                  height={0}
                  src={ViewIcon}
                  className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
                  alt="view-logo"
                />
              </Preview>
            </div>
          </div>
        </div>
        <div>
          <DownloadButton />
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
