/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-white py-10 text-stone-600 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 text-sm">Cubes interactifs</span>
            <span className="text-stone-600">• Jeu de blocs intelligents avec écrans</span>
          </div>
          <div className="text-stone-600 text-center sm:text-right">
            Enregistrement sécurisé • Expédition 48h-72h
          </div>
        </div>

        <div className="border-t border-stone-150 pt-5 flex flex-col sm:flex-row items-center justify-between text-stone-600 gap-2">
          <p>© {new Date().getFullYear()} Cubes interactifs. Boutique officielle.</p>
          <p>Toutes les commandes sont enregistrées et traitées pour expédition.</p>
        </div>
      </div>
    </footer>
  );
};
