import { useState, useEffect } from 'react';

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  stepsArray?: number[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  type?: 'basic' | 'red' | 'red-center';
};

const RangeSlider = ({
  min,
  max,
  step = 1,
  type = 'basic',
  stepsArray,
  defaultValue,
  onChange,
}: RangeSliderProps) => {
  const [value, setValue] = useState(
    defaultValue !== undefined ? defaultValue : min
  );

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = Number(e.target.value);
    if (stepsArray && stepsArray.length > 0) {
      const closestStep = stepsArray.reduce((prev, curr) =>
        Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
      );
      newValue = closestStep;
    }
    setValue(newValue);
  };

  const color =
    type === 'basic' ? ['#ff8224', '#b33f40'] : ['#B23F40', '#B23F40'];
  const ball = type === 'basic' ? '24px' : '16px';

  return (
    <div className="flex items-center w-full max-w-xl">
      <div className="relative w-full mt-[2px]">
        <input
          aria-label="range-slider"
          type="range"
          min={min}
          max={max}
          step={stepsArray ? 1 : step}
          value={value}
          onChange={handleChange}
          className={`w-full ${
            type === 'basic' ? 'h-[12px]' : 'h-[6px]'
          } rounded-lg appearance-none cursor-pointer transition duration-300 ease-in-out dark:brightness-[.82]`}
          style={{
            background: `linear-gradient(to right, ${color[0]} 0%, ${
              color[1]
            } ${((value - min) / (max - min)) * 100}%, #E5E7EB ${
              ((value - min) / (max - min)) * 100
            }%, #E5E7EB 100%)`,
          }}
          // eslint-disable-next-line react/jsx-no-comment-textnodes
        />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: ${ball};
            height: ${ball};
            border-radius: 50%;
            background: linear-gradient(to top left, ${color[0]}, ${color[1]});
            cursor: pointer;
          }
          input[type='range']::-moz-range-thumb {
            width: ${ball};
            height: ${ball};
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

export default RangeSlider;
