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
    mutation addBannerImage($data: BannerImageInput!, $file: Upload!) {
      addBannerImage(data: $data, file: $file) {
        message
        status
        data {
          banner_uuid
          banner_id
          title
          link
          sort_order
        }
      }
    }`,
  SINGLE_UPLOAD: gql`
    mutation singleUpload($file: Upload) {
      singleUpload(file: $file) {
          message
        }
      }`
}
