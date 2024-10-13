import HomePageContent from './home-page';
import HeroContent from './home-page/contents/HeroContent';
import HomeStaticContent from './home-page/contents/HomeStaticContent';

type Props = {
  tool: string;
  staticCustomize?: boolean;
  uid?: string;
};

const CompressPdf = ({ tool, staticCustomize = false, uid }: Props) => {
  return (
    <HomePageContent tool={tool} staticCustomize={staticCustomize} uid={uid}>
      <HeroContent tool={tool} />
      <HomeStaticContent tool={tool} />
    </HomePageContent>
  );
};

export default CompressPdf;
