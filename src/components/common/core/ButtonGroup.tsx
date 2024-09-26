import React from 'react';

type ButtonGroupProps = {
  options: string[]; // Array of button labels
  value: boolean; // Currently selected value (true for Original, false for GrayScale)
  setValue: (value: boolean) => void; // Function to update selected value
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  value,
  setValue,
}) => {
  return (
    <div
      className="inline-flex rounded-[10px] shadow-sm mt-[8px] border-[1.26px] w-full"
      role="group"
    >
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          className={`inline-flex items-center p-4 text-sm font-semibold w-1/2 justify-center border ${
            index === 0 && 'rounded-s-[8.25px]'
          } ${index === options.length - 1 && 'rounded-e-[8.35px]'} ${
            (value && option === options[0]) ||
            (!value && option === options[1])
              ? 'bg-[#B23F40] text-white shadow-inner shadow-[0px 4px 4px 0px] shadow-[#00000025] border-[#B23F40]'
              : 'text-[#B23F40] bg-transparent'
          } hover:bg-[#B23F4060] border-[#b9b9b9] hover:border-[#B23F40] hover:shadow-inner hover:shadow-[0px 4px 4px 0px] hover:shadow-[#00000025] hover:text-white focus:z-10`}
          onClick={() => setValue(option === options[0])} // Set to true if Original, false otherwise
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
