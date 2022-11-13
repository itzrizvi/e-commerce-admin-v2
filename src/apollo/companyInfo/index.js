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
          fax
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  `,
};
