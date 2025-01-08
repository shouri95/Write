// src/components/landing-page/index.tsx
"use client";

import { HeroSection } from "./hero";
import { FeaturesSection } from "./features";
import { FooterSection } from "./footer";
import { NavBox } from "./nav-box";

export function LandingPage() {
  return (
    <>
      <NavBox />
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </>
  );
}