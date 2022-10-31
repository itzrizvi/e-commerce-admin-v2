import { gql } from "@apollo/client";

export const productConditionQuery = {

  CONDITION_ADD: gql`
    mutation addProductCondition($name: String!){
        addProductCondition(data: { name: $name }) {
            message
            status
            tenant_id
        }
    }`,
  CONDITION_UPDATE: gql`
    mutation updateProductCondition($data: UpdateProductConditionInput){
        updateProductCondition(data: $data) {
            message
            status
            tenant_id
        }
    }`,
  GET_ALL_CONDITION: gql`
    query getAllProductCondition{
        getAllProductCondition {
            message
            status
            data {
                id
                name
                slug
                createdAt
                updatedAt
            }
        }
    }`,
  GET_SINGLE_CONDITION: gql`
    query getSingleProductCondition($query: GetSingleProductConditionInput){
        getSingleProductCondition(query: $query) {
            message
            status
            data {
                id
                name
                slug
                createdAt
                updatedAt
            }
        }
  }`
}
