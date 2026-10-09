import Image from "next/image";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";
import AboutUs from "./AboutUs";
import Footer from "./Footer";
import Franchise from "./Franchise";
import PremiumBentoGrid from "./BentoGrid";
import Careers from "./Careers";
import MenuSection from "./Menu";
import LocationSection from "./Location";

const HomePage = () => {
  return (
    <>
    <NavBar />
    <HeroSection />
    <AboutUs />
    <PremiumBentoGrid />
    <Franchise />
    < MenuSection />
    <LocationSection />
    <Footer />
    </>
  );
};

export default HomePage;
