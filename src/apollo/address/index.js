import { gql } from '@apollo/client';

export const addressSchema = {
  GET_STATE_LISTS: gql`
    query getStateList($query: CountryCode) {
      getStateList(query: $query) {
        message
        status
        data {
          state
          abbreviation
          country_code
        }
      }
    }
  `,
  GET_COUNTRY_LIST: gql`
    query getCountryList {
      getCountryList {
        message
        tenant_id
        status
        data {
          name
          code
          status
        }
      }
    }
  `,
  GET_CONTACT_PERSON_LIST_BY_CUSTOMER: gql`
    query getContactPersonListByCustomerID($query: GetContactPersonListInput) {
      getContactPersonListByCustomerID(query: $query) {
        message
        status
        data {
          id
          name
          email
          phone
          fax
          status
          createdAt
          updatedAt
        }
      }
    }
  `,
};
