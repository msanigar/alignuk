import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AlignUK - Discover Your Political Alignment',
  description: 'Take our evidence-based UK political alignment quiz to understand where you stand on six key dimensions: economic, social, authority, sovereignty, environment, and welfare. Choose between Lite (36 questions) or Full (60 questions) versions. Get matched with UK political parties based on your results.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
}
