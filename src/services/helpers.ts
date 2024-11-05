import { DropboxFile } from 'react-dropbox-chooser';
import * as pdfjsLib from 'pdfjs-dist';

import CustomToast from '@/components/common/core/ToastMessage';
import { FileData } from '@/types/General';

// Define types for the objects with 'name' property
interface NamedObject {
  name: string;
}

interface FileObject {
  size: number;
  type: string;
}

const sortAsc = (a: NamedObject, b: NamedObject): number => {
  const partsA = a.name.split(/(\d+)/).filter(Boolean);
  const partsB = b.name.split(/(\d+)/).filter(Boolean);

  const minLen = Math.min(partsA.length, partsB.length);

  for (let i = 0; i < minLen; i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    if (i % 2 === 0) {
      // Compare string parts
      const comparison = partA.localeCompare(partB);
      if (comparison !== 0) {
        return comparison;
      }
    } else {
      // Compare number parts as integers
      const numA = parseInt(partA, 10);
      const numB = parseInt(partB, 10);
      if (numA !== numB) {
        return numA - numB;
      }
    }
  }

  // If all common parts are the same, the shorter string should come first
  return partsA.length - partsB.length;
};

const debounce = (func: (...args: unknown[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: unknown[]) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const sortDesc = (a: NamedObject, b: NamedObject): number => {
  const partsA = a.name.split(/(\d+)/).filter(Boolean);
  const partsB = b.name.split(/(\d+)/).filter(Boolean);

  const minLen = Math.min(partsA.length, partsB.length);

  for (let i = 0; i < minLen; i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    if (i % 2 === 0) {
      // Compare string parts
      const comparison = partB.localeCompare(partA);
      if (comparison !== 0) {
        return comparison;
      }
    } else {
      // Compare number parts as integers
      const numA = parseInt(partA, 10);
      const numB = parseInt(partB, 10);
      if (numA !== numB) {
        return numB - numA;
      }
    }
  }

  // If all common parts are the same, the shorter string should come first
  return partsB.length - partsA.length;
};

const getPathName = (path: string): string => {
  const expl = path.split('/');
  return expl[2];
};

const getLocale = (path: string): string => {
  const expl = path.split('/');
  return expl[1];
};

const getFileSize = (file: FileObject): string => {
  const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
  return sizeInMb;
};

interface PdfFile {
  numPages: number;
  color: string;
  fileSize: number;
}

const mergingParsePdfPages = (
  parsePdf: PdfFile[],
  mergedPagesArray: unknown[]
): unknown[] => {
  parsePdf.forEach((pdf, pdfIndex) => {
    Array.from({ length: pdf.numPages }).forEach((_, pageIndex) => {
      const pageNumber = pageIndex + 1;
      const color = pdf.color;
      const totalPages = pdf.numPages;
      const fileSize = pdf.fileSize;
      const rotation = 0;
      mergedPagesArray.push({
        pdfIndex,
        pdf,
        pageIndex,
        pageNumber,
        color,
        totalPages,
        fileSize,
        rotation,
      });
    });
  });
  return mergedPagesArray;
};

const getRotationValues = (): number[] => [0, 90, 180, 270];

const getRandomColor = (): string => {
  const colorList = [
    '#EE534F',
    '#FF6D00',
    '#D47751',
    '#F1B813',
    '#FF9201',
    '#FFAB41',
    '#FF8D70',
    '#FF9899',
    '#FD7D96',
    '#F76CAF',
    '#C858BA',
    '#C282FA',
    '#30A0E0',
    '#73BFF3',
    '#97BAFF',
    '#9A9CEA',
    '#BCBDFB',
    '#A9CEFC',
    '#E4BBD5',
    '#A77A95',
    '#F7C472',
    '#D39E45',
    '#F8EECA',
    '#E4C7B2',
    '#3AADA8',
    '#1FBABF',
    '#24AFC1',
    '#5FBEC4',
    '#80CCE3',
    '#73B0CD',
    '#96DFCE',
    '#7BC5C1',
    '#60E3D5',
    '#88F4FF',
    '#60D3AA',
    '#73A2AC',
    '#94BDCF',
    '#8FA5B2',
    '#7C8DA5',
    '#97CBDC',
    '#78A6C8',
    '#5E9387',
    '#92DE8B',
    '#88C15F',
    '#8FC79A',
    '#F1EB86',
    '#E8D743',
    '#A7B987',
    '#929C3B',
    '#A09D52',
    '#898C6F',
    '#ABC337',
    '#BC8867',
    // Add more color classes as needed
  ];

  const randomIndex = Math.floor(Math.random() * colorList.length);
  return colorList[randomIndex];
};

const getTruncatedFileName = (fileName: string): string => {
  const maxLength = 15;

  let truncatedFileName;

  if (fileName.length > maxLength) {
    const fileNameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
    const extension = fileName.split('.').pop();

    if (fileNameWithoutExtension.includes('_')) {
      const parts = fileNameWithoutExtension.split('_');
      const truncatedParts = parts.map(part =>
        part.slice(0, Math.floor(maxLength / parts.length))
      );
      truncatedFileName = truncatedParts.join('_') + '...' + extension;
    } else {
      truncatedFileName =
        fileNameWithoutExtension.slice(0, maxLength) + '...' + extension;
    }
  } else {
    truncatedFileName = fileName;
  }

  return truncatedFileName;
};

const matchNoPdfFiles = (files: FileList): boolean => {
  const noPdfFiles = Array.from(files).filter(
    file => !file?.type?.startsWith('application/pdf')
  );

  return noPdfFiles.length > 0;
};

const matchNoExcelFiles = (files: FileList): boolean => {
  const noExcelFiles = Array.from(files).filter(
    file =>
      !file.type.startsWith(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) && !file.type.startsWith('application/vnd.ms-excel')
  );

  return noExcelFiles.length > 0;
};

const hexToRgb = (hex: string): string | null => {
  if (hex.trim() === '') return null;
  hex = hex.replace(/^#/, '');
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `(${r},${g},${b})`;
};

type Func = (...args: unknown[]) => never;

const memorize = <T extends Func>(fn: T) => {
  const cache: { [key: string]: ReturnType<T> } = {};

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (!(key in cache)) {
      cache[key] = fn(...args) as ReturnType<T>; // Ensure the return type matches ReturnType<T>
    }
    return cache[key];
  };
};

const checkFileSizeWithLength = (
  previousFiles: FileObject[],
  newFiles: FileObject[],
  size: number,
  fileLength: number
): boolean => {
  const fileConcat = previousFiles.concat(newFiles);
  const totalSizeBytes = fileConcat.reduce(
    (total, file) => total + file.size,
    0
  );
  const totalSize = totalSizeBytes / (1024 * 1024);

  return totalSize >= size || fileConcat.length > fileLength;
};

export const detectTheme = (): 'light' | 'dark' => {
  // This could be improved by using a React Context or checking localStorage, Tailwind's dark mode class, etc.
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const validatePdfFiles = async (
  files: FileList,
  maxFiles: number,
  maxSizeMB: number,
  maxSingleFilePages: number,
  minSingleFileSizeKB: number,
  maxSingleFileSizeKB: number
): Promise<{ valid: boolean; messages: string[] }> => {
  const messages: string[] = [];

  // Step 1: Check for total file size and number of files
  const totalSizeMB = Array.from(files).reduce(
    (total, file) => total + file.size / (1024 * 1024), // Convert size from bytes to MB
    0
  );

  if (files.length > maxFiles) {
    messages.push(
      `Maximum upload limit exceeded: Only ${maxFiles} files are allowed.`
    );
  }

  if (totalSizeMB > maxSizeMB) {
    messages.push(
      `Maximum size limit exceeded: Total size must be under ${maxSizeMB} MB.`
    );
    return { valid: false, messages }; // Early exit if size exceeds the limit
  }

  // Step 2: Validate each PDF file for type, size, page count, corruption, and password protection
  await Promise.all(
    Array.from(files).map(async file => {
      // Validate file type
      if (!file.type || !file.type.startsWith('application/pdf')) {
        messages.push('Only PDF files are allowed.');
        return;
      }

      // Validate single file size in KB
      const fileSizeKB = file.size / 1024; // Convert file size from bytes to KB
      if (fileSizeKB < minSingleFileSizeKB) {
        messages.push(`Each file must be at least ${minSingleFileSizeKB} KB.`);
        return;
      }
      if (fileSizeKB > maxSingleFileSizeKB) {
        // Determine whether to show size in KB or MB
        const maxSizeMessage =
          maxSingleFileSizeKB >= 1024
            ? `${(maxSingleFileSizeKB / 1024).toFixed(2)} MB`
            : `${maxSingleFileSizeKB} KB`;
        messages.push(`Each file must not exceed ${maxSizeMessage}.`);
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer })
          .promise;

        // Step 3: Check for corrupted files (by accessing the first page)
        await pdfDoc.getPage(1);

        // Step 4: Check individual file page count
        if (pdfDoc.numPages > maxSingleFilePages) {
          messages.push(
            `File "${file.name}" exceeds the maximum allowed page count of ${maxSingleFilePages}.`
          );
          return;
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'PasswordException') {
          messages.push('Password-protected PDFs cannot be compressed.');
        } else {
          console.error('Error reading PDF:', error);
          messages.push(`An error occurred while processing "${file.name}".`);
        }
      }
    })
  );

  // Step 6: Return validation result
  const valid = messages.length === 0;
  return { valid, messages };
};

export type ValidationResult = {
  valid: boolean;
  messages: string[];
};

export const validatePdfLink = async (
  link: string,
  maxSizeKB: number,
  errorMessage: string
): Promise<ValidationResult> => {
  const validationResult: ValidationResult = {
    valid: true,
    messages: [],
  };

  try {
    // Step 1: Check if the link is a PDF by checking the extension
    if (!link.toLowerCase().endsWith('.pdf')) {
      validationResult.valid = false;
      validationResult.messages.push(errorMessage);
      return validationResult;
    }

    // Step 2: Validate that the link is accessible
    // Step 1: Make a HEAD request to check the file size before downloading
    const response = await fetch(link, { method: 'HEAD' });
    if (!response.ok) {
      validationResult.valid = false;
      validationResult.messages.push(errorMessage);
      return validationResult;
    }

    // Step 2: Check Content-Type header to ensure it's a PDF
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.startsWith('application/pdf')) {
      validationResult.valid = false;
      validationResult.messages.push(errorMessage);
      return validationResult;
    }

    // Step 3: Check file size
    const contentLength = response.headers.get('content-length');
    if (contentLength) {
      const fileSizeKB = parseInt(contentLength, 10) / 1024; // Convert bytes to KB

      if (fileSizeKB > maxSizeKB) {
        validationResult.valid = false;
        validationResult.messages.push(
          `Maximum file size exceeded (limit: ${maxSizeKB / 1024} MB).`
        );
        return validationResult; // Early return if file size exceeds the limit
      }
    } else {
      validationResult.valid = false;
      validationResult.messages.push('Could not determine the file size.');
      return validationResult;
    }

    // Step 4: Proceed with the full request if file size is within the limit
    const pdfResponse = await fetch(link);
    if (pdfResponse.ok) {
      const fileContent = await pdfResponse.arrayBuffer();
      const uint8Array = new Uint8Array(fileContent);
      const decoder = new TextDecoder('utf-8');
      const textContent = decoder.decode(uint8Array);

      // Basic check for corruption
      if (!textContent.startsWith('%PDF-')) {
        validationResult.valid = false;
        validationResult.messages.push('Corrupted PDFs cannot be compressed.');
      }

      // Basic check for password protection
      if (textContent.includes('/Encrypt')) {
        validationResult.valid = false;
        validationResult.messages.push(
          'Password-protected PDFs cannot be compressed.'
        );
      }
    }
  } catch (error) {
    validationResult.valid = false;
    validationResult.messages.push(errorMessage);
  }

  return validationResult;
};

