import React from 'react';

export default function Topbar() {
  return (
    <div className="fixed top-4 right-4">
      <a className="action-btn px-4 py-2 bg-gray text-white rounded hover:opacity-80" href="/login">
        View Screenplay
      </a>
    </div>
  );
}
