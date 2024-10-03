import React from 'react';
import { useTranslations } from 'next-intl';

import Cloud from '@/components/common/blocks/Cloud';
import DraggableBox from '@/components/common/draggable/box';
import FileUploaderButton from '@/components/common/core/FileUploaderButton';

type Props = {
  handleFileChange: (files: FileList) => void;
  handleNewFiles: (files: File[]) => void;
  tool: string;
};

const BeforeUpload = ({ handleFileChange, handleNewFiles, tool }: Props) => {
  const t = useTranslations(tool);
  const tc = useTranslations('common');
  // const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <DraggableBox handleFileChange={handleFileChange}>
      <FileUploaderButton
        handleFileChange={handleFileChange}
        buttonLabel={tc('heroSectionTooltip.buttonLabel')}
        iconAlt={t('content.heroSection.imageAlt')}
      />
      <small className="text-[#6B7280] font-normal mb-[16.78px] text-[0.875rem] leading-[170%] md:">
        {t('content.heroSection.fileInfo')}
      </small>
      <p className="mb-[16.78px]">{tc('heroSectionTooltip.cloudInfo')}</p>
      <Cloud handleNewFiles={handleNewFiles} />
    </DraggableBox>
  );
};

export default BeforeUpload;
