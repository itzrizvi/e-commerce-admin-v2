import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51MJ9fsEOAIk8k6OwGNCIMXQu4QSevyuN3xa9VavIcgNU8hi7Tt7Q2zPbOF4gpjO3V25y43SxJ2QqueUHm4ZWcos600HkrqN7Uf");
  }
  return stripePromise;
};

export default getStripe;