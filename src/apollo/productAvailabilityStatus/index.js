import { gql } from "@apollo/client";

export const productAvailabilityStatusQuery = {

AVAILABILITY_STATUS_ADD: gql`
    mutation addProductAvailabilityStatus($name: String!){
        addProductAvailabilityStatus(data: { name: $name }) {
            message
            status
            tenant_id
        }
    }`,
  AVAILABILITY_STATUS_UPDATE: gql`
    mutation updateProductAvailabilityStatus($data: UpdateProductAvailabilityStatusInput){
        updateProductAvailabilityStatus(data: $data) {
            message
            status
            tenant_id
        }
    }`,
  GET_ALL_AVAILABILITY_STATUS: gql`
    query getAllProductAvailabilityStatus{
        getAllProductAvailabilityStatus {
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
  GET_SINGLE_AVAILABILITY_STATUS: gql`
    query getSingleProductAvailabilityStatus($query : GetSingleProductAvailabilityStatusInput){
        getSingleProductAvailabilityStatus(query: $query) {
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
