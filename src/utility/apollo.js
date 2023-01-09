import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

export const apolloUploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URL,
  }),
});

export const authQuery = {
  GET_ALL_ROLES: gql`
    query getAllRoles {
      getAllRoles {
        message
        status
        data {
          id
          role_no
          role
          role_slug
          role_status
          role_description
          tenant_id
          permissions {
            id
            rolesPermission {
              id
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
          id
          first_name
          last_name
          email
          email_verified
          user_status
          image
          roles {
            id
            role
            role_slug
          }
        }
      }
    }
  `,
  GET_ALL_FEATURE_PERMISSION: gql`
    query getAllFeaturePermission {
      getAllFeaturePermission {
        isAuth
        message
        status
        tenant_id
        data {
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
        data {
          id
          roles_permission_name
          roles_permission_slug
          roles_permission_status
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_SINGLE_ROLE: gql`
    query getSingleRole($query: GetSingleRoleInput) {
      getSingleRole(query: $query) {
        message
        status
        data {
          id
          role_no
          role
          role_slug
          role_status
          role_description
          permissions {
            id
            rolesPermission {
              id
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
    query getSingleAdmin($query: GetSingleAdminInput) {
      getSingleAdmin(query: $query) {
        message
        status
        tenant_id
        data {
          id
          first_name
          last_name
          user_status
          email_verified
          email
          roles {
            id
            role
            role_slug
            role_no
            role_status
          }
        }
      }
    }
  `,
  SEND_RESET_PASSWORD: gql`
    mutation resetPassword($data: ResetPasswordInput) {
      resetPassword(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  GET_SINGLE_ROLES_PERMISSION: gql`
    query getSingleRolesPermission($query: GetSingleRolesPermissionInput) {
      getSingleRolesPermission(query: $query) {
        message
        status
        data {
          id
          roles_permission_name
          roles_permission_slug
          roles_permission_status
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  `,
};

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
        id
        message
        first_name
        status
        user_status
      }
    }
  `,
  CREATE_ROLE_WITH_PERMISSION: gql`
    mutation createRoleWithPermission($data: CreateRoleWithPermissionInput) {
      createRoleWithPermission(data: $data) {
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
    mutation updateRolesPermission($data: UpdateRolesPermissionInput) {
      updateRolesPermission(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_ROLE: gql`
    mutation updateRole($data: UpdateRoleInput) {
      updateRole(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_ROLE_PERMISSIONS_ONCHANGE: gql`
    mutation updateRolePermissions($data: UpdateRolePermissionsInput) {
      updateRolePermissions(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  ADMIN_UPDATE: gql`
    mutation adminUpdate($data: UpdateAdminInput, $file: Upload) {
      adminUpdate(data: $data, file: $file) {
        message
        status
        tenant_id
      }
    }
  `,
  ADMIN_PASSWORD_CHANGE: gql`
    mutation adminPasswordChange($data: AdminPasswordChangeInput) {
      adminPasswordChange(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};

export const productQuery = {
  GET_ALL_CATEGORIES: gql`
    query getAllCategories {
      getAllCategories {
        message
        status
        categories {
          id
          cat_name
          cat_slug
          cat_status
          is_featured
          subcategories {
            id
            cat_name
            cat_slug
            cat_status
            is_featured
            subsubcategories {
              id
              cat_name
              cat_slug
              cat_status
              is_featured
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
        category {
          id
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
  GET_PRODUCT_LIST: gql`
    query getProductList($query: ProductListInput) {
      getProductList(query: $query) {
        message
        status
        data {
          id
          prod_name
          prod_slug
          prod_sku
          prod_partnum
          prod_status
          taxable
          prod_condition
          prod_thumbnail
          prod_sale_price
          prod_regular_price
          is_serial
          is_sale
          cost
          prod_outofstock_status
          category {
            id
            cat_name
            cat_slug
            cat_description
            cat_meta_tag_title
            cat_meta_tag_description
            cat_meta_tag_keywords
            image
            cat_sort_order
            cat_status
            is_featured
            cat_parent_id
          }
          prod_attributes {
            id
            attribute_type
            attribute_value
            attribute_data {
              id
              attribute_name
              attribute_slug
              attribute_status
              attribute_group {
                id
                attr_group_name
                attr_group_slug
                attrgroup_sortorder
                attrgroup_status
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_PRODUCT_LIST_FOR_ADD_MINIMAL: gql`
    query getProductList {
      getProductList {
        message
        status
        data {
          id
          prod_name
          prod_status
          prod_sku
        }
      }
    }
  `,
  GET_SINGLE_PRODUCT: gql`
    query getSingleProduct($query: GetSingleProductInput) {
      getSingleProduct(query: $query) {
        message
        tenant_id
        status
        data {
          id
          prod_name
          prod_slug
          prod_long_desc
          prod_short_desc
          prod_meta_title
          prod_meta_desc
          prod_meta_keywords
          prod_tags
          prod_regular_price
          prod_sale_price
          prod_partnum
          prod_sku
          prod_status
          is_featured
          is_sale
          is_serial
          taxable
          cost
          prod_outofstock_status
          prod_thumbnail
          createdAt
          updatedAt
          prod_condition
          extended_warranty
          extended_warranty_value
          location
          hs_code
          product_rank
          mfg_build_part_number
          productCondition {
            id
            name
            status
            createdAt
            updatedAt
          }
          productavailablitystatus {
            id
            name
            slug
            createdAt
            updatedAt
          }
          representative {
            id
            first_name
            last_name
            email
            image
            roles {
              id
              role_no
              role
              role_slug
              role_status
              role_description
            }
          }
          brand {
            id
            brand_name
            brand_slug
            brand_description
            brand_status
            brand_sort_order
            image
          }
          category {
            id
            cat_name
            cat_slug
            cat_description
            cat_meta_tag_title
            cat_meta_tag_description
            cat_meta_tag_keywords
            image
            cat_sort_order
            cat_status
            is_featured
            cat_parent_id
          }
          discount_type {
            id
            customer_group {
              id
              customer_group_name
              customer_group_slug
              customergroup_description
              customergroup_sortorder
              customergroup_status
            }
            discount_quantity
            discount_priority
            discount_price
            discount_startdate
            discount_enddate
          }
          dimensions {
            id
            length
            width
            height
            dimensionClass {
              id
              name
              status
            }
          }
          weight {
            id
            weight
            weightClass {
              id
              name
              status
            }
          }
          gallery {
            id
            prod_id
            prod_image
          }
          part_of_products {
            id
            prod_quantity
            part_product {
              id
              prod_name
              prod_slug
              prod_long_desc
              prod_short_desc
              prod_meta_title
              prod_meta_desc
              prod_meta_keywords
              prod_tags
              prod_regular_price
              prod_sale_price
              prod_partnum
              prod_sku
              prod_status
              taxable
              # prod_weight
              # prod_weight_class
              prod_outofstock_status
              prod_thumbnail
            }
          }
          prod_attributes {
            id
            attribute_type
            attribute_value
            attribute_data {
              id
              attribute_name
              attribute_slug
              attribute_status
              attribute_group {
                id
                attr_group_name
                attr_group_slug
                attrgroup_sortorder
                attrgroup_status
              }
            }
          }
          related_products {
            id
            related_prod {
              id
              prod_name
              prod_slug
              prod_long_desc
              prod_short_desc
              prod_meta_title
              prod_meta_desc
              prod_meta_keywords
              prod_tags
              prod_regular_price
              prod_sale_price
              prod_partnum
              prod_sku
              prod_status
              taxable
              # prod_weight
              # prod_weight_class
              prod_outofstock_status
              prod_thumbnail
            }
          }
          created_by {
            id
            first_name
            last_name
            email
            image
            roles {
              id
              role_no
              role
              role_slug
              role_status
              role_description
            }
          }
        }
      }
    }
  `,
};

export const productMutation = {
  ADD_PRODUCT_MUTATION: gql`
    mutation addProduct($data: AddProductInput) {
      addProduct(data: $data) {
        message
        status
        data {
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
    mutation createCategory($data: CategoryCreateInput, $file: Upload) {
      createCategory(data: $data, file: $file) {
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
      }
    }
  `,
  ADD_PRODUCT: gql`
    mutation addProduct($data: AddProductInput) {
      addProduct(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_THUMBNAIL: gql`
    mutation updateThumbnail($data: UpdateThumbnailInput) {
      updateThumbnail(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  DELETE_GALLERY_IMAGE: gql`
    mutation deleteGalleryImage($data: GalleryImageDeleteInput) {
      deleteGalleryImage(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPLOAD_GALLERY_IMAGE: gql`
    mutation uploadGalleryImage($data: GalleryImageUploadInput) {
      uploadGalleryImage(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_PRODUCT: gql`
    mutation updateProduct($data: UpdateProductInput) {
      updateProduct(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  PRODUCT_IS_SERIAL_STATUS_CHANGE: gql`
    mutation changeProductIsSerial($data: ChangeProductIsSerialInput) {
      changeProductIsSerial(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};

export const rolesMutation = {
  ADD_ROLE_MUTATION: gql`
    mutation createRole($data: CreateRoleInput) {
      createRole(data: $data) {
        role
        roleNo
        roleSlug
        role_status
        roleUUID
        message
        status
      }
    }
  `,
};

export const attributeQuery = {
  GET_ALL_ATTR_GROUPS: gql`
    query getAllAttrGroups {
      getAllAttrGroups {
        status
        message
        tenant_id
        data {
          id
          attr_group_name
          attr_group_slug
          attrgroup_status
          attrgroup_sortorder
          tenant_id
          createdAt
          updatedAt
          attributes {
            id
            attribute_name
            attribute_slug
            attr_group_id
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
        data {
          id
          attr_group_name
          attr_group_slug
          attrgroup_status
          attrgroup_sortorder
          tenant_id
          createdAt
          updatedAt
          attributes {
            id
            attribute_name
            attribute_slug
            attr_group_id
            attribute_status
            tenant_id
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
  GET_ALL_ATTRIBUTES: gql`
    query getAllAttributes {
      getAllAttributes {
        message
        status
        data {
          id
          attribute_name
          attribute_slug
          attr_group_id
          attribute_status
          tenant_id
          createdAt
          updatedAt
          attribute_group {
            id
            attr_group_name
            attr_group_slug
            attrgroup_status
            attrgroup_sortorder
            tenant_id
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
  GET_ALL_ATTR_GROUPS_FOR_ADD_PROD: gql`
    query getAllAttrGroups {
      getAllAttrGroups {
        status
        message
        tenant_id
        data {
          id
          attr_group_name
          attrgroup_status
          attrgroup_sortorder
          attributes {
            id
            attribute_name
            attribute_status
          }
        }
      }
    }
  `,
  GET_SINGLE_ATTRIBUTE: gql`
    query getSingleAttribute($query: GetSingleAttributeInput) {
      getSingleAttribute(query: $query) {
        message
        status
        tenant_id
        data {
          id
          attribute_name
          attribute_slug
          attr_group_id
          attribute_status
          tenant_id
          createdAt
          updatedAt
          attribute_group {
            id
            attr_group_name
            attr_group_slug
            attrgroup_status
            attrgroup_sortorder
            tenant_id
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
};

export const attributeMutation = {
  CREATE_ATTR_GROUP: gql`
    mutation createAttrGroup($data: CreateAttributeGroupInput) {
      createAttrGroup(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_ATTR_GROUP: gql`
    mutation updateAttrGroup($data: UpdateAttributeGroupInput) {
      updateAttrGroup(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  CREATE_ATTRIBUTE: gql`
    mutation createAttribute($data: CreateAttributeInput) {
      createAttribute(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  UPDATE_ATTRIBUTE: gql`
    mutation updateAttribute($data: UpdateAttributeInput) {
      updateAttribute(data: $data) {
        message
        status
      }
    }
  `,
};

export const customerQuery = {
  GET_ALL_CUSTOMER_GROUPS: gql`
    query getAllCustomerGroups {
      getAllCustomerGroups {
        message
        status
        data {
          id
          customer_group_name
          customer_group_slug
          customergroup_description
          customergroup_sortorder
          customergroup_status
          tenant_id
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_SINGLE_CUSTOMER_GROUP: gql`
    query getSingleCustomerGroup($query: GetSingleCustomerGroupInput) {
      getSingleCustomerGroup(query: $query) {
        message
        status
        tenant_id
        data {
          id
          customer_group_name
          customer_group_slug
          customergroup_description
          customergroup_sortorder
          customergroup_status
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_ALL_CUSTOMER: gql`
    query {
      getAllCustomer {
        status
        message
        data {
          id
          first_name
          last_name
          email
          email_verified
          user_status
          image
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            type
            status
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
  GET_ALL_CUSTOMER_FOR_ORDER: gql`
    query {
      getAllCustomer {
        status
        message
        data {
          id
          first_name
          last_name
          email
          image
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            type
            status
            isDefault
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
  GET_SINGLE_CUSTOMER: gql`
    query getSingleCustomer($customer_id: Int!) {
      getSingleCustomer(query: { customer_id: $customer_id }) {
        status
        message
        data {
          id
          first_name
          last_name
          email
          email_verified
          user_status
          image
          contactPersons {
            id
            name
            email
            phone
            fax
            status
            createdAt
            updatedAt
          }
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            countryCode {
              name
              code
            }
            type
            status
            isDefault
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
  GET_ALL_ORDER_BY_CUSTOMER_ID: gql`
    query getOrderListByCustomerID($customer_id: Int!) {
      getOrderListByCustomerID(query: { customer_id: $customer_id }) {
        message
        status
        data {
          id
          paymentmethod {
            id
            name
            slug
            description
            status
          }
          total
          po_id
          po_number
          sub_total
          shipping_cost
          discount_amount
          tax_amount
          orderStatus {
            id
            name
            slug
            description
            status
          }
          productCount
          tax_exempt
          createdAt
          updatedAt
        }
      }
    }
  `,
};

export const customerMutation = {
  CREATE_CUSTOMER_GROUP: gql`
    mutation createCustomerGroup($data: CreateCustomerGroupInput) {
      createCustomerGroup(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_CUSTOMER_GROUP: gql`
    mutation updateCustomerGroup($data: UpdateCustomerGroupInput) {
      updateCustomerGroup(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};

export const couponQuery = {
  GET_ALL_COUPONS: gql`
    query getAllCoupons {
      getAllCoupons {
        message
        status
        data {
          id
          coupon_name
          coupon_code
          coupon_type
          coupon_amount
          coupon_status
          coupon_enddate
          coupon_maxamount
          coupon_minamount
          coupon_startdate
          coupon_sortorder
          coupon_description
          createdAt
          updatedAt
          tenant_id
        }
      }
    }
  `,
  GET_SINGLE_COUPON: gql`
    query getSingleCoupon($query: GetSingleCouponInput) {
      getSingleCoupon(query: $query) {
        status
        message
        data {
          id
          coupon_name
          coupon_code
          coupon_type
          coupon_amount
          coupon_status
          coupon_enddate
          coupon_maxamount
          coupon_minamount
          coupon_startdate
          coupon_sortorder
          coupon_description
          createdAt
          updatedAt
        }
      }
    }
  `,
};

export const couponMutation = {
  CREATE_COUPON: gql`
    mutation createCoupon($data: CreateCouponInput) {
      createCoupon(data: $data) {
        status
        message
      }
    }
  `,
  UPDATE_COUPON: gql`
    mutation updateCoupon($data: UpdateCouponInput) {
      updateCoupon(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
};

export const utilityQuery = {
  GET_ALL_AVAILABILITY: gql`
    query getAllProductAvailabilityStatus {
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
    }
  `,
  GET_ALL_CONDITIONS: gql`
    query getAllProductCondition {
      getAllProductCondition {
        message
        status
        data {
          id
          name
          status
        }
      }
    }
  `,
  GET_DIMENSION_CLASS_LIST: gql`
    query getDimensionClassList {
      getDimensionClassList {
        message
        status
        tenant_id
        data {
          id
          name
        }
      }
    }
  `,
  GET_WEIGHT_CLASS_LIST: gql`
    query getWeightClassList {
      getWeightClassList {
        message
        status
        tenant_id
        data {
          id
          name
        }
      }
    }
  `,
};

export const vendorQuery = {
  GET_ALL_VENDOR: gql`
    query getAllVendor {
      getAllVendor {
        message
        status
        data {
          id
          contact_person
          company_name
          email
          description
          phone_number
          EIN_no
          TAX_ID
          FAX_no
          status
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            type
            status
            updatedAt
            createdAt
          }
        }
      }
    }
  `,
  GET_SINGLE_VENDOR: gql`
    query getSingleVendor($query: GetSingleVendorInput) {
      getSingleVendor(query: $query) {
        message
        status
        data {
          id
          contact_person
          contactPersons {
            id
            name
            email
            phone
            fax
            status
          }
          company_name
          email
          description
          phone_number
          EIN_no
          TAX_ID
          FAX_no
          status
          addresses {
            id
            address1
            address2
            phone
            fax
            email
            city
            state
            zip_code
            country
            countryCode {
              name
              code
            }
            status
            isDefault
            updatedAt
            createdAt
            type
          }
        }
      }
    }
  `,
};

export const vendorMutation = {
  CREATE_VENDOR: gql`
    mutation createVendor($data: CreateVendorInput) {
      createVendor(data: $data) {
        message
        status
        id
      }
    }
  `,
  ADD_VENDOR_BILLING_ADDRESS: gql`
    mutation addVendorShippingAddress($data: AddVendorShippingAddressInput) {
      addVendorShippingAddress(data: $data) {
        message
        status
      }
    }
  `,
  ADD_VENDOR_SHIPPING_ADDRESS: gql`
    mutation addVendorShippingAddress($data: Address) {
      addVendorShippingAddress(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_VENDOR: gql`
    mutation updateVendor($data: UpdateVendorInput) {
      updateVendor(data: $data) {
        message
        status
      }
    }
  `,
  UPDATE_VENDOR_ADDRESS: gql`
    mutation updateVendorAddress($data: UpdateVendorAddressInput) {
      updateVendorAddress(data: $data) {
        message
        status
      }
    }
  `,
};

export default apolloClient;
