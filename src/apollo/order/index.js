import { gql } from '@apollo/client';

export const orderQuery = {
  GET_ALL_ORDER: gql`
    query getOrderlistAdmin {
      getOrderlistAdmin {
        message
        tenant_id
        status
        data {
          id
          total
          sub_total
          shipping_cost
          discount_amount
          tax_amount
          tax_exempt
          createdAt
          updatedAt
          customer {
            id
            first_name
            last_name
            email
            email_verified
            user_status
            image
          }
          payment {
            id
            name
            slug
            description
            status
          }
          orderStatus {
            id
            name
            slug
            description
            status
          }
        }
      }
    }
  `,
};
