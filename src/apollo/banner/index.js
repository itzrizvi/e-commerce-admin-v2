import { gql } from '@apollo/client';

export const bannerQuery = {
  BANNER_ADD: gql`
    mutation addBanner($data: BannerInput) {
      addBanner(data: $data) {
        message
        status
        id
      }
    }
  `,
  GET_ALL_BANNER: gql`
    query getAllBanners {
      getAllBanners {
        message
        status
        data {
          id
          name
          slug
          content
          status
          createdAt
          updatedAt
        }
      }
    }
  `,
  GET_SINGLE_BANNER: gql`
    query getSingleBanner($banner_id: Int!) {
      getSingleBanner(query: { banner_id: $banner_id }) {
        message
        status
        data {
          id
          name
          slug
          content
          layout_type
          status
          createdAt
          updatedAt
        }
      }
    }
  `,
  BANNER_UPDATE: gql`
    mutation updateBanner($data: UpdateBannerInput) {
      updateBanner(data: $data) {
        message
        status
      }
    }
  `,
};
