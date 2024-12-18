import React from 'react';
import { useTranslations } from 'next-intl';

import Cloud from '@/components/common/blocks/Cloud';
import DraggableBox from '@/components/common/draggable/box';
import FileUploaderButton from '@/components/common/core/FileUploaderButton';
import { ToolsDataType } from '@/constants/toolsData';

type Props = {
  handleFileChange: (files: FileList) => void;
  handleNewFiles: (files: File[]) => void;
  tool: string;
  toolInfo: ToolsDataType;
};

const BeforeUpload = ({
  handleFileChange,
  handleNewFiles,
  tool,
  toolInfo,
}: Props) => {
  const t = useTranslations(tool);
  const tc = useTranslations('common');
  // const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <DraggableBox handleFileChange={handleFileChange}>
      <FileUploaderButton
        handleFileChange={handleFileChange}
        buttonLabel={tc('heroSectionTooltip.buttonLabel')}
        iconAlt={t('content.heroSection.imageAlt')}
        toolInfo={toolInfo}
      />
      <small className="text-[#6B7280] font-normal mb-[16.78px] text-[0.875rem] leading-[170%] md:">
        {t('content.heroSection.fileInfo', {
          file: toolInfo.totalFiles,
          size: toolInfo.totalFileSize / 1024,
          page: toolInfo.totalPages,
        })}
      </small>
      <p className="mb-[16.78px]">{tc('heroSectionTooltip.cloudInfo')}</p>
      <Cloud handleNewFiles={handleNewFiles} toolInfo={toolInfo} />
    </DraggableBox>
  );
};

export default BeforeUpload;
