import BestSellers from "../components/BestSellers";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetter from "../components/NewsLetter";
import OurPolicy from "../components/OurPolicy";

function Home() {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
      <NewsLetter />
    </>
  );
}

export default Home;
