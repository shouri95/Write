// src/app/page.tsx
import { GradientBackground } from '../components/ui/gradient-background';
import { LandingPage } from '../components/landing-page';

export default function Page() {
  return (
    <GradientBackground>
      <LandingPage />
    </GradientBackground>
  );
}