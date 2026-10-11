/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PRODUCT_INFO } from '../lib/firebase';

interface MobileOrderBarProps {
  onOrderClick: () => void;
}

export const MobileOrderBar: React.FC<MobileOrderBarProps> = ({ onOrderClick }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide bar when the order form or confirmation is in view to prevent masking
    const target = document.getElementById('commande') || document.getElementById('confirmation');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If order section is intersecting/visible, hide the sticky bar
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 sm:hidden z-30 shadow-lg transition-transform duration-200">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="text-xs text-stone-600 block">Cubes interactifs</span>
          <span className="font-bold text-stone-900 text-sm">
            {PRODUCT_INFO.unitPrice.toFixed(2).replace('.', ',')} {PRODUCT_INFO.symbol}
            <span className="text-[10px] text-stone-600 font-normal ml-1">TTC</span>
          </span>
        </div>

        <button
          onClick={onOrderClick}
          className="cursor-pointer px-4 py-2 rounded-lg bg-emerald-700 active:bg-emerald-800 text-white font-medium text-xs shadow-sm transition-colors"
        >
          Commander
        </button>
      </div>
    </div>
  );
};
