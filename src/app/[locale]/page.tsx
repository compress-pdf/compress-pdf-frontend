// "use client";
import SectionContainer from '@/components/common/containers/SectionContainer';
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";

export default function HomePage() {
  // const { count } = useSelector((store: RootState) => store.counter.counter);
  return (
    <>
      <SectionContainer className="bg-blue-200 dark:bg-slate-800 py-10 text-center">
        <h1>Content Container</h1>
      </SectionContainer>
    </>
  );
}
