declare module 'react-dropbox-chooser' {
  import { Component, ReactNode } from 'react';

  interface DropboxFile {
    name: string;
    link: string;
    bytes: number;
    icon: string;
    isDir: boolean;
    [key: string]: unknown; // For additional properties Dropbox may add
  }

  interface DropboxChooserProps {
    appKey: string; // Your Dropbox app key
    success: (files: DropboxFile[]) => void; // Function called upon file selection
    cancel?: () => void; // Optional function called on cancel
    multiselect?: boolean; // Allows selecting multiple files
    extensions?: string[]; // List of file extensions to allow
    linkType?: 'preview' | 'direct'; // Type of link for the files ('preview' or 'direct')
    sizeLimit?: number; // Maximum file size in bytes
    folderselect?: boolean;
    children?: ReactNode; // Children elements inside the chooser component
  }

  export default class DropboxChooser extends Component<DropboxChooserProps> {}
}
