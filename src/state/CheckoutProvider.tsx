import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { TransportMode } from '@/domain/transport';

export type PaymentPlan = 'delivery_60' | 'upfront_100';
export type PaymentMethod = 'wave' | 'orange_money' | 'bank';

export interface CheckoutSelection {
  paymentPlan: PaymentPlan | null;
  transportMode: TransportMode | null;
  paymentMethod: PaymentMethod | null;
}

interface CheckoutContextValue extends CheckoutSelection {
  setPaymentPlan: (plan: PaymentPlan) => void;
  setTransportMode: (mode: TransportMode) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  /** Clears transport mode + payment method without touching the payment plan - used when the cart changes and the previous transport selection is no longer valid. */
  clearTransport: () => void;
  reset: () => void;
  isComplete: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

/**
 * Progressive checkout selection state, shared between PaymentPage and the
 * order confirmation/tracking screens that follow it. Choosing a payment
 * plan clears any already-selected transport mode and payment method (the
 * available transport set can change with the plan/cart); choosing a
 * transport mode clears any already-selected payment method - this keeps a
 * parent change from leaving a stale, no-longer-valid child selection.
 */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [paymentPlan, setPaymentPlanState] = useState<PaymentPlan | null>(null);
  const [transportMode, setTransportModeState] = useState<TransportMode | null>(null);
  const [paymentMethod, setPaymentMethodState] = useState<PaymentMethod | null>(null);

  const setPaymentPlan = useCallback((plan: PaymentPlan) => {
    setPaymentPlanState(plan);
    setTransportModeState(null);
    setPaymentMethodState(null);
  }, []);

  const setTransportMode = useCallback((mode: TransportMode) => {
    setTransportModeState(mode);
    setPaymentMethodState(null);
  }, []);

  const setPaymentMethod = useCallback((method: PaymentMethod) => {
    setPaymentMethodState(method);
  }, []);

  const clearTransport = useCallback(() => {
    setTransportModeState(null);
    setPaymentMethodState(null);
  }, []);

  const reset = useCallback(() => {
    setPaymentPlanState(null);
    setTransportModeState(null);
    setPaymentMethodState(null);
  }, []);

  const isComplete = Boolean(paymentPlan && transportMode && paymentMethod);

  const value = useMemo<CheckoutContextValue>(
    () => ({
      paymentPlan,
      transportMode,
      paymentMethod,
      setPaymentPlan,
      setTransportMode,
      setPaymentMethod,
      clearTransport,
      reset,
      isComplete,
    }),
    [paymentPlan, transportMode, paymentMethod, setPaymentPlan, setTransportMode, setPaymentMethod, clearTransport, reset, isComplete],
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook co-location is the established pattern for state providers in this codebase
export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
