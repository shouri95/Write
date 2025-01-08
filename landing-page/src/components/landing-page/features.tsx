// src/components/landing-page/features.tsx
import React from 'react';

export function FeaturesSection() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Features</h2>
      <ul className="max-w-4xl mx-auto space-y-4">
        <li className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-semibold">Feature 1</h3>
          <p>Description of feature 1.</p>
        </li>
        <li className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-semibold">Feature 2</h3>
          <p>Description of feature 2.</p>
        </li>
        <li className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="font-semibold">Feature 3</h3>
          <p>Description of feature 3.</p>
        </li>
      </ul>
    </section>
  );
}