// src/components/ui/gradient-background.tsx
import React from 'react';

const GradientBackground: React.FC = ({ children }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-200 min-h-screen">
      {children}
    </div>
  );
};

export default GradientBackground;