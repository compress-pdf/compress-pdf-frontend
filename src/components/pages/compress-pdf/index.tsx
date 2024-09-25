import HomePageContent from './home-page';
import HeroContent from './home-page/contents/HeroContent';
import HomeStaticContent from './home-page/contents/HomeStaticContent';

type Props = {
  tool: string;
};

const CompressPdf = ({ tool }: Props) => {
  return (
    <HomePageContent tool={tool}>
      <HeroContent tool={tool} />
      <HomeStaticContent tool={tool} />
    </HomePageContent>
  );
};

export default CompressPdf;
