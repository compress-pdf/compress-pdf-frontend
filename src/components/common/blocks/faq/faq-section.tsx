import React from 'react';
import { twMerge } from 'tailwind-merge';

// Import components
import SectionContainer from '../../containers/SectionContainer';
import ContentTitle from '../../core/ContentTitle';

import Accordion from './accordion';

interface FaqProps {
  question: string;
  answer: string;
  className?: string;
}

interface FaqSectionProps {
  data?: FaqProps[];
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ data, className }) => {
  return (
    <SectionContainer
      className={twMerge(
        className,
        'mt-[20px] md:mt-[40px]',
        data ? 'block' : 'hidden'
      )}
    >
      <section>
        <ContentTitle title="Frequently Asked Questions (FAQs)" />
        {data?.map((each, index) => (
          <Accordion key={index} title={each.question}>
            <div
              className="rounded pt-2 text-left"
              dangerouslySetInnerHTML={{ __html: each.answer }}
            />
          </Accordion>
        ))}
      </section>
    </SectionContainer>
  );
};

export default FaqSection;
