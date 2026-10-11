/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-stone-200 text-stone-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Simple Brand Name */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-stone-900">
            Sifteo Cubes
          </span>
          <span className="text-xs text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">
            Blocs interactifs
          </span>
        </div>

        {/* Clean Order Button */}
        <div>
          <button
            onClick={onOrderClick}
            className="cursor-pointer inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-medium text-sm transition-colors shadow-sm"
          >
            Commander
          </button>
        </div>
      </div>
    </header>
  );
};
