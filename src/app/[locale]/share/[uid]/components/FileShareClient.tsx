'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/common/core/Button';
import Preview from '@/components/pages/preview/Preview';
import { API_URL } from '@/constants/credentials/const';
import Spinner from '@/components/common/core/Spinner';

interface FileData {
  file_name: string;
  file_token: string;
  file_path: string;
  expire: string;
}

export function FileShareClient({ uid }: { uid: string }) {
  const [fileData, setFileData] = useState<FileData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const calculateTimeRemaining = (expireDate: string) => {
    const now = new Date();
    const expire = new Date(expireDate);
    const diff = expire.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.compresspdf.to/v2/single-file-data?file_token=${uid}`
        );

        if (response.status === 200 && response.data.file_1) {
          setFileData(response.data.file_1);
        } else {
          router.push('/not-found');
        }
      } catch (error) {
        console.error('Error fetching file data:', error);
        router.push('/not-found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [uid, router]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (fileData?.expire) {
      setTimeRemaining(calculateTimeRemaining(fileData.expire));

      timer = setInterval(() => {
        const remaining = calculateTimeRemaining(fileData.expire);
        setTimeRemaining(remaining);

        if (remaining === 'Expired') {
          clearInterval(timer);
          router.push('/not-found');
        }
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [fileData, router]);

  const handleDownload = async () => {
    if (!fileData) return;

    setIsDownloading(true);

    try {
      const response = await axios.get(
        `https://api.compresspdf.to/v2/download-as-file?file_token=${fileData.file_token}`,
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/pdf',
          },
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.file_name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        router.push('/not-found');
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
      router.push('/not-found');
    } finally {
      setIsDownloading(false);
    }
  };

  const url = fileData
    ? `${API_URL}/${
        fileData.file_path.endsWith('.pdf')
          ? fileData.file_path
          : fileData.file_path + '.pdf'
      }`
    : '';

  if (isLoading) {
    return <Spinner className="mb-4" />;
  }

  if (!fileData) {
    router.push('/not-found');
    return null;
  }

  return (
    <>
      <p
        className="mb-3 text-lg sm:text-xl md:text-2xl text-slate-900 dark:text-slate-100 font-bold text-center"
        title={fileData.file_name}
      >
        {fileData.file_name.length > 20
          ? `${fileData.file_name.slice(0, 20)}...pdf`
          : fileData.file_name}
      </p>

      <p className="text-sm sm:text-base md:text-lg mb-3 text-center">
        Shared file expires in {timeRemaining}
      </p>
      <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8 w-full">
        <Preview url={url} noStyle={true}>
          <Button className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base md:text-lg font-bold shadow-md">
            Preview
          </Button>
        </Preview>
        <Button
          className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base md:text-lg font-bold shadow-md"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </Button>
      </div>
    </>
  );
}

export default FileShareClient;
