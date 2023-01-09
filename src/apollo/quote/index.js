import { gql } from '@apollo/client';

export const quoteQuery = {
  GET_ALL_QUOTE_STATUS: gql`
    query getQuoteStatusList {
    getQuoteStatusList {
      message
      status
      tenant_id
      data {
        id
        name
        slug
        status
      }
    }
  }`,
  GET_ALL_QUOTE: gql`
    query getSubmittedQuoteList($query:SubmittedQuoteListInput) {
      getSubmittedQuoteList(query:$query) {
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
            first_name
            last_name
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
