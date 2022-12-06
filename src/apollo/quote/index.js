import { gql } from '@apollo/client';

export const quoteQuery = {
  GET_ALL_QUOTE: gql`
    query getSubmittedQuoteList {
      getSubmittedQuoteList {
        message
        status
        data {
          id
          status
          grand_total
          note
          createdAt
          updatedAt
          quotedby {
            id
            email
          }
        }
      }
    }
  `,
};
