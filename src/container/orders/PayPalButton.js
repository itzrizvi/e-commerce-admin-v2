import React, { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

const style = {"layout":"vertical"};

const PayPalButton = ({ currency = "USD", showSpinner = false, amount }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then(orderId => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={async function(data, actions) {
          return actions.order.capture().then(function() {
            // Your code here after capture the order
          });
        }}
      />
    </>
  );
};

export default PayPalButton;
