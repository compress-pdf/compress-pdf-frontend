'use client'; // This marks the component as a client-side component

import React, { useState } from 'react';

import Accordion from './accordion'; // Your existing Accordion component

interface FaqProps {
  question: string;
  answer: string;
  className?: string;
}

interface FaqAccordionClientProps {
  data?: FaqProps[];
}

const FaqAccordionClient: React.FC<FaqAccordionClientProps> = ({ data }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    data?.length ? 0 : null
  );

  const handleAccordionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle accordion open or closed
  };

  return (
    <div>
      {data?.map((each, index) => (
        <Accordion
          key={index}
          title={each.question}
          isOpen={openIndex === index} // Control whether the accordion is open
          onClick={() => handleAccordionClick(index)} // Handle when accordion is clicked
        >
          <p className="rounded pt-2 text-left text-base">{each.answer}</p>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqAccordionClient;
