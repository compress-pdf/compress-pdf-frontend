'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const GoogleDrive = dynamic(() => import('./GoogleDrive'), { ssr: false });

import { useTranslations } from 'next-intl';

import Tooltip from '../core/Tooltip';

// import OneDrive from './OneDrive';
import DropBox from './DropBox';
import LinkComponent from './LinkComponent';

type Props = {
  handleNewFiles: (files: File[]) => void;
};

const Cloud = ({ handleNewFiles }: Props) => {
  const t = useTranslations('common');

  return (
    <div className="flex gap-1 lg:gap-4 h-[32.4px] lg:h-[50px] xl:h-[32.4px] xl:gap-[4px] 2xl:h-[50px] 2xl:gap-4">
      <Tooltip content={t('heroSectionTooltip.drive')}>
        <GoogleDrive handleNewFiles={handleNewFiles} />
      </Tooltip>
      {/* <Tooltip content={t('heroSectionTooltip.onedrive')}>
        <OneDrive handleNewFiles={handleNewFiles} />
      </Tooltip> */}
      <Tooltip content={t('heroSectionTooltip.dropbox')}>
        <DropBox handleNewFiles={handleNewFiles} />
      </Tooltip>
      <LinkComponent handleNewFiles={handleNewFiles} />
    </div>
  );
};

export default Cloud;
