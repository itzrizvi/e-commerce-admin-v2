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
      image
      brand_sort_order
      createdAt
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
GET_SINGLE_BRAND: gql`
  query getSingleBrand($brand_uuid : UUID!){
    getSingleBrand(query: {brand_uuid: $brand_uuid}) {
      message
      tenant_id
      status
      data {
        brand_name
        brand_description
        brand_status
        brand_sort_order
        image
        categories {
          cat_id
          cat_name
        }
      }
    }
  }
`,
BRAND_UPDATE: gql`
  mutation updateBrand($data: UpdateBrandInput, $file:Upload){
    updateBrand(data:$data, file: $file){
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
