import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { stripeSchema } from '../../apollo/stripe';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { useEffect } from 'react';

export default function Checkout({ customer, amount, paymentValidateCard, finalPayment, clientSecret, setClientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    paymentValidateCard.current = paymentValidateCardChild;
    finalPayment.current = finalPaymentChild;
  }, [clientSecret]);

  const style = {
    iconStyle: 'solid',
    base: {
      fontWeight: '400',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
    },
    invalid: {
      color: '#FFC7EE',
    },
  };

  const paymentValidateCardChild = () => {
    if (!stripe || !elements) {
      return;
    }

    return apolloClient
      .mutate({
        mutation: stripeSchema.STRIPE_PAYMENT_INTENT,
        variables: {
          query: { amount },
        },
        context: {
          headers: {
            TENANTID: process.env.REACT_APP_TENANTID,
            Authorization: token,
          },
        },
      })
      .then(async (res) => {
        const data = res?.data?.stripePaymentIntent;
        if(!data?.status) return;
        const cardElement = elements.getElement(CardElement);
        setClientSecret(data?.data?.clientSecret);
        return await stripe.createToken(cardElement);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const finalPaymentChild = async () => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    return await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customer.first_name + ' ' + customer.last_name,
          email: customer.email,
        },
      },
    });
  };

  return (
    <>
      <div style={{ paddingTop: 20 }}>
        <form style={{ minWidth: 400 }}>
          <CardElement
            options={{
              hidePostalCode: true,
              appearance: {
                theme: 'stripe',
              },
              style,
              iconStyle: 'solid',
            }}
          />
        </form>
      </div>
    </>
  );
}
