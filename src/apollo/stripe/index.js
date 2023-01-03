import { gql } from '@apollo/client';

export const stripeSchema = {
  STRIPE_PAYMENT_INTENT: gql`
    query stripePaymentIntent($query: stripePaymentIntentInput) {
      stripePaymentIntent(query: $query) {
        status
        message
        data {
          clientSecret
          status
        }
      }
    }
  `,
  STRIPE_PAYMENT_INTENT_FINALIZED: gql`
    mutation stripePaymentIntentFinalized($data: stripePaymentIntentFinalizedInput) {
      stripePaymentIntentFinalized(data: $data) {
        status
        message
      }
    }
  `,
};
