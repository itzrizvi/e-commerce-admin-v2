import { gql } from "@apollo/client";

export const brandQuery = {
  GET_ALL_BRAND: gql`
  query getAllBrands {
  getAllBrands {
    message
    tenant_id
    status
    data {
      brand_uuid
      brand_name
      brand_slug
      brand_description
      brand_status
      brand_sort_order
      createdAt
      categories {
        cat_id
        cat_name
        cat_status
        subcategories {
          cat_id
          cat_name
          cat_status
          cat_sort_order
          subsubcategories {
            cat_id
            cat_name
            cat_status
          }
        }
      }
    }
  }
}`,
GET_CATEGORIES: gql`
  query getParentCategories {
    getParentCategories {
      message
      status
      tenant_id
      categories {
        cat_id
        cat_name
      }
    }
  }
`,
BRAND_UPDATE: gql`
  mutation updateBrand($data: UpdateBrandInput){
    updateBrand(data:$data){
      message
      status
    }
  }`,
  BRAND_ADD: gql`
    mutation createBrand($data: BrandCreateInput, $file:Upload) {
      createBrand(data: $data, file:$file) {
        message
        tenant_id
        status
      }
    }`
}
