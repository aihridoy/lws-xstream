import Banner from "@/app/[lang]/components/Banner";
import Streaming from "@/app/[lang]/components/Streaming";

export default function Home({ params }) {
  return (
    <>
      <Banner params={params} />
      <Streaming params={params} />
    </>
  );
}
