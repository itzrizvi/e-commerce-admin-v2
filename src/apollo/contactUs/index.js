import { gql } from "@apollo/client";

export const contactUsQueries = {
    GET_CONTACT_US_MSG_LIST: gql`
    query getContactUsMsgList {
        getContactUsMsgList{
          message
          status
          tenant_id
          data {
            id
            name
            email
            phone
            subject
            message
            tenant_id
            images {
              id
              image
              tenant_id
            }
          }
        }
      }
    `,
}