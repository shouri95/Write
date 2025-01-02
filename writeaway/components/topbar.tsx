import React from 'react';

interface TopbarProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Topbar({ children, className }: TopbarProps) {
  return (
    <div className={`bg-none fixed top-0 left-0 right-0 flex justify-end items-center border-none h-16 px-6 ${className}`}>
      <a className="action-btn px-4 py-2 bg-gray text-white rounded hover:opacity-80" href="/login">
        View Screenplay
      </a>
    </div>
  );
}