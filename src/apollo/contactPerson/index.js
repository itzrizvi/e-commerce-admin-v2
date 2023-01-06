import { gql } from '@apollo/client';

export const contactPersonsSchema = {
  ADD_CONTACT_PERSON: gql`
    mutation createContactPerson($data: CreateContactPersonInput) {
      createContactPerson(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_CONTACT_PERSON: gql`
    mutation updateContactPerson($data: UpdateContactPersonInput) {
      updateContactPerson(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};
