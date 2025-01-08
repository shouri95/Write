// src/components/landing-page/nav-box.tsx
import React from 'react';
import { Button } from '../ui/button';

export const NavBox: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-black text-white p-4 rounded-lg shadow-lg max-w-md mx-auto">
      <h1 className="text-lg font-bold">App Name</h1>
      <Button>Get Started</Button>
    </div>
  );
};