'use client';
import { useState } from 'react';

type RangeSliderProps = {
  min: number; // Minimum value
  max: number; // Maximum value
  step: number; // Step value
  defaultValue?: number; // Default value (optional)
};

const RangeSlider = ({ min, max, step, defaultValue }: RangeSliderProps) => {
  const [value, setValue] = useState(defaultValue || min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  return (
    <div className="flex items-center w-full max-w-xl">
      {/* Range Slider */}
      <div className="relative w-full">
        <input
          aria-label="range-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition duration-300 ease-in-out"
          style={{
            background: `linear-gradient(to right, #ff8224 0%, #ff8224 ${
              ((value - min) / (max - min)) * 100
            }%, #E5E7EB ${((value - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
          }}
        />
      </div>

      {/* Value Label */}
      <div className="ml-4 text-gray-700 dark:text-gray-300 font-medium">
        {value}
      </div>
    </div>
  );
};

export default RangeSlider;
