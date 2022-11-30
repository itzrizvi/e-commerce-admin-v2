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
          poProducts {
            id
            purchase_order_id
            quantity
            price
            totalPrice
            recieved_quantity
            remaining_quantity
            serials {
              id
              prod_id
              serial
              rec_prod_id
            }
            product {
              id
              prod_name
              prod_sku
              prod_thumbnail
              is_serial
            }
          }
        }
      }
    }
  `,
};
