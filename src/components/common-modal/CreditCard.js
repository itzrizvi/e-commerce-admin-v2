import { message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import Checkout from '../stripe/Checkout';

export default function CreditCard({
  creditCardModalOpen,
  setCreditCardModalOpen,
  amount,
  selectedCustomer,
  finalPayment,
  setCreditCardLast4,
  cardHolderName,
  setCardHolderName,
  setPaymentSuccess,
}) {
  const paymentValidateCard = useRef(null);
  const [loading, setLoading] = useState(false);
  const validatePayment = async () => {
    setLoading(true);
    const createToken = await paymentValidateCard.current();
    if (createToken.error) {
      setLoading(false);
      return message.error('Invalid Card Details.');
    } else {
      setCreditCardLast4(createToken?.token.card.last4);
      setPaymentSuccess(true);
      setCreditCardModalOpen(false);
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Credit Card"
      style={{ top: 20 }}
      width={500}
      open={creditCardModalOpen}
      destroyOnClose={false}
      okText="Pay Now"
      onOk={validatePayment}
      confirmLoading={loading}
      onCancel={() => setCreditCardModalOpen(false)}
    >
      <Checkout
        customer={selectedCustomer}
        amount={amount}
        finalPayment={finalPayment}
        paymentValidateCard={paymentValidateCard}
        cardHolderName={cardHolderName}
        setCardHolderName={setCardHolderName}
        setPaymentSuccess={setPaymentSuccess}
      />
    </Modal>
  );
}
