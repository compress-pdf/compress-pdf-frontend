declare module 'react-dropbox-chooser' {
  import * as React from 'react';

  interface DropboxChooserProps {
    appKey: string;
    success: (files: any[]) => void;
    cancel?: () => void;
    linkType?: 'preview' | 'direct';
    multiselect?: boolean;
    extensions?: string[];
    folderselect?: boolean;
    children: React.ReactNode;
  }

  const DropboxChooser: React.FC<DropboxChooserProps>;

  export default DropboxChooser;
}
