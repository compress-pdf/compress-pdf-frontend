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
  matchNoExcelFiles,
  memorize,
  debounce,
  checkFileSizeWithLength,
};

export default helpers;
