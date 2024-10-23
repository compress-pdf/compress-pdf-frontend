/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useCompressionContext } from '@/context/CompressionContext';
import {
  numberToStringWithSign,
  stringWithSignToNumber,
} from '@/services/helpers';
import { getItemFromDB } from '@/services/indexedDB';

import FullwidthContainer from '../containers/FullwidthContainer';
import SectionContainer from '../containers/SectionContainer';
import RangeSlider from '../core/RangeSlider';
import { Button } from '../core/Button';
import ButtonGroup from '../core/ButtonGroup';
import Label from '../core/Label';

type CompressionLevelSliderProps = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
};

const CompressionLevelSlider = ({
  min,
  max,
  value,
  onChange,
}: CompressionLevelSliderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  const color = ['#ff8224', '#b33f40'];
  const ballSize = '24px';

  return (
    <div className="flex items-center w-full max-w-xl">
      <div className="relative w-full mt-[2px]">
        <input
          aria-label="compression-level-slider"
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className="w-full h-[12px] rounded-lg appearance-none cursor-pointer transition duration-300 ease-in-out dark:brightness-[.82]"
          style={{
            background: `linear-gradient(to right, ${color[0]} 0%, ${
              color[1]
            } ${((value - min) / (max - min)) * 100}%, #E5E7EB ${
              ((value - min) / (max - min)) * 100
            }%, #E5E7EB 100%)`,
          }}
        />
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: ${ballSize};
            height: ${ballSize};
            border-radius: 50%;
            background: linear-gradient(to top left, ${color[0]}, ${color[1]});
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: ${ballSize};
            height: ${ballSize};
            border-radius: 50%;
            background: linear-gradient(to top left, ${color[0]}, ${color[1]});
            cursor: pointer;
          }
        `}</style>
      </div>

      <div className="ml-4 text-gray-300 text-[0.625rem] font-semibold py-[1.5px] px-[9.5px] rounded bg-[#3a3a3a] dark:bg-[#545454]">
        {value}
      </div>
    </div>
  );
};

const CustomizeSection = ({
  children,
  staticCustomize,
  saved_uid,
}: {
  children: React.ReactNode;
  staticCustomize: boolean;
  saved_uid: string;
}) => {
  const {
    state,
    updateCompressionType,
    updateCompressLevel,
    updateEnhancementLevel,
    updateDpi,
    updateRgb,
  } = useCompressionContext();

  const t = useTranslations('common.custom');

  const { compressLevel, rgb, dpi, enhancementLevel, compressType } = state;
  // Manage compress type with specific states
  const [compressionType, setcompressionType] = useState<
    'by-level' | 'by-level-no-img' | 'by-img'
  >(compressType);

  // State for the buttons: Extreme Compression, Medium Compression, etc.
  const [selectedCompression, setSelectedCompression] = useState(
    t('compression.medium')
  );
  const [compressionLevel, setCompressionLevel] = useState(compressLevel);
  const [imageEnhancement, setImageEnhancement] = useState(
    stringWithSignToNumber(enhancementLevel as string)
  );
  const [imageResolution, setImageResolution] = useState(dpi);
  const [imageColorScope, setImageColorScope] = useState<boolean>(
    rgb === 'rgb' ? true : false
  );
  const [imageFiles, setImageFiles] = useState(
    compressionType === 'by-level-no-img' ? false : true
  ); // true for Keep, false for Remove

  // State to manage active sections
  const [isByLevelActive, setIsByLevelActive] = useState(true);
  const [isByImageActive, setIsByImageActive] = useState(false);

  useEffect(() => {
    const fetchDataFromDB = async () => {
      if (staticCustomize) {
        try {
          const storedData = await getItemFromDB(saved_uid);

          if (storedData) {
            // Set the button selection based on the stored compression level
            if (storedData.compressLevel >= 7) {
              setSelectedCompression('Extreme Compression');
            } else if (storedData.compressLevel >= 4) {
              setSelectedCompression('Medium Compression');
            } else {
              setSelectedCompression('Less Compression');
            }
            setCompressionLevel(storedData.compressLevel || 5);
            setImageEnhancement(
              stringWithSignToNumber(storedData.enhancementLevel || '0')
            );
            setImageResolution(storedData.dpi || 150);
            setImageColorScope(storedData.rgb === 'rgb');
            setcompressionType(storedData.compressType || 'by-level');
            setImageFiles(storedData.compressType !== 'by-level-no-img');

            if (storedData.compressType === 'by-img') {
              setIsByLevelActive(false);
              setIsByImageActive(true);
            } else if (storedData.compressType === 'by-level') {
              setIsByLevelActive(true);
              setIsByImageActive(false);
            } else if (storedData.compressType === 'by-level-no-img') {
              setIsByLevelActive(true);
              setIsByImageActive(false);
            }
          }
        } catch (error) {
          console.error('Error fetching data from IndexedDB:', error);
        }
      }
    };

    fetchDataFromDB();
  }, [staticCustomize, saved_uid]);

  useEffect(() => {
    updateCompressionType(compressionType);
    updateCompressLevel(compressionLevel || 5);
    updateEnhancementLevel(numberToStringWithSign(imageEnhancement));
    updateDpi(imageResolution || 150);
    updateRgb(imageColorScope ? 'rgb' : 'grayscale');
  }, [
    compressionLevel,
    imageEnhancement,
    imageResolution,
    imageColorScope,
    compressionType,
    isByLevelActive,
    isByImageActive,
    compressionType,
    imageFiles,
  ]);

  // Update compression level based on selected button
  useEffect(() => {
    switch (selectedCompression) {
      case t('compression.extreme'):
        setCompressionLevel(9);
        break;
      case t('compression.medium'):
        setCompressionLevel(6);
        break;
      case t('compression.low'):
        setCompressionLevel(3);
        break;
      default:
        setCompressionLevel(5);
    }
  }, [selectedCompression]);

  // Update compressionType state based on imageFiles and active section
  useEffect(() => {
    if (isByImageActive) {
      setcompressionType('by-img');
    } else if (isByLevelActive && imageFiles) {
      setcompressionType('by-level');
    } else if (isByLevelActive && !imageFiles) {
      setcompressionType('by-level-no-img');
    }
  }, [isByLevelActive, isByImageActive, imageFiles]);

  const toggleByLevel = () => {
    setIsByLevelActive(true);
    setIsByImageActive(false);
    setImageFiles(true); // Set to Keep
  };

  const toggleByImage = () => {
    setIsByLevelActive(false);
    setIsByImageActive(true);
    setImageFiles(true); // Default to Keep
  };

  const handleRemoveClick = () => {
    setIsByImageActive(false);
    setIsByLevelActive(true);
    setImageFiles(false); // Set to Remove
  };
  // Handle changes for both slider and button selection
  const handleCompressionLevelChange = (value: number) => {
    setCompressionLevel(value);

    // Update the button selection based on the slider value
    if (value >= 7) {
      setSelectedCompression('Extreme Compression');
    } else if (value >= 4) {
      setSelectedCompression('Medium Compression');
    } else {
      setSelectedCompression('Less Compression');
    }
  };

  const handleButtonSelection = (label: string) => {
    setSelectedCompression(label);

    // Update the slider value based on button selection
    switch (label) {
      case 'Extreme Compression':
        setCompressionLevel(9);
        break;
      case 'Medium Compression':
        setCompressionLevel(6);
        break;
      case 'Less Compression':
        setCompressionLevel(3);
        break;
      default:
        setCompressionLevel(5);
    }
  };

  return (
    <FullwidthContainer className="mb-[130px]">
      <SectionContainer className="flex flex-wrap items-center gap-[9px] md:gap-[1.54%] lg:gap-[1.18%] xl:gap-[1.54%] 2xl:gap-[1.18%] 3xl:gap-[1.5%] mt-[30px] justify-between border-t border-[#EAEAEA] dark:border-[#54545487]">
        {/* By Level Container */}
        <div
          className={`by-level relative flex flex-col gap-[8px] w-full self-stretch justify-center rounded-[5px] md:w-[31.21%] lg:w-[27.65%] xl:w-[31.12%] 2xl:w-[27.65%] 3xl:w-[25%] bg-white dark:bg-[#3a3a3a] p-[14px] my-[14px] ${
            !isByLevelActive ? 'opacity-30' : ''
          }`}
          onClick={isByLevelActive ? undefined : toggleByLevel}
          onKeyDown={e => {
            if (!isByLevelActive && (e.key === 'Enter' || e.key === ' ')) {
              toggleByLevel();
            }
          }}
          tabIndex={isByLevelActive ? -1 : 0} // Make it focusable when it's not active
          role="button" // Indicate that this div acts as a button
          aria-pressed={isByLevelActive} // ARIA attribute to indicate the pressed state
          aria-label="Toggle Compression Level"
        >
          <p> {t('compression.title')} </p>

          <CompressionLevelSlider
            min={1}
            max={9}
            value={compressionLevel || 0}
            onChange={handleCompressionLevelChange}
          />

          {[
            t('compression.extreme'),
            t('compression.medium'),
            t('compression.low'),
          ].map(label => (
            <Button
              key={label}
              className={`w-full px-0 py-[5.5px] rounded-[3.49px] justify-center transition-none ${
                selectedCompression !== label
                  ? 'text-[#B33F40] bg-gradient-to-tl from-[#b33f400d] to-[#b33f400d]  dark:from-[#545454] dark:to-[#545454] dark:text-white '
                  : 'dark:dark:bg-gradient-to-tl dark:bg-gradient-to-tl dark:from-[#ff8224] dark:to-[#b33f40] dark:text-white'
              } `}
              onClick={() => handleButtonSelection(label)}
            >
              {label}
            </Button>
          ))}
        </div>
        <span className="w-[5px] self-stretch bg-[#e8e8e8] dark:bg-[#3a3a3a] rounded-lg justify-center items-center hidden md:block my-[14px]">
          {/* Empty Content or Placeholder */}
        </span>

        {/* By Image Container */}
        <div
          className={`by-image flex items-center flex-wrap md:flex-nowrap gap-[5px] w-full md:w-[61.25%] lg:w-[47.58%] xl:w-[61.34%] 2xl:w-[47.58%] 3xl:w-[50.5%] self-stretch p-[14px] px-0`}
          onClick={isByImageActive ? undefined : toggleByImage}
          onKeyDown={
            isByImageActive
              ? undefined
              : e => e.key === 'Enter' && toggleByImage()
          }
          tabIndex={isByImageActive ? -1 : 0}
          role="button"
        >
          <div className="flex flex-col justify-between w-full md:w-1/2 self-stretch gap-[20px] flex-1">
            <div
              className={`px-[14px] py-[10px] bg-white dark:bg-[#3a3a3a] rounded-[5px] flex-1 ${
                !isByImageActive ? 'opacity-30' : ''
              }`}
            >
              <Label
                text={t('imageEnhancement.rangeLabel')}
                tooltipContent={t('imageEnhancement.rangeTooltip')}
              />
              <RangeSlider
                min={-3}
                max={3}
                defaultValue={imageEnhancement}
                onChange={setImageEnhancement}
                type="red"
              />
            </div>
            <div
              className={`px-[14px] py-[10px] bg-white dark:bg-[#3a3a3a] rounded-[5px] flex-1 flex flex-col ${
                !isByImageActive ? 'opacity-30' : ''
              }`}
            >
              <Label
                text={t('imageEnhancement.buttonLabel')}
                tooltipContent={t('imageEnhancement.buttonTooltip')}
              />
              <ButtonGroup
                options={[
                  t('imageEnhancement.btnLabelOne'),
                  t('imageEnhancement.btnLabelTwo'),
                ]}
                value={imageColorScope}
                setValue={setImageColorScope}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between w-full md:w-1/2 self-stretch gap-[20px] flex-1">
            <div
              className={`px-[14px] py-[10px] bg-white dark:bg-[#3a3a3a] rounded-[5px] flex-1  ${
                !isByImageActive ? 'opacity-30' : ''
              }`}
            >
              <Label
                text={t('imageResolution.rangeLabel')}
                tooltipContent={t('imageResolution.rangeTooltip')}
              />
              <RangeSlider
                min={72}
                max={300}
                defaultValue={imageResolution}
                onChange={setImageResolution}
                stepsArray={[72, 100, 150, 200, 250, 300]}
                type="red"
              />
            </div>
            <div
              className={`px-[14px] py-[10px] bg-white dark:bg-[#3a3a3a] rounded-[5px] flex-1 flex flex-col  ${
                !isByImageActive && imageFiles ? 'opacity-30' : ''
              }`}
            >
              <Label
                text={t('imageResolution.buttonLabel')}
                tooltipContent={t('imageResolution.buttonTooltip')}
              />
              <ButtonGroup
                options={[
                  t('imageResolution.btnLabelOne'),
                  t('imageResolution.btnLabelTwo'),
                ]}
                value={imageFiles}
                setValue={newValue => {
                  setImageFiles(newValue);
                  if (!newValue) {
                    handleRemoveClick(); // Call to handle Remove action
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="button w-full md:w-[100%] lg:w-[17.39%] xl:w-[100%] 2xl:w-[17.39%] 3xl:w-[17.2%] self-stretch pl-[20px] flex-1 py-[14px]">
          {children}
        </div>
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default CustomizeSection;
