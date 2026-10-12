/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
      isAnonymous: auth.currentUser?.isAnonymous ?? null,
      tenantId: auth.currentUser?.tenantId ?? null,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) ?? [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is currently running offline or connecting.');
    }
    return false;
  }
}

export interface OrderInput {
  customerName: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  extraCubes: number;
}

export interface SubmittedOrder {
  orderId: string;
  customerName: string;
  phone: string;
  country: string;
  city: string;
  shippingAddress: string;
  productName: string;
  baseCubes: number;
  extraCubes: number;
  totalCubes: number;
  basePrice: number;
  extraCubePrice: number;
  extraAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
}

export const PRODUCT_INFO = {
  name: 'Sifteo Cubes',
  subtitle: 'Blocs de jeu interactifs avec écrans',
  baseCubes: 3,
  basePrice: 35000,
  extraCubePrice: 10000,
  currency: 'FCFA',
  symbol: 'FCFA',
  stockStatus: 'En stock',
  deliveryDelay: 'Expédition sous 48h - 72h',
  shippingFee: 0, // Offerte
};

export function calculateOrderPrice(extraCubes: number = 0) {
  const safeExtra = Math.max(0, Math.min(25, Math.floor(Number(extraCubes) || 0)));
  const baseCubes = PRODUCT_INFO.baseCubes;
  const basePrice = PRODUCT_INFO.basePrice;
  const extraCubePrice = PRODUCT_INFO.extraCubePrice;
  const totalCubes = baseCubes + safeExtra;
  const extraAmount = safeExtra * extraCubePrice;
  const totalAmount = basePrice + extraAmount;

  return {
    baseCubes,
    basePrice,
    extraCubes: safeExtra,
    extraCubePrice,
    extraAmount,
    totalCubes,
    totalAmount,
    currency: PRODUCT_INFO.currency,
  };
}

function generateOrderId(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CMD-${rand}`;
}

export async function submitOrder(input: OrderInput): Promise<SubmittedOrder> {
  const orderId = generateOrderId();
  const pricing = calculateOrderPrice(input.extraCubes || 0);

  const orderPayload = {
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    country: input.country.trim(),
    city: input.city.trim(),
    shippingAddress: input.shippingAddress.trim(),
    productName: PRODUCT_INFO.name,
    baseCubes: pricing.baseCubes,
    extraCubes: pricing.extraCubes,
    totalCubes: pricing.totalCubes,
    basePrice: pricing.basePrice,
    extraCubePrice: pricing.extraCubePrice,
    extraAmount: pricing.extraAmount,
    totalAmount: pricing.totalAmount,
    currency: PRODUCT_INFO.currency,
    status: 'En attente',
    createdAt: serverTimestamp(),
  };

  const path = `orders/${orderId}`;
  try {
    const orderDocRef = doc(db, 'orders', orderId);
    await setDoc(orderDocRef, orderPayload);

    return {
      orderId,
      customerName: orderPayload.customerName,
      phone: orderPayload.phone,
      country: orderPayload.country,
      city: orderPayload.city,
      shippingAddress: orderPayload.shippingAddress,
      productName: orderPayload.productName,
      baseCubes: pricing.baseCubes,
      extraCubes: pricing.extraCubes,
      totalCubes: pricing.totalCubes,
      basePrice: pricing.basePrice,
      extraCubePrice: pricing.extraCubePrice,
      extraAmount: pricing.extraAmount,
      totalAmount: pricing.totalAmount,
      currency: pricing.currency,
      status: orderPayload.status,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
