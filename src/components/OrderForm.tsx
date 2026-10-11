/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Package,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Truck,
} from 'lucide-react';
import {
  PRODUCT_INFO,
  submitOrder,
  SubmittedOrder,
} from '../lib/firebase';

interface OrderFormProps {
  onOrderSuccess: (order: SubmittedOrder) => void;
}

const COUNTRIES = [
  'France',
  'Belgique',
  'Suisse',
  'Luxembourg',
  'Canada',
  'Autre pays européen',
];

export const OrderForm: React.FC<OrderFormProps> = ({ onOrderSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('France');
  const [customCountry, setCustomCountry] = useState('');
  const [city, setCity] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const unitPrice = PRODUCT_INFO.unitPrice;
  const totalAmount = Math.round(quantity * unitPrice * 100) / 100;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Veuillez saisir votre nom et prénom (au moins 2 caractères).';
    } else if (customerName.trim().length > 100) {
      newErrors.customerName = 'Le nom est trop long (maximum 100 caractères).';
    }

    const cleanedPhone = phone.trim();
    if (!cleanedPhone || cleanedPhone.length < 6) {
      newErrors.phone = 'Veuillez renseigner un numéro de téléphone valide pour la livraison.';
    } else if (cleanedPhone.length > 30) {
      newErrors.phone = 'Le numéro est trop long (maximum 30 caractères).';
    }

    const resolvedCountry = country === 'Autre pays européen' ? customCountry.trim() : country.trim();
    if (!resolvedCountry || resolvedCountry.length < 2) {
      newErrors.country = 'Veuillez préciser votre pays de livraison.';
    }

    if (!city.trim() || city.trim().length < 2) {
      newErrors.city = 'Veuillez préciser votre ville.';
    } else if (city.trim().length > 80) {
      newErrors.city = 'Le nom de ville est trop long.';
    }

    if (!shippingAddress.trim() || shippingAddress.trim().length < 5) {
      newErrors.shippingAddress = 'Veuillez préciser votre adresse de livraison complète.';
    } else if (shippingAddress.trim().length > 200) {
      newErrors.shippingAddress = "L'adresse est trop longue (maximum 200 caractères).";
    }

    if (quantity < 1 || quantity > 20) {
      newErrors.quantity = 'La quantité doit être comprise entre 1 et 20.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    const resolvedCountry = country === 'Autre pays européen' ? customCountry.trim() : country.trim();

    setIsSubmitting(true);
    try {
      const createdOrder = await submitOrder({
        customerName: customerName.trim(),
        phone: phone.trim(),
        country: resolvedCountry,
        city: city.trim(),
        shippingAddress: shippingAddress.trim(),
        quantity,
      });

      setIsSubmitting(false);
      onOrderSuccess(createdOrder);
    } catch (err: any) {
      console.error('Order submission error:', err);
      setIsSubmitting(false);
      setSubmitError(
        "Une erreur est survenue lors de l'enregistrement de votre commande. Veuillez vérifier votre connexion et réessayer."
      );
    }
  };

  return (
    <div id="commande" className="scroll-mt-20">
      <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 lg:p-10 shadow-sm">
        
        {/* Header */}
        <div className="border-b border-stone-100 pb-5 mb-6">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
            Formulaire de commande
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
            Finaliser votre commande – Cubes interactifs
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Remplissez vos coordonnées de livraison ci-dessous. Aucun compte n'est requis.
          </p>
        </div>

        {/* Error message */}
        {submitError && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-red-900">Erreur d'enregistrement</p>
              <p className="text-xs text-red-700 mt-0.5">{submitError}</p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError(null)}
              className="text-xs text-red-700 hover:text-red-900 underline cursor-pointer"
            >
              Fermer
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          
          {/* Row 1: Nom & Téléphone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-xs font-medium text-stone-700 mb-1.5">
                Nom et prénom <span className="text-red-500">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                placeholder="Ex. Thomas Laurent"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                }}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border ${
                  errors.customerName ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-stone-300 focus:border-emerald-600'
                } text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white text-sm transition-colors`}
              />
              {errors.customerName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-stone-700 mb-1.5">
                Numéro de téléphone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ex. 06 12 34 56 78"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border ${
                  errors.phone ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-stone-300 focus:border-emerald-600'
                } text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white text-sm transition-colors`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Pays & Ville */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-xs font-medium text-stone-700 mb-1.5">
                Pays de livraison <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (errors.country) setErrors((prev) => ({ ...prev, country: '' }));
                }}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 focus:border-emerald-600 focus:outline-none focus:bg-white text-sm transition-colors cursor-pointer"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {country === 'Autre pays européen' && (
                <input
                  type="text"
                  placeholder="Précisez votre pays"
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  disabled={isSubmitting}
                  className="mt-2 w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-900 text-sm focus:outline-none focus:border-emerald-600"
                />
              )}
              {errors.country && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.country}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-medium text-stone-700 mb-1.5">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                type="text"
                placeholder="Ex. Nantes, Bruxelles..."
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
                }}
                disabled={isSubmitting}
                className={`w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border ${
                  errors.city ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-stone-300 focus:border-emerald-600'
                } text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white text-sm transition-colors`}
              />
              {errors.city && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Adresse */}
          <div>
            <label htmlFor="shippingAddress" className="block text-xs font-medium text-stone-700 mb-1.5">
              Adresse postale complète <span className="text-red-500">*</span>
            </label>
            <textarea
              id="shippingAddress"
              rows={2}
              placeholder="Numéro, rue, bâtiment, code postal..."
              value={shippingAddress}
              onChange={(e) => {
                setShippingAddress(e.target.value);
                if (errors.shippingAddress) setErrors((prev) => ({ ...prev, shippingAddress: '' }));
              }}
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border ${
                errors.shippingAddress ? 'border-red-400 ring-1 ring-red-400 bg-red-50/20' : 'border-stone-300 focus:border-emerald-600'
              } text-stone-900 placeholder-stone-400 focus:outline-none focus:bg-white text-sm transition-colors resize-none`}
            />
            {errors.shippingAddress && (
              <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.shippingAddress}
              </p>
            )}
          </div>

          {/* Row 4: Quantité */}
          <div className="p-4 rounded-lg bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-stone-900 block">
                  Quantité souhaitée
                </span>
                <span className="text-xs text-stone-600">
                  Prix : {unitPrice.toFixed(2).replace('.', ',')} € par ensemble
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={quantity <= 1 || isSubmitting}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="cursor-pointer w-8 h-8 rounded-md bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-stone-700 transition-colors"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="w-8 text-center font-semibold text-base text-stone-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  disabled={quantity >= 10 || isSubmitting}
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="cursor-pointer w-8 h-8 rounded-md bg-white border border-stone-300 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-stone-700 transition-colors"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {errors.quantity && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.quantity}
              </p>
            )}
          </div>

          {/* Récapitulatif de la commande */}
          <div className="p-4 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Produit :</span>
              <span className="font-medium text-stone-800">
                {PRODUCT_INFO.name} ({quantity} {quantity > 1 ? 'ensembles' : 'ensemble'})
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Livraison standard :</span>
              <span className="text-emerald-700 font-medium">Offerte</span>
            </div>
            <div className="border-t border-emerald-200/70 pt-2 flex justify-between items-baseline font-bold text-stone-900 text-base">
              <span>Montant total :</span>
              <span className="text-lg text-emerald-800">
                {totalAmount.toFixed(2).replace('.', ',')} € TTC
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-3.5 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 disabled:bg-emerald-700/60 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Enregistrement de la commande...</span>
              </>
            ) : (
              <span>Confirmer ma commande ({totalAmount.toFixed(2).replace('.', ',')} €)</span>
            )}
          </button>

          <p className="text-center text-xs text-stone-600 flex items-center justify-center gap-1.5 pt-1">
            <Lock className="w-3 h-3 text-stone-600" />
            <span>Vos informations sont transmises de manière sécurisée pour la livraison.</span>
          </p>

        </form>

      </div>
    </div>
  );
};
