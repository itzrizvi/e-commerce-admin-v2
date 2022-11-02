import { gql } from "@apollo/client";

export const bannerQuery = {

  BANNER_ADD: gql`
    mutation addBanner($data: BannerInput) {
        addBanner(data: $data) {
        message
        status
        data {
            id
        }
      }
    }`,
  BANNER_IMAGE_ADD: gql`
    mutation addBannerImage($data: BannerImageInput!) {
      addBannerImage(data: $data) {
        message
        status
        data {
          id
          title
          link
          sort_order
        }
      }
    }`,
  GET_ALL_BANNER: gql`
    query getAllBanners{
      getAllBanners {
        message
        status
        tenant_id
        data {
          id
          name
          slug
          status
          createdAt
        }
      }
    }`,
  GET_SINGLE_BANNER: gql`
    query getSingleBanner($banner_id : Int!){
    getSingleBanner(query: {banner_id: $banner_id}) {
      message
      tenant_id
      status
      data {
        id
        name
        status
        banner_images {
          id 
          image
          link
          sort_order
          title
        }
      }
    }
  }`,
  BANNER_UPDATE: gql`
  mutation updateBanner($data: UpdateBannerInput){
    updateBanner(data:$data){
      message
      status
    }
  }`,
  BANNER_IMAGE_UPDATE: gql`
    mutation updateBannerImage($data: UpdateBannerImageInput){
    updateBannerImage(data: $data) {
      message
      status
    }
  }`,
  BANNER_IMAGE_DELETE: gql`
    mutation deleteBannerImage($banner_id: Int!) {
      deleteBannerImage(data: {banner_id: $banner_id}) {
        message
        status
        tenant_id
      }
    }`
}
