import { gql } from '@apollo/client';

export const companyInfoQuery = {
  COMPANY_INFO: gql`
    mutation companyInfo($data: CompanyInfoInput) {
      companyInfo(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  GET_COMPANY_INFO: gql`
    query getCompanyInfo{
      getCompanyInfo {
        message
        status
        tenant_id
        data {
          id
          name
          logo
          dark_logo
          fav_icon
          contact_address
          company_phones {
            id
            phone
            type
            createdAt
            updatedAt
          }
          company_emails {
            id
            email
            type
            createdAt
            updatedAt
          }
          company_socials {
            id
            social
            type
            createdAt
            updatedAt
          }
          shippingAddresses {
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
            countryCode {
              name
              code
            }
            type
            status
            isDefault
            updatedAt
            createdAt
          }
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
          fax
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  `,
  ADD_COMPANY_BILLING_ADDRESS: gql`
  mutation addCompanyBillingAddress($data:AddCompanyBillingAddressInput){
    addCompanyBillingAddress(data:$data){
      message
      status
    }
  }
  `,
  ADD_COMPANY_SHIPPING_ADDRESS: gql`
  mutation addCompanyShippingAddress($data:AddCompanyShippingAddressInput){
    addCompanyShippingAddress(data:$data){
      message
      status
      tenant_id
    }
  }
  `,
  UPDATE_COMPANY_ADDRESS: gql`
  mutation updateCompanyAddress($data:UpdateCompanyAddressInput){
    updateCompanyAddress(data:$data){
      message
      status
      tenant_id
    }
  }
  `,



};
