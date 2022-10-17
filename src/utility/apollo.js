import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const apolloClient = new ApolloClient({
  uri: 'https://api.primeserverparts.com/graphql',
  cache: new InMemoryCache(),
})

export const apolloUploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: 'https://api.primeserverparts.com/graphql'
  }),
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
  query getAllStaff {
    getAllStaff {
      isAuth
      message
      status
      data {
        uid
        first_name
        last_name
        email
        email_verified
        user_status
        roles {
          role
          role_slug
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

  GET_SINGLE_ROLE: gql`
        query getSingleRole($query: GetSingleRoleInput){
          getSingleRole(query: $query){
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
  GET_SINGLE_ADMIN: gql`
    query getSingleAdmin($query:GetSingleAdminInput){
      getSingleAdmin(query:$query){
        message
        status
        tenant_id
        data {
          uid
          first_name
          last_name
          user_status
          email_verified
          roles {
            role_uuid
            role
            role_slug
            role_no
            role_status
          }
        }
      }
    }
    `,
}



export const authMutation = {
  ADMIN_SIGN_UP: gql`
    mutation adminSignUp($data: AdminSignUpInput) {
      adminSignUp(data: $data) {
        message
        status
        tenant_id
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
        last_name
        status
        user_status
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
  CREATE_ROLES_PERMISSION: gql`
        mutation createRolesPermission($data: RolesPermissionInput) {
          createRolesPermission(data: $data) {
            tenant_id
            message
            status
          }
        }
        `,
  UPDATE_ROLES_PERMISSION: gql`
        mutation updateRolesPermission($data:UpdateRolesPermissionInput){
          updateRolesPermission(data:$data){
            message
            status
            tenant_id
          }
        }
        `,
  UPDATE_ROLE: gql`
        mutation updateRole($data:UpdateRoleInput){
          updateRole(data:$data){
            message
            status
            tenant_id
          }
        }
        `,
  UPDATE_ROLE_PERMISSIONS_ONCHANGE: gql`
        mutation updateRolePermissions($data:UpdateRolePermissionsInput){
          updateRolePermissions(data:$data){
            message
            status
            tenant_id
          }
        }
        `,
  ADMIN_UPDATE: gql`
        mutation adminUpdate($data: UpdateAdminInput){
          adminUpdate(data:$data){
            message
            status
          }
        }
        `,
  ADMIN_PASSWORD_CHANGE: gql`
        mutation adminPasswordChange($data: AdminPasswordChangeInput){
          adminPasswordChange(data:$data){
            message
            status
            tenant_id
          }
        }
        `,
}

export const productQuery = {
  GET_ALL_CATEGORIES: gql`
  query getAllCategories {
    getAllCategories {
      message
      status
      tenant_id
      categories {
        cat_id
        cat_name
        cat_slug
        cat_status
        image
        is_featured
        cat_parent_id
        cat_sort_order
        cat_description
        cat_meta_tag_title
        cat_meta_tag_description
        cat_meta_tag_keywords
        subcategories {
          cat_id
          cat_name
          cat_slug
          cat_status
          image
          is_featured
          cat_parent_id
          cat_sort_order
          cat_description
          cat_meta_tag_title
          cat_meta_tag_description
          cat_meta_tag_keywords
          subsubcategories {
            cat_id
            cat_name
            cat_slug
            cat_status
            image
            is_featured
            cat_parent_id
            cat_sort_order
            cat_description
            cat_meta_tag_title
            cat_meta_tag_description
            cat_meta_tag_keywords
          }
        }
      }
    }
  }
  
  `,
  GET_SINGLE_CATEGORY_FOR_UPDATE: gql`
  query getSingleCategory($query: GetSingleCategoryInput) {
    getSingleCategory(query: $query) {
      message
      status
      tenant_id
      category {
        cat_id
        cat_name
        cat_slug
        cat_status
        is_featured
        cat_parent_id
        cat_sort_order
        cat_description
        cat_meta_tag_title
        cat_meta_tag_description
        cat_meta_tag_keywords
      }
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
      
    `,
  CREATE_CATEGORY: gql`
  mutation createCategory($data:CategoryCreateInput, $file:Upload){
    createCategory(data:$data, file:$file){
      message
      tenant_id
      status
    }
  }
    `,
  UPDATE_CATEGORY: gql`
    mutation updateCategory($data: UpdateCategoryInput) {
      updateCategory(data: $data) {
        message
        status
        tenant_id
      }
    }
    
    `,
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

export const attributeQuery = {
  GET_ALL_ATTR_GROUPS: gql`
  query getAllAttrGroups {
    getAllAttrGroups{
      status
      message
      tenant_id
      data{
        attr_group_uuid
        attr_group_name
        attr_group_slug
        attrgroup_status
        attrgroup_sortorder
        tenant_id
        createdAt
        updatedAt
        attributes {
          attribute_uuid
          attribute_name
          attribute_slug
          attr_group_uuid
          attribute_status
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  }
  `,
  GET_SINGLE_ATTR_GROUP: gql`
  query getSingleAttrGroup($query: GetSingleAttrGroupInput) {
    getSingleAttrGroup(query: $query) {
      message
      status
      tenant_id
      data {
        attr_group_uuid
        attr_group_name
        attr_group_slug
        attrgroup_status
        attrgroup_sortorder
        tenant_id
        createdAt
        updatedAt
        attributes {
          attribute_uuid
          attribute_name
          attribute_slug
          attr_group_uuid
          attribute_status
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  }
  
  `,
}

export const attributeMutation = {
  CREATE_ATTR_GROUP: gql`
  mutation createAttrGroup($data:CreateAttributeGroupInput){
    createAttrGroup(data:$data){
      message
      status
      tenant_id
    }
  }
  `,
  UPDATE_ATTR_GROUP: gql`
  mutation updateAttrGroup($data:UpdateAttributeGroupInput){
    updateAttrGroup(data:$data){
      message
      status
      tenant_id
    }
  }
  `,
}





export default apolloClient;