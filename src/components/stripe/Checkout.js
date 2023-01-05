import React from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { stripeSchema } from '../../apollo/stripe';
import { useSelector } from 'react-redux';
import apolloClient from '../../apollo';
import { useEffect } from 'react';
import { useMemo } from 'react';
import './stripe.css';
import { Col, Form, Input, Row } from 'antd';
import { useState } from 'react';
import amexLogo from './icon/amex.svg';
import visaLogo from './icon/visa.svg';
import masterCardLogo from './icon/mc.svg';

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        iconStyle: 'solid',
        base: {
          fontSize: '16px',
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [],
  );
  return options;
};

export default function Checkout({
  customer,
  amount,
  paymentValidateCard,
  finalPayment,
  clientSecret,
  setClientSecret,
  cardHolderName,
  setCardHolderName,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    paymentValidateCard.current = paymentValidateCardChild;
    finalPayment.current = finalPaymentChild;
  }, [clientSecret]);

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
      .then(async res => {
        const data = res?.data?.stripePaymentIntent;
        if (!data?.status) return;
        const cardElement = elements.getElement(CardNumberElement);
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
    const cardElement = elements.getElement(CardNumberElement);
    return await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardHolderName,
          email: customer.email,
        },
      },
    });
  };

  function recreateNode(el) {
    if (el) {
      var newEl = el.cloneNode(false);
      while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
      el.parentNode.replaceChild(newEl, el);
    }
  }

  useEffect(() => {
    recreateNode(document.querySelector('.creditcard'));
  }, []);

  return (
    <>
      <Row gutter={25}>
        <Col span={24}>
          <Form layout="horizontal" className="stripe-form">
            <Form.Item name="card_holder" label="Card Holder">
              <Input placeholder="Card Holder Name" onChange={e => setCardHolderName(e.target.value)} />
            </Form.Item>
            <Form.Item name="card_number" label="Card Number">
              <CardNumberElement className="ant-input stripe-custom-card-number" options={options} />
              <div className="card-logo">
                <span>
                  <img src={visaLogo} alt="visa" />
                </span>
                <span>
                  <img src={amexLogo} alt="amex" />
                </span>
                <span>
                  <img src={masterCardLogo} alt="master card" />
                </span>
              </div>
            </Form.Item>
            <Row gutter={25}>
              <Col span={12}>
                <Form.Item name="expire_date" label="Expire Date">
                  <CardExpiryElement className="ant-input stripe-custom-expire-date" options={options} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="cvc" label="CVC">
                  <CardCvcElement className="ant-input stripe-custom-cvc" options={options} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
}
