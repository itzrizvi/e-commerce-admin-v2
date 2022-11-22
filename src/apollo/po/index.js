import { gql } from '@apollo/client';

export const poQuery = {
  GET_ALL_PO: gql`
    query getPurchaseOrderList {
      getPurchaseOrderList {
        message
        status
        data {
          id
          po_id
          grandTotal_price
          order_placed_via
          status
          comment
        }
      }
    }
  `,
  UPDATE_PO_STATUS: gql`
    mutation updatePOStatus($data: POStatusChangeInput) {
      updatePOStatus(data: $data) {
        message
        status
      }
    }
  `,
  CREATE_PURCHASE_ORDER: gql`
    mutation createPurchaseOrder($data: CreatePurchaseOrderInput) {
      createPurchaseOrder(data: $data) {
        message
        status
      }
    }
  `,
  GET_SINGLE_PO: gql`
    query getSinglePurchaseOrder($query: GetSinglePurchaseOrderInput) {
      getSinglePurchaseOrder(query: $query) {
        message
        status
        data {
          id
          po_id
          grandTotal_price
          tax_amount
          order_placed_via
          status
          comment
          shipping_method_id
          vendor {
            id
            contact_person
            company_name
            email
            description
            phone_number
            EIN_no
            TAX_ID
            FAX_no
            status
          }
          vendorBillingAddress {
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
          }
          vendorShippingAddress {
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
          }
          paymentmethod {
            id
            name
            slug
            description
            status
          }
          poProductlist {
            id
            purchase_order_id
            quantity
            price
            totalPrice
            recieved_quantity
            remaining_quantity
            product {
              id
              prod_name
            }
          }
        }
      }
    }
  `,
  UPDATE_PO: gql`
    mutation updatePurchaseOrder($data: UpdatePurchaseOrderInput) {
      updatePurchaseOrder(data: $data) {
        message
        status
      }
    }
  `,
};
