/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Smartphone, Layers, Move, Sparkles } from 'lucide-react';
import cubesInHandImg from '../assets/images/cubes_in_hand_1791703410371.jpg';

interface FeaturesProps {
  onOrderClick: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOrderClick }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
        
        {/* Section Title */}
        <div className="max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Comment fonctionne le jeu ?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
            Sifteo Cubes réunit la manipulation physique de blocs et des mini-écrans couleur qui communiquent entre eux.
          </p>
        </div>

        {/* Action Photo & Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Photo showing cubes in hands touching */}
          <div className="md:col-span-6">
            <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-50 shadow-sm">
              <img
                src={cubesInHandImg}
                alt="Deux mains manipulant deux Sifteo Cubes en les mettant en contact bord à bord"
                className="w-full h-auto object-cover"
              />
              <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 text-center">
                Les cubes réagissent dès qu'ils sont placés côte à côte.
              </div>
            </div>
          </div>

          {/* Core Principles */}
          <div className="md:col-span-6 space-y-4">
            
            <div className="p-4 rounded-lg bg-[#faf9f6] border border-stone-200">
              <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-700" />
                Écrans couleur individuels
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Chaque bloc possède son propre écran miniature. Les illustrations, labyrinthes et éléments de jeu s'affichent directement sur chaque face.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#faf9f6] border border-stone-200">
              <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                Détection de contact bord à bord
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Lorsque deux cubes sont rapprochés l'un contre l'autre, ils détectent leurs côtés adjacents et connectent leurs univers de jeu en temps réel.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#faf9f6] border border-stone-200">
              <h3 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                <Move className="w-4 h-4 text-emerald-700" />
                Manipulation physique & réflexion
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                Le joueur déplace, permute ou assemble les blocs sur la table pour résoudre des énigmes, relier des chemins ou explorer différentes combinaisons.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
