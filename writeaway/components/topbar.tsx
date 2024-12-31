import React from 'react';

interface TopbarProps {
  children?: React.ReactNode;
}

export default function Topbar({ children }: TopbarProps) {
  return (
    <div className="fixed top-4 left-4 right-4 flex justify-between items-center">
      {children}
      <a className="action-btn px-4 py-2 bg-gray text-white rounded hover:opacity-80" href="/login">
        View Screenplay
      </a>
    </div>
  );
}