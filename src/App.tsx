/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { OrderForm } from './components/OrderForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { BottomCTA } from './components/BottomCTA';
import { Footer } from './components/Footer';
import { MobileOrderBar } from './components/MobileOrderBar';
import { testConnection, SubmittedOrder } from './lib/firebase';

export default function App() {
  const [confirmedOrder, setConfirmedOrder] = useState<SubmittedOrder | null>(null);
  const [extraCubes, setExtraCubes] = useState(0);

  useEffect(() => {
    testConnection();
  }, []);

  const scrollToOrder = () => {
    const el = document.getElementById(confirmedOrder ? 'confirmation' : 'commande');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (order: SubmittedOrder) => {
    setConfirmedOrder(order);
    setTimeout(() => {
      const el = document.getElementById('confirmation');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const handleNewOrder = () => {
    setConfirmedOrder(null);
    setExtraCubes(0);
    setTimeout(() => {
      const el = document.getElementById('commande');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-stone-900">
      {/* En-tête simple */}
      <Header onOrderClick={scrollToOrder} />

      {/* Contenu principal */}
      <main className="flex-1">
        {/* Grande photo réelle des cubes, présentation, CTA */}
        <Hero onOrderClick={scrollToOrder} />

        {/* Photos en fonctionnement & explication du principe du jeu */}
        <Features onOrderClick={scrollToOrder} />

        {/* Section de commande ou confirmation */}
        <section className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6">
          {confirmedOrder ? (
            <OrderConfirmation order={confirmedOrder} onNewOrder={handleNewOrder} />
          ) : (
            <OrderForm
              onOrderSuccess={handleOrderSuccess}
              extraCubes={extraCubes}
              onExtraCubesChange={setExtraCubes}
            />
          )}
        </section>

        {/* Rappel du bouton de commande en bas de page */}
        {!confirmedOrder && <BottomCTA onOrderClick={scrollToOrder} extraCubes={extraCubes} />}
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Bandeau de commande fixe et discret sur mobile */}
      {!confirmedOrder && <MobileOrderBar onOrderClick={scrollToOrder} extraCubes={extraCubes} />}
    </div>
  );
}
