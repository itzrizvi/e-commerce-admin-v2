import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: 'https://api.primeserverparts.com/graphql',
  cache: new InMemoryCache()
})


export const authQuery = {
  GET_ALL_ROLES_QUERY: gql`
    query getAllRoles{
        getAllRoles{
          isAuth
          message
          data{
            role_uuid
            role_no
            role
            role_slug
            createdAt
            updatedAt
            tenant_id
          }
        }
      }
    `,
}



export const authMutation = {
  ADMIN_SIGN_UP: gql`
      mutation adminSignUp($data:AdminSignUpInput){
        adminSignUp(data:$data){
          uid
          email
          authToken
          message
          status
          emailVerified
          first_name
          last_name
          role
          roleNo
          roleSlug
          createdAt
          updatedAt
        }
      }
  `,
  LOGIN_MUTATION: gql`
        mutation adminSignIn($email: String!, $password: String!) {
            adminSignIn(email: $email, password: $password) {
            email
            emailVerified
            authToken
            uid
            message
            first_name
                roleNo
            status
            }
        }
        `
}

export const productMutation = {
  ADD_PRODUCT_MUTATION: gql`
        mutation addProduct($data: AddProductInput) {
          addProduct(data: $data) {
            message
            status
            data{
                product_id
                product_name
                product_slug
                product_description
                product_meta_tag_title
                product_meta_tag_description
                product_meta_tag_keywords
                product_tags
                product_image
                product_image_gallery
                product_sku
                product_regular_price
                product_sale_price
                product_tax_included
                product_stock_quantity
                product_minimum_stock_quantity
                product_maximum_orders
                product_stock_status
                product_available_from
                product_status
                product_barcode
                tenant_id
                product_category
                added_by
            }
          }
        }
      
    `
}



export default apolloClient;