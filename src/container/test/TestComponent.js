import { useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';

export default function TestComponent() {
  const stripe = useStripe();
  useEffect(() => {
    if (!stripe) return;
    const token = stripe.createToken({
      card: {
        number: '4242 4242 4242 4242',
        cvc: '567',
        exp_month: '12',
        exp_year: '34',
      },
    });
    console.log(token);
  }, [stripe]);
  return <div>TestComponent</div>;
}
