export const INVALID_LINK = 'Please provide a valid PDF link!';
export const INVALID_FILE_TYPE = 'Only PDF files are allowed!';
export const CORRUPTED_FILE = 'Corrupted/Protected PDFs cannot be compressed!';
export const PASSWORD_PROTECTED_FILE =
  'Password-protected PDFs cannot be compressed!';
export const SIZE_LIMIT = (minimum: string, maximum: string, total: string) =>
  `File size exceeded (limit: Minimum : ${minimum}, Maximum : ${maximum}, Total : ${total})`;
export const MAX_FILE_NUMBERS = (number: number) =>
  `Maximum upload limit exceeded (limit: ${number} files)`;
export const PAGE_LIMIT_EXCEEDED = (maxPages: number, currentPages: number) =>
  `Maximum page limit exceeded (limit: ${maxPages} pages, current: ${currentPages} pages)`;
