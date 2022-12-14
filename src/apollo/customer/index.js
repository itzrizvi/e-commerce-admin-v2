import { gql } from '@apollo/client';

export const customerQuery = {
  GET_ALL_CUSTOMER: gql`
    query {
      getAllCustomer {
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
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
  GET_RATING_BY_USER_ID: gql`
    query getRatingsByUserID($query: GetRatingsByUserInput) {
      getRatingsByUserID(query: $query) {
        message
        status
        data {
          id
          rating_description
          rating
          createdAt
          updatedAt
          product {
            id
            prod_name
            prod_slug
            prod_short_desc
            prod_thumbnail
            prod_sku
            prod_regular_price
            prod_sale_price
            prod_status
          }
        }
      }
    }
  `,
};

export const customerMutation = {
  ADD_CUSTOMER: gql`
    mutation addCustomer($data: CustomerInput) {
      addCustomer(data: $data) {
        message
        status
        id
      }
    }
  `,
  ADD_CUSTOMER_BILLING_ADDRESS: gql`
    mutation addCustomerBillingAddress($data: AddCustomerBillingAddressInput) {
      addCustomerBillingAddress(data: $data) {
        message
        status
      }
    }
  `,
  ADD_CUSTOMER_SHIPPING_ADDRESS: gql`
    mutation addCustomerShippingAddress($data: AddCustomerShippingAddressInput) {
      addCustomerShippingAddress(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_CUSTOMER: gql`
    mutation updateCustomer($data: UpdateCustomerInput) {
      updateCustomer(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_CUSTOMER_ADDRESSES: gql`
    mutation updateCustomerAddress($data: UpdateCustomerAddressInput) {
      updateCustomerAddress(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};
