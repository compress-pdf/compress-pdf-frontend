import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';

const HomeStaticContent = () => {
  return (
    <FullwidthContainer
      className="children-two-server mb-5 bg-yellow-50"
      as={'main'}
    >
      <SectionContainer className="text-center flex flex-col md:flex-row gap-9 hidden">
        rest
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default HomeStaticContent;
