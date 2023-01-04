import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useMemo } from 'react';
import TestComponent from './TestComponent';

export default function Test() {
  const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY), []);
  return (
    <Elements stripe={stripePromise}>
      <TestComponent />
    </Elements>
  );
}
