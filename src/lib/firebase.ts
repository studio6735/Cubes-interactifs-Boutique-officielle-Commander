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
  quantity: number;
}

export interface SubmittedOrder extends OrderInput {
  orderId: string;
  productName: string;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: string;
}

export const PRODUCT_INFO = {
  name: 'Cubes interactifs',
  subtitle: 'Cubes de jeu interactifs avec écrans',
  unitPrice: 49.90,
  currency: 'EUR',
  symbol: '€',
  stockStatus: 'En stock',
  deliveryDelay: 'Livraison 48h - 72h',
  shippingFee: 0, // Offerte
};

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
  const quantity = Math.max(1, Math.min(20, Math.floor(input.quantity)));
  const totalAmount = Math.round(quantity * PRODUCT_INFO.unitPrice * 100) / 100;

  const orderPayload = {
    customerName: input.customerName.trim(),
    phone: input.phone.trim(),
    country: input.country.trim(),
    city: input.city.trim(),
    shippingAddress: input.shippingAddress.trim(),
    productName: 'Cubes interactifs',
    quantity,
    unitPrice: PRODUCT_INFO.unitPrice,
    totalAmount,
    currency: 'EUR',
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
      quantity,
      productName: orderPayload.productName,
      unitPrice: orderPayload.unitPrice,
      totalAmount,
      currency: orderPayload.currency,
      status: orderPayload.status,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
