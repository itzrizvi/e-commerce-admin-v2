import { gql } from '@apollo/client';

export const orderQuery = {
  GET_ALL_ORDER: gql`
    query getOrderlistAdmin {
      getOrderlistAdmin {
        message
        status
        data {
          id
          total
          sub_total
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
          paymentmethod {
            id
            name
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
  GET_SINGLE_ORDER_ADMIN: gql`
    query getSingleOrderAdmin($query: GetSingleOrderAdminInput) {
      getSingleOrderAdmin(query: $query) {
        message
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
          orderitems {
            id
            order_id
            price
            quantity
            product {
              id
              prod_short_desc
              prod_name
              prod_slug
              prod_sku
              prod_partnum
              prod_status
              taxable
              prod_condition
              prod_thumbnail
              is_featured
              prod_sale_price
              prod_regular_price
              prod_outofstock_status
              createdAt
              updatedAt
            }
          }
          paymentmethod {
            id
            name
            description
            status
          }
          payment {
            id
            order_id
            amount
            provider_id
            status
            billingAddress {
              id
              ref_id
              ref_model
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
            }
          }
          orderstatus {
            id
            name
            slug
            description
            status
          }
          contactperson {
            id
            name
            email
            phone
            fax
            status
            createdAt
            updatedAt
          }
          customer {
            id
            first_name
            last_name
            email
            email_verified
            user_status
            image
            contactPersons {
              id
              name
              email
              phone
              fax
              status
              createdAt
              updatedAt
            }
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
          shippingAddress {
            id
            ref_id
            ref_model
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
          }
          shippingmethod {
            id
            name
            description
            status
          }
          taxExemptFiles {
            id
            order_id
            file_name
          }
          coupon {
            id
            coupon_name
            coupon_code
            coupon_description
            coupon_type
            coupon_amount
            coupon_maxamount
            coupon_minamount
            coupon_startdate
            coupon_enddate
            coupon_status
            coupon_sortorder
            createdAt
            updatedAt
          }
          added_by {
            id
            first_name
            last_name
            email
            image
            roles {
              id
              role_no
              role
              role_slug
              role_status
              role_description
            }
          }
        }
      }
    }
  `,
  GET_ORDER_STATUS_LIST: gql`
    query getOrderStatusList {
      getOrderStatusList {
        message
        status
        data {
          id
          name
          description
          status
        }
      }
    }
  `,
  CREATE_ORDER: gql`
    mutation createOrderByAdmin($data: createOrderByAdminInput) {
      createOrderByAdmin(data: $data) {
        message
        status
        id
      }
    }
  `,
  UPDATE_ORDER: gql`
    mutation updateOrder($data: UpdateOrderInput) {
      updateOrder(data: $data) {
        message
        status
      }
    }
  `,
  GET_SHIPPING_ACCOUNT_LIST: gql`
    query getShippingAccountListAdmin {
      getShippingAccountListAdmin {
        message
        status
        data {
          id
          name
          account
          description
          status
        }
      }
    }
  `,
};
export const orderMutation = {};
