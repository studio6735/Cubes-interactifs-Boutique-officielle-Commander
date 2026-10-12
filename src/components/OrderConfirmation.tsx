/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { SubmittedOrder } from '../lib/firebase';

interface OrderConfirmationProps {
  order: SubmittedOrder;
  onNewOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onNewOrder,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="confirmation" className="scroll-mt-20">
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-md mx-auto space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900">
            Commande enregistrée avec succès
          </h2>
          <p className="text-stone-600 text-sm">
            Merci {order.customerName}. Votre commande pour les Sifteo Cubes a bien été reçue.
          </p>
        </div>

        {/* Order Meta Bar */}
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div>
            <span className="text-xs text-stone-600 block">Numéro de référence</span>
            <span className="font-mono font-bold text-stone-900 text-base">{order.orderId}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600">Statut initial :</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              <Clock className="w-3 h-3 text-amber-700" />
              {order.status}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          
          {/* Product details */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-600 block">
              Détail du produit
            </span>
            <div className="flex justify-between">
              <span className="font-medium text-stone-900">{order.productName}</span>
              <span className="font-semibold text-stone-700">{order.totalCubes} cubes</span>
            </div>
            <div className="flex justify-between text-xs text-stone-600">
              <span>Kit de base (3 cubes)</span>
              <span>{order.basePrice.toLocaleString('fr-FR')} {order.currency}</span>
            </div>
            {order.extraCubes > 0 && (
              <div className="flex justify-between text-xs text-emerald-800">
                <span>Cubes supplémentaires ({order.extraCubes} × 10 000)</span>
                <span>+{order.extraAmount.toLocaleString('fr-FR')} {order.currency}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-stone-600">
              <span>Livraison</span>
              <span className="text-emerald-700 font-medium">Offerte</span>
            </div>
            <div className="border-t border-stone-200 pt-2 flex justify-between font-bold text-stone-900">
              <span>Total à régler</span>
              <span className="text-emerald-800 text-base">{order.totalAmount.toLocaleString('fr-FR')} {order.currency}</span>
            </div>
          </div>

          {/* Delivery destination */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-600 block">
              Adresse de livraison
            </span>
            <p className="font-medium text-stone-900">{order.customerName}</p>
            <p className="text-xs text-stone-600">{order.phone}</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              {order.shippingAddress}, {order.city}, {order.country}
            </p>
          </div>

        </div>

        {/* Note */}
        <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <span>
            Notre équipe prépare la validation de votre expédition. Vous serez contacté au {order.phone} pour le suivi de votre colis.
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onNewOrder}
            className="cursor-pointer w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Passer une autre commande</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="cursor-pointer w-full sm:w-auto px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-sm transition-colors flex items-center justify-center gap-2 border border-stone-200"
          >
            <Printer className="w-4 h-4 text-stone-500" />
            <span>Imprimer le récapitulatif</span>
          </button>
        </div>

      </div>
    </div>
  );
};