export function fileArrayToFileList(filesArray: File[]) {
  const dataTransfer = new DataTransfer(); // Use DataTransfer to create a FileList-like object
  filesArray.forEach(file => dataTransfer.items.add(file)); // Add each file to the DataTransfer object
  return dataTransfer.files; // This returns a FileList
}

export function fileListToFileArray(fileList: FileList): File[] {
  return Array.from(fileList);
}

export function numberToStringWithSign(number: number) {
  return number > 0 ? `+${number}` : `${number}`;
}
export function stringWithSignToNumber(str: string) {
  return parseInt(str, 10);
}

export const calculateTimeLeft = (expireTime: string) => {
  // Get the current time
  const now = new Date();

  // Get the expiration time
  const expireDate = new Date(expireTime);

  // Calculate the difference in milliseconds
  const difference = expireDate.getTime() - now.getTime();

  // If the difference is negative, the time has already passed
  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const findEarliestExpireTime = (data: FileData[]) => {
  if (!data || data.length === 0) return null;

  return data.reduce((earliest, current) => {
    return new Date(current.expire) < new Date(earliest.expire)
      ? current
      : earliest;
  }).expire;
};

export const convertToTimeFormat = (seconds: number): string => {
  // Round down to get the whole number of seconds
  const totalSeconds = Math.floor(seconds);

  // Get minutes and seconds
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  // Format minutes and seconds as two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export function transformToArray(data: Record<string, unknown>): unknown[] {
  return Object.keys(data).map(key => data[key]);
}

export const apiTracker = async () => {
  const res = await fetch('https://freeipapi.com/api/json');
  const data = await res.json();

  return data;
};

export function isAnyLarge(files: { sizeBytes?: number; bytes?: number }[]) {
  // Calculate the total size of all picked files in bytes, accounting for both Google Drive and Dropbox file size fields
  const totalSize = files.reduce((acc, file) => {
    return acc + (file.sizeBytes || file.bytes || 0); // Add sizeBytes for Google Drive or bytes for Dropbox
  }, 0);

  // Define the 50MB limit in bytes
  const limit = 50 * 1024 * 1024;

  // Check if total size exceeds 50MB
  if (totalSize > limit) {
    // Display a message or handle error
    CustomToast({
      type: 'error',
      message: `Maximum size limit exceeded: Total size must be under 50 MB.`,
    });
    // You can replace the console.error with a custom toast or error handler
    return true;
  } else {
    // console.log('Total file size is within the limit.');
    return false;
  }
}

export const isAnyLargeDropbox = (files: DropboxFile[]): boolean => {
  const limit = 50 * 1024 * 1024; // 50MB in bytes
  const largeFile = files.some(file => file.bytes > limit);

  if (largeFile) {
    CustomToast({
      type: 'error',
      message: `Maximum size limit exceeded: Total size must be under 50 MB.`,
    });
    return true; // File is too large
  }

  return false; // All files are within size limit
};

export async function fetchDropboxFileSize(file: DropboxFile): Promise<number> {
  try {
    const response = await fetch(file.link, {
      method: 'HEAD', // Use HEAD to only fetch headers, not the entire file
    });

    const fileSize = response.headers.get('content-length');
    return fileSize ? parseInt(fileSize, 10) : 0;
  } catch (error) {
    console.error('Error fetching file size:', error);
    return 0; // Return 0 if there's an error fetching the file size
  }
}

const helpers = {
  hexToRgb,
  sortAsc,
  sortDesc,
  getPathName,
  getLocale,
  getFileSize,
  getRandomColor,
  mergingParsePdfPages,
  getRotationValues,
  getTruncatedFileName,
  matchNoPdfFiles,
  validatePdfFiles,
  matchNoExcelFiles,
  memorize,
  debounce,
  checkFileSizeWithLength,
};

export default helpers;
