// src/app/layout.tsx
import { GradientBackground } from '../components/ui/gradient-background';
import { NavBox } from '../components/landing-page/nav-box';

export default function Layout({ children }) {
  return (
    <GradientBackground>
      <NavBox />
      {children}
    </GradientBackground>
  );
}