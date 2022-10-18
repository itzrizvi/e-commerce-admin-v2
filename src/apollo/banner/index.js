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
  SINGLE_UPLOAD: gql`
    mutation singleUpload($file: Upload!) {
      singleUpload(file: $file) {
          message
        }
      }`
}
