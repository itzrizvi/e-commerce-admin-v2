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
  GET_SHIPPING_METHOD_LIST_ADMIN: gql`
    query getShippingMethodListAdmin {
      getShippingMethodListAdmin {
        message
        status
        tenant_id
        data {
          id
          name
          description
          status
          sort_order
          internal_type
          tenant_id
        }
      }
    }
  `,
};
