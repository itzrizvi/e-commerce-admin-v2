import { gql } from "@apollo/client";

export const bannerQuery = {

  BANNER_ADD: gql`
    mutation addBanner($data: BannerInput) {
        addBanner(data: $data) {
        message
        status
        data {
            banner_uuid
        }
      }
    }`,
  BANNER_IMAGE_ADD: gql`
    mutation addBannerImage($data: BannerImageInput!) {
      addBannerImage(data: $data) {
        message
        status
        data {
          banner_uuid
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
          banner_uuid
          banner_name
          banner_slug
          banner_status
          createdAt
        }
      }
    }`,
  GET_SINGLE_BANNER: gql`
    query getSingleBanner($banner_uuid : UUID!){
    getSingleBanner(query: {banner_uuid: $banner_uuid}) {
      message
      tenant_id
      status
      data {
        banner_uuid
        banner_name
        banner_status
        bannerimages {
          banner_uuid 
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
    mutation deleteBannerImage($banner_uuid: UUID!) {
      deleteBannerImage(data: {banner_uuid: $banner_uuid}) {
        message
        status
        tenant_id
      }
    }`
}
