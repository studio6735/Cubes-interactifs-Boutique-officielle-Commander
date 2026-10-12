/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PRODUCT_INFO, calculateOrderPrice } from '../lib/firebase';

interface BottomCTAProps {
  onOrderClick: () => void;
  extraCubes: number;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOrderClick, extraCubes }) => {
  const pricing = calculateOrderPrice(extraCubes);

  return (
    <section className="py-12 bg-stone-100 border-t border-stone-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
          Prêt à découvrir Sifteo Cubes ?
        </h3>
        <p className="text-sm text-stone-600 max-w-lg mx-auto">
          Commandez directement votre ensemble de cubes interactifs. Livraison suivie offerte et expédition sous 48h.
        </p>
        <div className="pt-2">
          <button
            onClick={onOrderClick}
            className="cursor-pointer inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-sm"
          >
            Commander {pricing.totalCubes} cubes ({pricing.totalAmount.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol})
          </button>
        </div>
      </div>
    </section>
  );
};
