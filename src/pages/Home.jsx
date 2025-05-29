import AboutCollegeSection from "../components/HomePage/AboutCollegeSection";
import CallToAction from "../components/HomePage/CallToAction";
import CollegeOverview from "../components/HomePage/CollegeOverview";
import FeaturesSection from "../components/HomePage/FeaturesSection";
import HeroSection from "../components/HomePage/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutCollegeSection />
      <FeaturesSection />
      <CollegeOverview />
      <CallToAction />
    </div>
  );
};

export default Home;
