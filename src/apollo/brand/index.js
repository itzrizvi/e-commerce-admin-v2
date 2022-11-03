import { gql } from "@apollo/client";

export const brandQuery = {
  GET_ALL_BRAND: gql`
  query getAllBrands {
  getAllBrands {
    message
    status
    data {
      id
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
  GET_ALL_BRAND_WITH_CATEGORY: gql`
query getAllBrands {
  getAllBrands {
    message
    status
    data {
      id
      brand_name
      brand_slug
      brand_status
      brand_description
      image
      createdAt
      updatedAt
      categories {
        id
        cat_name
        cat_slug
        cat_status
        subcategories {
          id
          cat_name
          cat_slug
          cat_status
          subsubcategories {
            id
            cat_name
            cat_slug
            cat_status
          }
        }
      }
    }
  }
}

`,
  GET_CATEGORIES: gql`
  query getParentCategories {
    getParentCategories {
      message
      status
      categories {
        id
        cat_name
      }
    }
  }
`,
  GET_SINGLE_BRAND: gql`
  query getSingleBrand($query: GetSingleBrandInput){
    getSingleBrand(query: $query) {
      message
      status
      data {
        brand_name
        brand_description
        brand_status
        brand_sort_order
        image
        categories {
          id
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
  BRAND_UPDATE_WI: gql`
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
        status
      }
    }`,
  BRAND_ADD_WI: gql`
      mutation createBrand($data: BrandCreateInput) {
        createBrand(data: $data) {
          message
          status
        }
     }`
}
