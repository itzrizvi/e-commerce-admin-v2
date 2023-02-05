import { gql } from '@apollo/client';

export const poQuery = {
  GET_ALL_PO: gql`
    query getPurchaseOrderList($query: POListFilters) {
      getPurchaseOrderList(query: $query) {
        message
        tenant_id
        status
        data {
          id
          po_number
          rec_id
          grandTotal_price
          comment
          type
          order_id
          createdAt
          updatedAt
          postatus {
            id
            name
            slug
          }
        }
      }
    }
  `,
  GET_PO_STATUS_LIST: gql`
    query getPOStatusList {
      getPOStatusList {
        message
        status
        tenant_id
        data {
          id
          name
          slug
        }
      }
    }
  `,
  GET_PO_NUMBER_LIST: gql`
    query getPONumbers {
      getPONumbers {
        message
        status
        tenant_id
        data {
          po_number
        }
      }
    }
  `,
  SEND_TO_PO: gql`
    mutation poSendToVendor($data: POStatusChangeInput) {
      poSendToVendor(data: $data) {
        message
        status
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
        po_number
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
          po_number
          order_id
          type
          grandTotal_price
          tax_amount
          shipping_cost
          is_insurance
          comment
          receiving_instruction
          shipping_method_id
          createdAt
          vendor {
            id
            contactPersons {
              id
              ref_id
              ref_model
              name
              email
              phone
              fax
              status
              tenant_id
              createdAt
              updatedAt
            }
            contact_person
            email
            phone_number
            FAX_no
            company_name
            description
            EIN_no
            TAX_ID
            status
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
              countryCode {
                name
                code
                status
              }
              updatedAt
              createdAt
            }
            createdAt
            updatedAt
          }
          POCreated_by {
            first_name
            last_name
            email
            phone
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
            countryCode {
              name
              code
              status
            }
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
            countryCode {
              name
              code
              status
            }
          }
          paymentmethod {
            id
            name
            description
            status
          }
          shippingMethod {
            id
            name
            description
            status
            sort_order
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
              prod_partnum
            }
          }
          shippingAccount {
            id
            name
            account
            description
            status
          }
          contactPerson {
            id
            name
            email
            phone
            fax
            status
          }
          customer {
            id
            first_name
            last_name
            email
            email_verified
            user_status
            image
            phone
            fax
            company_name
            createdAt
            updatedAt
          }
          postatus {
            id
            name
            slug
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
        po_number
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
    query getAddressListByCustomerID($query: GetAdressListByCustomerIDInput) {
      getAddressListByCustomerID(query: $query) {
        message
        status
        shippingDefaultID
        data {
          id
          address1
          address2
          city
          state
          zip_code
          country
          countryCode {
            name
            code
            status
          }
          type
          isDefault
          status
        }
      }
    }
  `,
  UPDATE_PO_STATUS: gql`
    mutation updatePOStatus($data: POStatusChangeInput) {
      updatePOStatus(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  GET_PO_REASON_LIST: gql`
    query getPORejectReasonList {
      getPORejectReasonList {
        message
        tenant_id
        status
        data {
          id
          reason
          status
        }
      }
    }
  `,
  GET_PO_STATUS_LIST: gql`
    query getPOStatusList {
      getPOStatusList {
        message
        status
        data {
          id
          name
          slug
        }
      }
    }
  `,
  GET_PO_INVOICE_LIST: gql`
    query getPOInvoiceList($query: GetPOInvoiceListInput) {
      getPOInvoiceList(query: $query) {
        message
        status
        data {
          id
          po_id
          purchaseOrder {
            po_number
          }
          invoice_no
          invoice_date
          invoice_file
          createdAt
          updatedAt
        }
      }
    }
  `,
  CREATE_PO_INVOICE: gql`
    mutation createPOInvoice($data: POInvoiceInput) {
      createPOInvoice(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_PO_INVOICE: gql`
    mutation updatePOInvoice($data: updatePOInvoiceInput) {
      updatePOInvoice(data: $data) {
        message
        status
      }
    }
  `,
  GET_PO_MFG_DOC_LIST: gql`
    query getPOMFGDOCList($query: GetPOMFGDOCListInput) {
      getPOMFGDOCList(query: $query) {
        message
        status
        data {
          id
          pomfg_file
          po_id
          purchaseOrder {
            po_number
          }
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_ACTIVITY_HISTORY_LIST: gql`
    query getPOActivityList($query: GetPOActivityListInput) {
      getPOActivityList(query: $query) {
        message
        status
        data {
          po_id
          comment
          action_type
          createdAt
          updatedAt
          purchaseOrder {
            id
            po_number
            postatus {
              id
              name
              slug
            }
          }
          activity_by {
            first_name
            last_name
            email
            email_verified
            id
            image
            fax
            phone
            user_status
          }
        }
      }
    }
  `,
  DELETE_PO_INVOICE: gql`
    mutation deletePOInvoice($data: deletePOInvoiceInput) {
      deletePOInvoice(data: $data) {
        message
        status
      }
    }
  `,
  CREATE_MFG_DOC: gql`
    mutation createMFGDOC($data: POMFGDOCInput) {
      createMFGDOC(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_MFG_DOC: gql`
    mutation updatePOMFGDOC($data: updatePOMFGDOCInput) {
      updatePOMFGDOC(data: $data) {
        message
        status
      }
    }
  `,
  DELETE_MFG_DOC: gql`
    mutation deletePOMFGDOC($data: deletePOMFGDOCInput) {
      deletePOMFGDOC(data: $data) {
        message
        status
      }
    }
  `,
  SEND_PO_LINK: gql`
    mutation resendPOLink($data: ResendPOLinkInput) {
      resendPOLink(data: $data) {
        message
        status
      }
    }
  `,
  SEND_PO: gql`
    mutation resendPOAttachment($data: ResendPOAttachmentInput) {
      resendPOAttachment(data: $data) {
        message
        status
      }
    }
  `,
  ADD_PO_COMMENT: gql`
    mutation createPOComment($data: createPOCommentInput) {
      createPOComment(data: $data) {
        message
        status
      }
    }
  `,
  REQUEST_TRACKING: gql`
    mutation requestTracking($data: requestTrackingInput) {
      requestTracking(data: $data) {
        message
        status
      }
    }
  `,
};
