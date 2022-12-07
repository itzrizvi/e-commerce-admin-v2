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
  GET_SINGLE_QUOTE: gql`
    query getSingleSubmittedQuote($query: GetSingleSubmittedQuoteInput) {
      getSingleSubmittedQuote(query: $query) {
        message
        status
        data {
          id
          status
          grand_total
          note
          createdAt
          submittedquoteitems {
            id
            submittedquote_id
            price
            quantity
            total_price
            product {
              id
              prod_name
              prod_slug
              prod_sku
              prod_partnum
              createdAt
            }
            createdAt
          }
        }
      }
    }
  `,
  REMOVE_QUOTE_ITEM: gql`
    mutation quoteItemDelete($data: QuoteItemDeleteInput) {
      quoteItemDelete(data: $data) {
        message
        status
      }
    }
  `,
  SUBMIT_QUOTE: gql`
    mutation updateSubmittedQuote($data: SubmittedQuoteUpdateInput) {
      updateSubmittedQuote(data: $data) {
        message
        status
      }
    }
  `,
};
