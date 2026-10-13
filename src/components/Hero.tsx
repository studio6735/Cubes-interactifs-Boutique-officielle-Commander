/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check, ShieldCheck, Truck, Plus, Minus, Box } from 'lucide-react';
import cubesHeroImg from '../assets/images/sifteo_cubes_hero.png';
import { PRODUCT_INFO, calculateOrderPrice } from '../lib/firebase';

interface HeroProps {
  onOrderClick: () => void;
  extraCubes: number;
  onExtraCubesChange: (val: number | ((prev: number) => number)) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, extraCubes, onExtraCubesChange }) => {
  const pricing = calculateOrderPrice(extraCubes);

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

            {/* Base Kit & Quantity Customization Box (Premier bloc restauré) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
              
              {/* 1. Kit de base obligatoire */}
              <div className="pb-3 border-b border-stone-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <span className="font-semibold text-stone-900 text-sm block">
                        Kit de base (3 cubes)
                      </span>
                      <span className="text-xs text-stone-500">
                        Inclus obligatoirement
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 text-base">
                      {PRODUCT_INFO.basePrice.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Option pour ajouter des cubes supplémentaires */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-stone-900 block">
                      Ajouter des cubes supplémentaires
                    </label>
                    <span className="text-[11px] text-stone-500 block">
                      +{PRODUCT_INFO.extraCubePrice.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol} par cube supplémentaire
                    </span>
                  </div>

                  {/* Sélecteur + / - */}
                  <div className="flex items-center gap-2 bg-stone-50 p-1 rounded-lg border border-stone-200">
                    <button
                      type="button"
                      disabled={extraCubes <= 0}
                      onClick={() => onExtraCubesChange((prev) => Math.max(0, prev - 1))}
                      className="cursor-pointer w-7 h-7 rounded-md bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-stone-700 transition-colors shadow-2xs"
                      aria-label="Retirer un cube supplémentaire"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-7 text-center font-bold text-sm text-stone-900 select-none">
                      {extraCubes}
                    </span>

                    <button
                      type="button"
                      disabled={extraCubes >= 20}
                      onClick={() => onExtraCubesChange((prev) => Math.min(20, prev + 1))}
                      className="cursor-pointer w-7 h-7 rounded-md bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-stone-700 transition-colors shadow-2xs"
                      aria-label="Ajouter un cube supplémentaire"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {extraCubes > 0 && (
                  <div className="flex justify-between items-center text-xs text-emerald-800 bg-emerald-50/70 px-2.5 py-1.5 rounded-md border border-emerald-100">
                    <span>Prix cubes supplémentaires ({extraCubes}) :</span>
                    <span className="font-semibold">
                      +{pricing.extraAmount.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol}
                    </span>
                  </div>
                )}
              </div>

              {/* 3. Calcul automatique du prix et résumé */}
              <div className="pt-3 border-t border-stone-150 space-y-1.5">
                <div className="flex justify-between items-center text-xs text-stone-600">
                  <span>Nombre total de cubes :</span>
                  <span className="font-semibold text-stone-900 bg-stone-100 px-2 py-0.5 rounded text-xs">
                    {pricing.totalCubes} cubes ({pricing.baseCubes} de base {extraCubes > 0 ? `+ ${extraCubes} suppl.` : ''})
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-sm font-semibold text-stone-800">
                    Montant total à payer :
                  </span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                      {pricing.totalAmount.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>En stock • Expédition rapide sous 48h</span>
                </div>
              </div>

            </div>

            {/* Order Button */}
            <button
              onClick={onOrderClick}
              className="cursor-pointer w-full py-3.5 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-base transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              Commander {pricing.totalCubes} cubes ({pricing.totalAmount.toLocaleString('fr-FR')} {PRODUCT_INFO.symbol})
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
