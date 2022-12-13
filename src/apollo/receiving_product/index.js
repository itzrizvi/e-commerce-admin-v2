import { gql } from '@apollo/client';

export const receivingProductQuery = {
  GET_ALL_RP: gql`
    query getReceivingProductList {
      getReceivingProductList {
        message
        status
        data {
          id
          status
          purchaseOrder {
            id
            po_id
            grandTotal_price
            order_id
            type
            vendor {
              id
              company_name
              contact_person
              email
            }
          }
        }
      }
    }
  `,
  UPDATE_RO: gql`
    mutation updateReceiving($data: UpdateRecevingProductInput) {
      updateReceiving(data: $data) {
        message
        status
        status
      }
    }
  `,
  GET_SINGLE_RECEIVING_PRODUCT: gql`
    query getSingleReceivingProduct($query: GetSingleReceivingProductInput) {
      getSingleReceivingProduct(query: $query) {
        message
        status
        data {
          id
          status
          receivingitems {
            id
            receiving_id
            quantity
            price
            totalPrice
            received_quantity
            remaining_quantity
            createdAt
            updatedAt
            product {
              id
              prod_name
              prod_slug
              prod_sku
              prod_partnum
              prod_status
              prod_condition
              prod_short_desc
              prod_thumbnail
              is_featured
              is_sale
              is_serial
              prod_outofstock_status
              createdAt
              updatedAt
            }
            serials {
              id
              prod_id
              rec_prod_id
            }
            receivinghistory {
              id
              receiving_id
              receiving_item_id
              product_id
              received_quantity
              createdAt
              updatedAt
              received_by {
                id
                first_name
                last_name
                email
              }
            }
          }
          purchaseOrder {
            id
            po_id
            grandTotal_price
            tax_amount
            comment
            shipping_method_id
            vendor {
              id
              contact_person
              company_name
              email
              phone_number
            }
          }
        }
      }
    }
  `,
  GET_HISTORY: gql`
    query getReceivingHistory($query: GetReceivingHistoryInput) {
      getReceivingHistory(query: $query) {
        message
        status
        data {
          id
          receiving_id
          status
          createdAt
          updatedAt
          activity_by {
            id
            first_name
            last_name
            email
          }
        }
      }
    }
  `,
  ADD_RECEIVING_PRODUCT: gql`
    mutation createReceiving($data: createReceivingInput) {
      createReceiving(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};
