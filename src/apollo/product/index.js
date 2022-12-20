import { gql } from '@apollo/client';

export const productSchema = {
  SEARCH_PRODUCT: gql`
    query getSearchedProducts($query: SearchProductInput) {
      getSearchedProducts(query: $query) {
        message
        status
        data {
          id
          prod_name
          prod_slug
          prod_regular_price
          prod_sale_price
          prod_thumbnail
        }
      }
    }
  `,
  GET_SHIPPING_METHOD_LIST: gql`
    query getShippingMethodListPublic {
      getShippingMethodListPublic {
        message
        status
        data {
          id
          name
          slug
          description
          shipping_cost
          status
          isDefault
        }
      }
    }
  `,
  GET_COUPON_BY_CODE: gql`
    query getSingleCouponByCode($query: GetSingleCouponByCodeInput) {
      getSingleCouponByCode(query: $query) {
        message
        status
        data {
          id
          coupon_amount
          coupon_type
        }
      }
    }
  `,
  GET_PAYMENT_METHOD_LIST: gql`
    query getPaymentMethodListPublic {
      getPaymentMethodListPublic {
        message
        status
        data {
          id
          name
          slug
          description
          status
          isDefault
        }
      }
    }
  `,
  GET_SEARCH_CUSTOMER: gql`
    query getSearchedCustomers($query: CustomerSearchInput) {
      getSearchedCustomers(query: $query) {
        status
        message
        data {
          id
          first_name
          last_name
          email
          email_verified
          user_status
          image
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            type
            status
            isDefault
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
};
