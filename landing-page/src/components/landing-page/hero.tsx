// src/components/landing-page/hero.tsx
import React from 'react';

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="text-lg mb-8">This is a brief description of the app and its features.</p>
      <div className="w-full max-w-md">
        <img src="/path/to/screenshot-placeholder.png" alt="App Screenshot" className="w-full h-auto" />
      </div>
    </section>
  );
}