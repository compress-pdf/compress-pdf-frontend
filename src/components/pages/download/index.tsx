/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useTranslations } from 'next-intl';
import axios from 'axios';

import SplitButton from '@/components/common/core/SplitButton';
import ModalWithButton from '@/components/common/core/ModalWithButton';
import CustomToast from '@/components/common/core/ToastMessage';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { API_URL } from '@/constants/credentials/const';
import { FileData } from '@/types/General';
import { clearDB, getItemFromDB } from '@/services/indexedDB';
import helpers, {
  calculateTimeLeft,
  convertToTimeFormat,
  findEarliestExpireTime,
} from '@/services/helpers';
import SaveDropBox from '@/components/common/blocks/SaveDropBox';
import { useRatingContext } from '@/context/RatingContext';
import StarRating from '@/components/common/core/StarRating';

import SaveDrive from '../save-drive/SaveDrive';

import FileItem from './FileItem';
import DownloadSkeleton from './DownloadSkeleton';
import DownloadFooter from './Footer';

import dropBoxIcon from '@assets/icons/pngs/dropboxWhite.png';
import goBackIcon from '@assets/icons/pngs/go-back.png';
import googleDriveIcon from '@assets/icons/pngs/googledriveWhite.png';

const DownloadMain = ({ uid }: { uid: string }) => {
  const [fileName, setFileName] = useState('Dummy dcsfwvcdsd');
  const [isEditing, setIsEditing] = useState(false);
  const [totalPdf, setTotalPdf] = useState(0);
  const [totalInitialSize, setTotalInitialSize] = useState(0);
  const [totalUltimateSize, setTotalUltimateSize] = useState(0);
  const [compressionRatio, setCompressionRatio] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [qr, setQr] = useState<string>('');
  const t = useTranslations('common.download');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [storedState, setStoredState] = useState(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(findEarliestExpireTime(data) || '')
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const toolId = 1;
  const { isRated, addRating } = useRatingContext();
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/v2/download-page-data?uid=${uid}`
        );

        if (response.status !== 200 || response.data?.error) {
          // Show an error message
          CustomToast({
            type: 'error',
            message: 'Your files have expired. Please upload again.',
          });

          // Redirect to home page if status is not 200 or if there is an error in response data
          router.push('/');
          return;
        }
        const responseData = response.data as FileData[];
        setData(responseData);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        CustomToast({
          type: 'error',
          message:
            error.status === 404
              ? 'Your files have expired. Please upload again.'
              : error.message,
        });
        // Optionally, you can handle redirection or other actions here
        router.push('/');
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid, router]);

  useEffect(() => {
    setUrl(window.location.href);
  }, [router]);

  useEffect(() => {
    if (!isRated(toolId)) {
      setShowModal(true);
    }
  }, [toolId, isRated]);

  useEffect(
    () => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(findEarliestExpireTime(data) || ''));
      }, 1000);

      // Clear interval on component unmount
      return () => clearInterval(timer);
    },
    [data]
    //   [file.expireTime]
  );

  useEffect(() => {
    const getState = async () => {
      try {
        const state = await getItemFromDB(uid);
        if (state) {
          setStoredState(true); // Update the state with the retrieved data
        }
      } catch (error) {
        console.error('Error fetching state from the database:', error);
      }
    };

    if (uid) {
      getState(); // Call the async function to get the state
    }
  }, [uid]); // Add `uid` to the dependency array to trigger this effect when it changes

  useEffect(() => {
    const initialSize: number = parseFloat(
      data
        ?.reduce(
          (total: number, each: FileData) => total + each.input_file_size,
          0
        )
        .toFixed(2) || '0'
    );
    const ultimateSize: number = parseFloat(
      data
        ?.reduce(
          (total: number, each: FileData) => total + each.output_file_size,
          0
        )
        .toFixed(2) || '0'
    );
    const compressionRatio: number = parseFloat(
      (((initialSize - ultimateSize) / initialSize) * 100).toFixed(2) || '0'
    );

    setTotalPdf(data?.length);
    setTotalInitialSize(initialSize);
    setTotalUltimateSize(ultimateSize);
    setCompressionRatio(compressionRatio);
    setProcessingTime(
      Math.max(...(data?.map((each: FileData) => each.processing_time) || [0]))
    );
    setTimeLeft(calculateTimeLeft(findEarliestExpireTime(data) || ''));
  }, [data]);

  const handleRatingSubmit = async (rating: number) => {
    // Submit rating and close the modal
    await addRating(toolId, rating);
    setShowModal(false);
    setIsOpen(false);
  };

  const generateQR = async (link: string): Promise<string | null> => {
    if (link !== '') {
      try {
        const qrCodeDataUrl = await QRCode.toDataURL(link);
        return qrCodeDataUrl;
      } catch (err) {
        console.error('Error generating QR code:', err);
        return null;
      }
    } else {
      return null;
    }
  };

  const handleNameChange = async (
    file_token: string,
    name: string,
    index: number
  ) => {
    try {
      const newFileName = `${name}`;
      const url = `${API_URL}/v2/filename?file_token=${file_token}&new_file_name=${newFileName}&file_index=${index}`;

      await axios.patch(url);
      setIsEditing(false); // Exit editing mode on successful update

      setData(
        data.map((each: FileData) =>
          each.file_index === index
            ? {
                ...each,
                file_name: newFileName,
                file_path: each.file_path.replace(/[^/]*$/, newFileName), // Update file path
              }
            : each
        )
      );
    } catch (error) {
      console.error('Error updating filename:', error);
    }
  };

  const handleDelete = async (file_token: string, index: number) => {
    const url = `${API_URL}/v2/delete-file?file_token=${file_token}`;
    try {
      setDeleting(true);
      const response = await axios.delete(url);
      if (response.status === 200) {
        const updatedData = data.filter(
          (each: FileData) => each.file_index !== index
        );
        setLoading(true);
        setData(updatedData);
        CustomToast({
          type: 'success',
          message: `File deleted successfully`,
        });
        if (updatedData.length === 0) {
          router.push('/');
          const clearUID = async () => {
            await clearDB(); // Redirect after clearing DB
          };
          clearUID();
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const fetchQRCode = async () => {
      const qrCode = await generateQR(url);
      setQr(qrCode || '');
    };

    fetchQRCode();
  }, [url]);

  const handleCopyURL = () => {
    navigator.clipboard
      ?.writeText(url)
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

  const handleDownloadZip = async () => {
    const url = `${API_URL}/v2/download-as-zip?uid=${uid}`;

    try {
      const response = await axios.get(url, {
        responseType: 'blob', // Important to handle binary data (zip file)
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/zip', // Expecting zip file in response
        },
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/zip' });
        const downloadUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `compressed_files_${uid}.zip`; // Name your zip file

        // Append anchor to the body
        document.body.appendChild(a);
        a.click();

        // Cleanup: Remove element and revoke the URL to release memory
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      console.error('Error downloading the zip file:', error);
    }
  };

  const handlePageExpired = async () => {
    const url = `${API_URL}/v2/download-page-expiry?UID=${uid}`;

    try {
      const response = await axios.patch(url);
      if (response.status === 200) {
        console.log('Page expiry updated successfully');
      }
    } catch (error) {
      console.error('Error updating page expiry:', error);
    }
  };

  return (
    <>
      {loading ? (
        <DownloadSkeleton />
      ) : (
        <>
          <div className="bg-[#163B45] dark:bg-[#3A3A3A] text-white rounded-lg w-full shadow-2xl">
            {/* header  */}
            <div className="flex md:flex-row flex-col md:gap-[10px] justify-center md:justify-normal items-center md:items-start border-white dark:border-gray-800 border-b-4 w-full md:p-4 p-2">
              <div className="w-full md:w-[56%] flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="max-w-full flex flex-col gap-2 md:gap-4 justify-start text-center md:text-start">
                  <h1 className="max-w-full text-[#FF8224] text-md font-bold md:text-base lg:text-lg xl:text-base 2xl:text-lg 3xl:text-xl leading-4 text-wrap">
                    {data.length > 1
                      ? t('header.title.plural')
                      : t('header.title.singular')}
                  </h1>
                  <p className="text-xs md:text-sm lg:text-md xl:text-sm 2xl:text-[0.875rem] text-center md:text-left">
                    {totalPdf} {t('header.filesTitle')} |{' '}
                    {helpers.formatFileSize(
                      parseFloat(totalInitialSize.toFixed(2))
                    )}
                    {t('header.total')}
                  </p>
                </div>

                <div className="flex md:flex-col flex-row items-center gap-3 self-center">
                  <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] 3xl:text-[1.125rem] text-[#FF8224] leading-4 md:leading-6">
                    {compressionRatio.toFixed(2)}%
                  </p>
                  <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem] 3xl:text-[0.875rem] font-bold leading-4 md:leading-6 mt-0">
                    {helpers.formatFileSize(
                      parseFloat(totalUltimateSize.toFixed(2))
                    )}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[44%] flex flex-col md:flex-row items-center flex-wrap md:items-start justify-end md:gap-4 self-center">
                <div className="flex md:flex-col flex-row items-center gap-3">
                  <p className="text-xs md:text-[0.875rem] lg:text-[0.875rem] xl:text-[0.875rem] 2xl:text-[0.875rem] 3xl:text-[1.125rem] text-[#FF8224] leading-4 md:leading-6">
                    {t('header.timeLabel')}
                  </p>
                  <p className="text-xs md:text-sm lg:text-[0.875rem] xl:text-sm 2xl:text-[0.875rem]  3xl:text-[0.875rem] font-bold leading-4 md:leading-6">
                    {convertToTimeFormat(processingTime)} {t('header.time')}
                  </p>
                </div>

                <div className="text-end mt-2 md:mt-0">
                  <SplitButton
                    modalRef={modalRef}
                    label={
                      <ModalWithButton
                        disabled={!showModal}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        // disabled={false}
                        buttonLabel={
                          <button
                            className="flex items-center gap-2"
                            onClick={handleDownloadZip}
                          >
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
                            {t('header.buttonModal.label')}
                          </button>
                        }
                      >
                        <p className="text-[1.125rem] font-bold text-[#163B45] dark:text-slate-50 text-center">
                          Rate this!
                        </p>
                        <StarRating onRate={handleRatingSubmit} toolId={1} />
                      </ModalWithButton>
                    }
                    dropdownActions={[
                      {
                        label: (
                          <SaveDropBox
                            url={data[0]?.zip_download_link}
                            filename="compressed"
                          >
                            <span className="font-bold text-[#FAFAFA] flex items-center gap-3">
                              <Image
                                src={dropBoxIcon}
                                height={14}
                                width={14}
                                alt={'download to dropbox'}
                              />
                              {t('header.buttonModal.dropbox')}
                            </span>
                          </SaveDropBox>
                        ),
                      },
                      {
                        label: (
                          <SaveDrive PDF_URL={data[0]?.zip_download_link}>
                            <span className="font-bold text-[#FAFAFA] flex items-center gap-3">
                              <Image
                                src={googleDriveIcon}
                                height={14}
                                width={14}
                                alt={t('header.buttonModal.drive')}
                              />
                              {t('header.buttonModal.drive')}
                            </span>
                          </SaveDrive>
                        ),
                      },
                    ]}
                    onMainClick={() => {
                      //console.log('')
                    }}
                    className="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white focus:outline-none md:py-3 md:px-3 px-10  w-full text-sm md:text-[0.875rem] border-0 border-e-[1px] dark:border-0 dark:border-e-[1px] dark:border-[#dbdbdbe0]"
                    classNameDropdownIcon="bg-gradient-to-tl from-[#ff8224] to-[#b33f40] dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] hover:bg-gradient-to-tl hover:from-[#ff8224] hover:to-[#b33f40] dark:hover:bg-gradient-to-tl dark:hover:from-[#ff8224] dark:hover:to-[#b33f40] text-white border-0 dark:border-s-transparent"
                    classNameDropdown="bg-[#FF8224] dark:bg-[#FF8224] dark:hover:bg-[#ff7044] hover:bg-[#ff7044] text-white"
                  />
                </div>
              </div>
            </div>

            {data?.map((each, index) => (
              <FileItem
                key={index}
                file={each as FileData}
                handleDelete={handleDelete}
                handleNameChange={handleNameChange}
                storedState={storedState}
                deleting={deleting}
                modalRef={modalRef}
                toolId={toolId}
                addRating={addRating}
                showModal={showModal}
                setShowModal={setShowModal}
                handleRatingSubmit={handleRatingSubmit}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            ))}

            {/* Footer  */}
            <DownloadFooter
              handleCopyURL={handleCopyURL}
              qr={qr}
              t={t}
              timeLeft={timeLeft}
              url={url}
              handlePageExpired={handlePageExpired}
            />
          </div>
          {storedState && (
            <p className="text-[#A8A4A4] dark:text-[#E1DEDE] font-light text-base md:text-lg w-fit flex items-center mx-auto gap-1 my-[45px]">
              {t('footer.info')}
              <Link
                href={`/customize/${uid}`}
                className="text-[#B23F40] flex items-center gap-1 font-normal"
              >
                <Image
                  src={goBackIcon}
                  height={22}
                  width={22}
                  alt={t('footer.buttonLabel')}
                  unoptimized
                ></Image>
                {t('footer.buttonLabel')}
              </Link>
            </p>
          )}
        </>
      )}
    </>
  );
};

export default DownloadMain;
