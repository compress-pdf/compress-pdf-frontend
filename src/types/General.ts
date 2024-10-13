export interface FileData {
  status_code: number; // Added to reflect the status code in the API response
  message: string; // Added to reflect the message in the API response
  file_name: string;
  file_path: string;
  compression_ratio: number;
  input_file_size: number;
  output_file_size: number;
  processing_time: number;
  expire: string;
  info_link: string; // Added to reflect the info_link in the API response
  zip_download_link: string; // Added to reflect the zip_download_link in the API response
  single_download_link: string; // Added to reflect the single_download_link in the API response
  uid_fk: string;
  file_index: number;
}
