import CompressPdf from '@/components/pages/compress-pdf';

interface PageProps {
  params: { uid: string; locale: string };
}

const page = ({ params }: PageProps) => {
  console.log(params);
  console.log(params.locale);

  return (
    <CompressPdf tool={'general'} staticCustomize={true} uid={params.uid} />
  );
};

export default page;
