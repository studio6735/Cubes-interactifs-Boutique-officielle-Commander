/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';
import cubesHeroImg from '../assets/images/sifteo_cubes_hero.png';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#faf9f6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Photo of Interactive Cubes */}
          <div className="lg:col-span-7">
            <div className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
              <img
                src={cubesHeroImg}
                alt="Trois Sifteo Cubes avec écrans couleur côte à côte sur une table"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Product Description & Order CTA */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mb-3">
                Jeu interactif tactile
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                Sifteo Cubes – Blocs de jeu interactifs
              </h1>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Sifteo Cubes est un ensemble de petits blocs cubiques intelligents équipés d’écrans couleur intégrés. En les assemblant côte à côte et en les manipulant, les cubes interagissent directement entre eux pour créer des puzzles et des expériences de jeu captivantes.
            </p>

            {/* Order Button */}
            <button
              onClick={onOrderClick}
              className="cursor-pointer w-full py-3.5 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-base transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Commander maintenant
            </button>

            {/* Simple reassurance list */}
            <div className="pt-1 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-stone-600" />
                <span>Livraison et suivi offerts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Commande directe sans création de compte</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
