import HomePageContent from './home-page';
import HeroContent from './home-page/contents/HeroContent';
import HomeStaticContent from './home-page/contents/HomeStaticContent';

const CompressPdf = () => {
  return (
    <HomePageContent>
      <HeroContent />
      <HomeStaticContent />
    </HomePageContent>
  );
};

export default CompressPdf;
