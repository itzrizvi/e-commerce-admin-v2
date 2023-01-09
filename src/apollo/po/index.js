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
          order_id
          type
          grandTotal_price
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
          order_id
          type
          grandTotal_price
          tax_amount
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
  GET_COMPANY_BILLING_ADDRESS: gql`
    query getCompanyInfo {
      getCompanyInfo {
        message
        status
        tenant_id
        data {
          id
          billingAddresses {
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
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_ORDER_LIST: gql`
    query getOrderlistAdmin {
      getOrderlistAdmin {
        message
        status
        data {
          id
          orderStatus {
            name
            slug
          }
          customer {
            id
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
            }
          }
        }
      }
    }
  `,
  GET_COMPANY_BILLING: gql`
    query getCompanyInfo {
      getCompanyInfo {
        message
        status
        data {
          billingAddresses {
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
  GET_ADDRESS_BY_CUSTOMER: gql`
    query getAddressListByCustomerID($query: GetAdressListByCustomerIDInput){
      getAddressListByCustomerID(query: $query) {
        message
        status
        shippingDefaultID
        data {
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
          tenant_id
        }
      }
    }
  `,
};
