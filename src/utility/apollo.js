import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: 'https://api.primeserverparts.com/graphql',
  cache: new InMemoryCache(),
})


export const authQuery = {
  GET_ALL_ROLES: gql`
      query getAllRoles {
        getAllRoles {
          message
          status
          data {
            role_uuid
            role_no
            role
            role_slug
            role_status
            role_description
            tenant_id
            permissions {
              permission_data_uuid
              rolesPermission {
                roles_permission_uuid
                roles_permission_name
                roles_permission_slug
                roles_permission_status
              }
              edit_access
              read_access
            }
          }
        }
      }
    `,
  GET_ALL_STAFF: gql`
    query getAllStaff{
      getAllStaff{
        isAuth
        message
        data{
          uid
          first_name
          last_name
          email
          email_verified
          roles{
            role
            role_no
            role_slug
            role_uuid
          }
        }
      }
    }
    `,
  GET_ALL_FEATURE_PERMISSION: gql`
      query getAllFeaturePermission{
        getAllFeaturePermission{
          isAuth
          message
          status
          tenant_id
          data{
            feature_permission_uuid
            feature_permission_name
            feature_permission_slug
          }
        }
      }
    `,
  GET_ALL_ROLES_PERMISSION: gql`
      {
        getAllRolesPermission {
          isAuth
          message
          status
          tenant_id
          data {
            roles_permission_uuid
            roles_permission_name
            roles_permission_slug
            roles_permission_status
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
  `,
  CREATE_ROLE_WITH_PERMISSION: gql`
        mutation createRoleWithPermission($data: CreateRoleWithPermissionInput){
          createRoleWithPermission(data: $data){
            tenant_id
            message
            status
          }
        }  
        `,
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



export const rolesMutation = {
  ADD_ROLE_MUTATION: gql`
        mutation createRole($data: CreateRoleInput){
          createRole(data: $data){
            role
            roleNo
            roleSlug
            role_status
            roleUUID
            message
            status
          }
        }`
}





export default apolloClient;