/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import React from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from 'react-share';

import ModalWithButton from '@/components/common/core/ModalWithButton';
import { Button } from '@/components/common/core/Button';

import FacebookIcon from '@assets/icons/pngs/facebook.png';
import TwitterIcon from '@assets/icons/pngs/twitter.png';
import MailIcon from '@assets/icons/pngs/email.png';
import LinkedinIcon from '@assets/icons/pngs/linkedin.png';
import QRIcon from '@assets/icons/pngs/qrBar.png';

type Props = {
  t: any;
  url: string;
  qr: string;
  handleCopyURL: any;
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  handlePageExpired: () => void;
};

const DownloadFooter = ({
  t,
  url,
  qr,
  handleCopyURL,
  timeLeft,
  handlePageExpired,
}: Props) => {
  return (
    <div className="md:mt-2 md:p-2">
      <p className="text-md ">
        Your files will be automatically deleted after{' '}
        <span className="font-bold text-[#ff8224] text-base">
          {timeLeft.hours}
        </span>{' '}
        {''}
        hour {''}
        <span className="font-bold text-[#ff8224] text-base">
          {timeLeft.minutes}
        </span>{' '}
        {''}
        {timeLeft.minutes > 1 ? ' minutes' : ' minute'}
        <span className="font-bold text-[#ff8224] text-base">
          {' '}
          {timeLeft.seconds}{' '}
        </span>{' '}
        seconds
      </p>
      <div className="flex items-center justify-center  p-2">
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
        <p className="mr-4 font-bold">{t('footer.share')} :</p>
        <div className="flex space-x-2 items-center">
          <FacebookShareButton url={url}>
            <button
              aria-label="Facebook-share"
              className="bg-transparent"
              onClick={handlePageExpired}
            >
              <Image
                width={0}
                height={0}
                src={FacebookIcon}
                alt="facebook-logo"
                className="h-[32px] md:h-[38px] w-auto rounded"
              />
            </button>
          </FacebookShareButton>
          <LinkedinShareButton url={url}>
            <button
              aria-label="Linkedin-share"
              className="bg-transparent "
              onClick={handlePageExpired}
            >
              <Image
                width={0}
                height={0}
                src={LinkedinIcon}
                alt="linkedin-logo"
                className="h-[32px] md:h-[38px] w-auto rounded"
              />
            </button>
          </LinkedinShareButton>
          <TwitterShareButton url={url}>
            <button
              aria-label="twitter-icon"
              className="bg-transparent "
              onClick={handlePageExpired}
            >
              <Image
                width={0}
                height={0}
                src={TwitterIcon}
                alt="twitter-logo"
                className="h-[35px] md:h-[40px] w-auto rounded"
              />
            </button>
          </TwitterShareButton>
          <EmailShareButton url={url}>
            <button
              aria-label="mail-share"
              className="bg-transparent "
              onClick={handlePageExpired}
            >
              <Image
                width={0}
                height={0}
                src={MailIcon}
                alt="print-logo"
                className="h-[44px] md:h-[50px] w-auto rounded"
              />
            </button>
          </EmailShareButton>

          <ModalWithButton
            buttonLabel={
              <span aria-label="qr share" className="bg-transparent">
                <Image
                  width={0}
                  height={0}
                  src={QRIcon}
                  alt="print-logo"
                  className="h-[32px] md:h-[42px] w-auto rounded -mt-2"
                />
              </span>
            }
          >
            {/* Modal Content */}
            <div>
              <div className="flex flex-col my-2 items-center gap-3">
                <p className="text-[#163B45] dark:text-white text-[1.125rem] font-bold w-full text-center mb-5">
                  {t('footer.qrModal.title')}
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
                  {t('footer.qrModal.description')}
                </p>

                <div className="relative flex w-full border border-[#D8DAE5] dark:bg-[#353535] dark:border-transparent rounded-[8px] text-sm items-center">
                  <input
                    type="text"
                    placeholder={t('footer.qrModal.placeholder')}
                    value={url}
                    className="py-4 px-[18px] ps-4 w-full focus:outline-none h-8 bg-transparent font-light text-[#163B45] dark:text-[#ffffff] text-[0.875rem] pe-6"
                    readOnly
                  />
                  <Button
                    onClick={() => {
                      handlePageExpired();
                      handleCopyURL();
                    }}
                    className="rounded-[7px] my-1 me-1"
                  >
                    {t('footer.qrModal.buttonLabel')}
                  </Button>
                </div>
                <p className="text-sm text-[#F81818] mt-[13px]">
                  {t('footer.qrModal.alert', {
                    hour: timeLeft.hours,
                    min: timeLeft.minutes,
                    sec: timeLeft.seconds,
                  })}
                </p>
              </div>
            </div>
          </ModalWithButton>
        </div>
      </div>
    </div>
  );
};

export default DownloadFooter;
