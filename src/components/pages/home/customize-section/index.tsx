import React from 'react';

import LeftSide from './left-side';
import RightSide from './right-side';

const CustomizeSection = () => {
  return (
    <div className="flex flex-row bg-[#FEFDF4]">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default CustomizeSection;
