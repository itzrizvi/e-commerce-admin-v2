import { gql } from '@apollo/client';

export const contactPersonsSchema = {
  ADD_CONTACT_PERSON: gql`
    mutation createContactPerson($data: CreateContactPersonInput) {
      createContactPerson(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_CONTACT_PERSON: gql`
    mutation updateContactPerson($data: UpdateContactPersonInput) {
      updateContactPerson(data: $data) {
        message
        status
      }
    }
  `,
  GET_CONTACT_PERSON_BY_ID: gql`
    query getContactPerson($query: GetContactPersonInput) {
      getContactPerson(query: $query) {
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
