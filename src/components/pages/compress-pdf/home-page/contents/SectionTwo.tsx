import { useTranslations } from 'next-intl';
import React from 'react';

const SectionTwo = () => {
  const t = useTranslations('general');

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-[2.5rem] mb-6 leading-[3.4rem] font-bold  text-[#163B45] dark:text-[#fafafa]">
        {t('content.sectionTwo.title')}
      </h2>
      <div className="w-full mx-auto">
        <p className="text-md md:text-base text-foreground  mb-12 max-w-3xl  text-[#6B7280] dark:text-[#E1DEDE] mx-auto">
          {t('content.sectionTwo.description')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t
          .raw('content.sectionTwo.features')
          .map(
            (
              feature: { featureTitle: string; featureDescription: string },
              index: number
            ) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="flex mb-4">
                  {/* {feature.icon} */}
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.featureTitle}
                  </h3>
                </div>
                <p className="text-foreground text-sm text-left">
                  {feature.featureDescription}
                </p>
              </div>
            )
          )}
      </div>
    </section>
  );
};

export default SectionTwo;
