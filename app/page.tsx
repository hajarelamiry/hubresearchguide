import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import MVPSection from "@/components/landing/MVPSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import VisionSection from "@/components/landing/VisionSection";
import TractionSection from "@/components/landing/TractionSection";
import OnboardingForm from "@/components/landing/OnboardingForm";
import Footer from "@/components/landing/Footer";
import AboutUsSection from "@/components/landing/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <ProblemSection />
        <MVPSection />
        <FeaturesSection />
        <UseCasesSection />
        <VisionSection />
        <TractionSection />
        <OnboardingForm />
        <AboutUsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
