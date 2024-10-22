import React from 'react';
import { twMerge } from 'tailwind-merge';

// Import components
import SectionContainer from '../../containers/SectionContainer';
import ContentTitle from '../../core/ContentTitle';

import FaqAccordionClient from './FaqAccordionClient';

interface FaqProps {
  question: string;
  answer: string;
  className?: string;
}

interface FaqSectionProps {
  data?: FaqProps[];
  title: string;
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ data, title, className }) => {
  return (
    <SectionContainer className={twMerge(className, data ? 'block' : 'hidden')}>
      <section>
        <ContentTitle title={title} />
        <FaqAccordionClient data={data} />
      </section>
    </SectionContainer>
  );
};

export default FaqSection;
