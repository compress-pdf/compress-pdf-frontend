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
      className="inline-flex rounded-[10px] shadow-sm mt-[8px] w-full"
      role="group"
    >
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          className={`inline-flex items-center p-4 text-sm font-semibold w-1/2 justify-center hover:shadow-inner hover:shadow-[#00000050] hover:shadow-[0px 4px 4px 0px] ${
            index === 0 ? 'rounded-s-[8.25px]' : 'rounded-e-[8.35px]'
          } ${
            (value && option === options[0]) ||
            (!value && option === options[1])
              ? 'bg-[#B23F40] dark:bg-[#963133] text-white shadow-inner shadow-[#0000000]'
              : 'text-[#B23F40] bg-transparent'
          }  focus:z-10
          ${
            value &&
            option === options[1] &&
            'border-t-[1px] border-b-[1px] border-r-[1px] border-[#163B45] dark:border-[#545454]'
          } 
          ${
            !value &&
            option === options[0] &&
            'border-t-[1px] border-b-[1px] border-l-[1px] border-[#163B45] dark:border-[#545454]'
          }
          `}
          onClick={() => setValue(option === options[0])} // Set to true if Original, false otherwise
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
