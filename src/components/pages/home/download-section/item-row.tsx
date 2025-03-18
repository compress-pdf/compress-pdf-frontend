/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useRef, useState } from 'react';

import ModalWithButton from '@/components/common/core/ModalWithButton';
import Tooltip from '@/components/common/core/Tooltip';

import Preview from '../../preview/Preview';

import DownloadButton from './download-button';

// import ShareIcon from '@assets/icons/pngs/share.png';
// import PrinterIcon from '@assets/icons/pngs/print.png';
// import ViewIcon from '@assets/icons/pngs/view.png';

const editIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="16"
    // height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="w-[11px] h-[11px] md:w-[14px] md:h-[14px]"
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
    className="w-[11px] h-[11px] md:w-[17px] md:h-[17px]"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.3778 4.98494L12.797 14.8572C12.7754 15.2265 12.6134 15.5735 12.3443 15.8273C12.0751 16.0811 11.7192 16.2224 11.3492 16.2223H6.10897C5.73904 16.2224 5.38307 16.0811 5.11392 15.8273C4.84477 15.5735 4.6828 15.2265 4.66116 14.8572L4.08189 4.98494H2.56665V4.25994C2.56665 4.1638 2.60484 4.0716 2.67282 4.00362C2.7408 3.93564 2.83301 3.89745 2.92915 3.89745H14.529C14.6252 3.89745 14.7174 3.93564 14.7854 4.00362C14.8534 4.0716 14.8915 4.1638 14.8915 4.25994V4.98494H13.3778ZM7.27911 2.08496H10.1791C10.2752 2.08496 10.3674 2.12315 10.4354 2.19113C10.5034 2.25912 10.5416 2.35132 10.5416 2.44746V3.17245H6.91661V2.44746C6.91661 2.35132 6.9548 2.25912 7.02279 2.19113C7.09077 2.12315 7.18297 2.08496 7.27911 2.08496ZM6.55412 6.79742L6.91661 13.3224H8.0041L7.71411 6.79742H6.55412ZM9.81659 6.79742L9.45409 13.3224H10.5416L10.9041 6.79742H9.81659Z"
      fill="#FF8224"
    />
  </svg>
);

const shareIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="21"
    // height="20"
    viewBox="0 0 21 20"
    fill="none"
    className="w-[15px] md:w-[20.8px] h-[15px] md:h-[20px] dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
  >
    <path
      d="M15.8666 17.5999C15.1629 17.5999 14.5648 17.3665 14.0722 16.8999C13.5796 16.4332 13.3333 15.8665 13.3333 15.1999C13.3333 15.1199 13.3544 14.9332 13.3966 14.6399L7.4644 11.3599C7.23921 11.5599 6.97884 11.7167 6.68328 11.8303C6.38773 11.9439 6.07106 12.0004 5.73328 11.9999C5.02958 11.9999 4.43143 11.7665 3.93884 11.2999C3.44625 10.8332 3.19995 10.2665 3.19995 9.59985C3.19995 8.93319 3.44625 8.36652 3.93884 7.89985C4.43143 7.43319 5.02958 7.19985 5.73328 7.19985C6.07106 7.19985 6.38773 7.25665 6.68328 7.37025C6.97884 7.48385 7.23921 7.64039 7.4644 7.83985L13.3966 4.55985C13.3685 4.46652 13.351 4.37665 13.3443 4.29025C13.3375 4.20385 13.3338 4.10705 13.3333 3.99985C13.3333 3.33319 13.5796 2.76652 14.0722 2.29985C14.5648 1.83319 15.1629 1.59985 15.8666 1.59985C16.5703 1.59985 17.1685 1.83319 17.6611 2.29985C18.1537 2.76652 18.4 3.33319 18.4 3.99985C18.4 4.66652 18.1537 5.23319 17.6611 5.69985C17.1685 6.16652 16.5703 6.39985 15.8666 6.39985C15.5288 6.39985 15.2122 6.34305 14.9166 6.22945C14.6211 6.11585 14.3607 5.95932 14.1355 5.75985L8.20328 9.03985C8.23143 9.13319 8.24917 9.22332 8.25648 9.31025C8.2638 9.39719 8.26718 9.49372 8.26662 9.59985C8.26606 9.70599 8.26268 9.80279 8.25648 9.89025C8.25029 9.97772 8.23256 10.0676 8.20328 10.1599L14.1355 13.4399C14.3607 13.2399 14.6211 13.0833 14.9166 12.9703C15.2122 12.8572 15.5288 12.8004 15.8666 12.7999C16.5703 12.7999 17.1685 13.0332 17.6611 13.4999C18.1537 13.9665 18.4 14.5332 18.4 15.1999C18.4 15.8665 18.1537 16.4332 17.6611 16.8999C17.1685 17.3665 16.5703 17.5999 15.8666 17.5999Z"
      fill="#B23F40"
    />
  </svg>
);

const printIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="21"
    // height="20"
    viewBox="0 0 21 20"
    fill="none"
    className="w-[15px] md:w-[20.8px] h-[15px] md:h-[20px] dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
  >
    <path
      d="M16.2544 14.5453V15.6816C16.2544 16.2241 16.0389 16.7444 15.6553 17.128C15.2717 17.5116 14.7514 17.7271 14.2089 17.7271H7.39077C6.84829 17.7271 6.32802 17.5116 5.94443 17.128C5.56083 16.7444 5.34533 16.2241 5.34533 15.6816V14.5444L3.75443 14.5453C3.21194 14.5453 2.69168 14.3298 2.30808 13.9462C1.92449 13.5626 1.70898 13.0423 1.70898 12.4998V7.04895C1.70898 6.26536 2.02026 5.51387 2.57435 4.95978C3.12843 4.4057 3.87993 4.09442 4.66352 4.09442L5.34442 4.09351L5.34533 3.40897C5.34533 2.86648 5.56083 2.34622 5.94443 1.96262C6.32802 1.57903 6.84829 1.36353 7.39077 1.36353H14.2107C14.7532 1.36353 15.2735 1.57903 15.6571 1.96262C16.0407 2.34622 16.2562 2.86648 16.2562 3.40897V4.09351H16.938C17.7216 4.09399 18.473 4.40537 19.0273 4.9593C19.5815 5.51322 19.8934 6.26443 19.8944 7.04804L19.8971 12.4998C19.8971 13.042 19.6818 13.562 19.2986 13.9455C18.9154 14.3291 18.3956 14.5448 17.8535 14.5453H16.2544ZM14.2089 10.9089H7.39077C7.20995 10.9089 7.03652 10.9808 6.90866 11.1086C6.78079 11.2365 6.70896 11.4099 6.70896 11.5907V15.6816C6.70896 16.058 7.01441 16.3635 7.39077 16.3635H14.2089C14.3898 16.3635 14.5632 16.2916 14.691 16.1638C14.8189 16.0359 14.8907 15.8625 14.8907 15.6816V11.5907C14.8907 11.4099 14.8189 11.2365 14.691 11.1086C14.5632 10.9808 14.3898 10.9089 14.2089 10.9089ZM14.2107 2.72716H7.39077C7.20995 2.72716 7.03652 2.79899 6.90866 2.92685C6.78079 3.05472 6.70896 3.22814 6.70896 3.40897L6.70805 4.09351H14.8926V3.40897C14.8926 3.22814 14.8207 3.05472 14.6929 2.92685C14.565 2.79899 14.3916 2.72716 14.2107 2.72716Z"
      fill="#B23F40"
    />
  </svg>
);

const viewIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    // width="21"
    // height="20"
    viewBox="0 0 21 20"
    fill="none"
    className="w-[15px] md:w-[20.8px] h-[15px] md:h-[20px] dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale"
  >
    <path
      d="M10.7994 7.49998C10.1364 7.49998 9.50051 7.76337 9.03168 8.23221C8.56284 8.70105 8.29945 9.33693 8.29945 9.99997C8.29945 10.663 8.56284 11.2989 9.03168 11.7677C9.50051 12.2366 10.1364 12.5 10.7994 12.5C11.4625 12.5 12.0984 12.2366 12.5672 11.7677C13.036 11.2989 13.2994 10.663 13.2994 9.99997C13.2994 9.33693 13.036 8.70105 12.5672 8.23221C12.0984 7.76337 11.4625 7.49998 10.7994 7.49998ZM10.7994 14.1666C9.69437 14.1666 8.63457 13.7276 7.85317 12.9462C7.07177 12.1648 6.63279 11.105 6.63279 9.99997C6.63279 8.89491 7.07177 7.8351 7.85317 7.05371C8.63457 6.27231 9.69437 5.83332 10.7994 5.83332C11.9045 5.83332 12.9643 6.27231 13.7457 7.05371C14.5271 7.8351 14.9661 8.89491 14.9661 9.99997C14.9661 11.105 14.5271 12.1648 13.7457 12.9462C12.9643 13.7276 11.9045 14.1666 10.7994 14.1666ZM10.7994 3.75C6.63279 3.75 3.07447 6.34165 1.63281 9.99997C3.07447 13.6583 6.63279 16.2499 10.7994 16.2499C14.9661 16.2499 18.5244 13.6583 19.9661 9.99997C18.5244 6.34165 14.9661 3.75 10.7994 3.75Z"
      fill="#B23F40"
    />
  </svg>
);

const ItemRow = () => {
  const [isEditing, setIsEditing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <div className="border border-[#E6E6E6] bg-[#FFF] rounded my-1">
      <div className="flex md:flex-row flex-col gap-[5px] md:justify-between md:items-center p-3 ">
        <div className="flex flex-col gap-[6.5px] md:gap-[7.5px] lg:gap-[6.5px]">
          <div className="flex items-center gap-2 md:gap-1">
            <h2 className="text-[#163B45] text-3 md:text-md font-semibold leading-4 lg:leading-6">
              dummy Text Random & Orem.pdf
            </h2>
            <Tooltip content="Edit">
              <button
                title="Edit"
                className="edit ml-[1px] cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {editIcon}
              </button>
            </Tooltip>
            <ModalWithButton
              buttonLabel={
                <Tooltip content="Delete">
                  <span className="delete">{deleteIcon}</span>
                </Tooltip>
              }
            >
              {/* Modal Content */}
              <div>
                <p> Delete modal</p>
              </div>
            </ModalWithButton>
          </div>

          <div className="flex items-center gap-[6px] md:gap-[7px]">
            <p className={`text-left text-[9px] md:text-[9px] lg:text-[11px]`}>
              <span className="p-[5.25px] lg:p-[3px] mr-2 bg-[#FFD5B6] dark:bg-[#59402D] text-slate-900 dark:text-white rounded lg:rounded-[5px]">
                Compressed: 70%
              </span>
              <span className=" text-[#163B45] dark:text-white">1.2MB</span>
            </p>

            <div className="flex items-center gap-[6px] md:gap-[7px]">
              <ModalWithButton
                buttonLabel={
                  <span
                    aria-label="share"
                    className=" dark:bg-[#A6BFD2] dark:invert rounded flex items-center justify-center"
                  >
                    {shareIcon}
                    {/* <Image
                      width={0}
                      height={0}
                      src={ShareIcon}
                      className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale w-[15px] md:w-[20.8px] h-[15px] md:min-h-[20px]"
                      alt="share-logo"
                    /> */}
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
                className=" dark:invert rounded p-0 flex items-center justify-center"
                onClick={() => {}}
              >
                {printIcon}
                {/* <Image
                  width={0}
                  height={0}
                  src={PrinterIcon}
                  className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale w-[15px] md:w-[20.8px] h-[15px] md:h-[20px]"
                  alt="print-logo"
                /> */}
              </span>
              <iframe
                ref={iframeRef}
                style={{ display: 'none' }}
                title="print"
              />
              <Preview url={'https://pdfobject.com/pdf/sample.pdf'}>
                {viewIcon}

                {/* <Image
                  width={0}
                  height={0}
                  src={ViewIcon}
                  className="dark:mix-blend-multiply dark:brightness-100 dark:contrast-200 dark:grayscale w-[15px] md:w-[20.8px] h-[15px] md:h-[20px]"
                  alt="view-logo"
                /> */}
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
