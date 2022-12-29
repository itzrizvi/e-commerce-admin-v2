import { gql } from '@apollo/client';

export const methodQuery = {
  GET_PAYMENT_METHOD_LIST: gql`
    query getPaymentMethodListPublic {
      getPaymentMethodListPublic {
        message
        status
        tenant_id
        data {
          id
          name
          description
          status
          isDefault
          tenant_id
        }
      }
    }
  `,
  GET_SHIPPING_METHOD_LIST: gql`
    query getShippingMethodListPublic {
      getShippingMethodListPublic {
        message
        status
        tenant_id
        data {
          id
          name
          description
          status
          tenant_id
        }
      }
    }
  `,
};
