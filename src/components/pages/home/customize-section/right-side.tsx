import React from 'react';

const RightSide = () => {
  return (
    <div className="flex flex-col bg-[FFF] shadow-md">
      <h2 className="text-[#163B45] text-[26px] text-center font-semibold py-[10px] px-[29px] border-b">
        Compression Level
      </h2>
      <div className="flex gap-x-2 items-start">
        <input
          type="radio"
          name="balanced"
          id="balanced"
          className="accent-[#FF8224] h-[15px] w-[15px] appearance-none border-[#FF8224] cursor-pointer border checked:border-amber-400 transition-all"
        />
        {/* <input
          name="color"
          type="radio"
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-amber-400 transition-all"
          id="amber-600"
        /> */}

        <label
          className="text-[#163B45] text-base font-medium flex flex-col "
          htmlFor="balanced"
        >
          BALANCED COMPRESSION (RECOMMENDED)
          <span className="text-[#525E6F] text-sm font-normal">
            {' '}
            Optimized file size with good image quality
          </span>
        </label>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <input type="radio" name="balanced" id="balanced" />
        <label htmlFor="balanced">Balanced</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <input type="radio" name="balanced" id="balanced" />
        <label htmlFor="balanced">Balanced</label>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <input type="radio" name="balanced" id="balanced" />
        <label htmlFor="balanced">Balanced</label>
      </div>
    </div>
  );
};

export default RightSide;
