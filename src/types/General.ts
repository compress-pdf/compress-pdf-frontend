export interface FileData {
  id: number;
  uid_fk: string;
  file_index: number;
  file_name: string;
  file_path: string;
  input_file_size: number;
  output_file_size: number;
  compression_ratio: number;
  processing_time: number;
  token: string | null;
  expire: string;
}
