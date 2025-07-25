import HeroSection from "../components/home/HeroSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import CallToActionSection from "../components/home/CallToActionSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <HeroSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <CallToActionSection />
    </div>
  );
}
