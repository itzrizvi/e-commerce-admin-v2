import { gql } from '@apollo/client';

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
    }
  `,
  BANNER_ITEM_ADD: gql`
    mutation addBannerItem($data: BannerItemInput!) {
      addBannerItem(data: $data) {
        message
        status
        data {
          id
        }
      }
    }
  `,
  GET_ALL_BANNER: gql`
    query getAllBanners {
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
    }
  `,
  GET_SINGLE_BANNER: gql`
    query getSingleBanner($banner_id: Int!) {
      getSingleBanner(query: { banner_id: $banner_id }) {
        message
        tenant_id
        status
        data {
          id
          name
          status
          banner_items {
            id
            title
            sub_title
            link
            price
            sale_price
            button_text
            option_1
            option_2
            image
            sort_order
          }
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
  BANNER_ITEM_UPDATE: gql`
    mutation updateBannerItem($data: UpdateBannerItemInput) {
      updateBannerItem(data: $data) {
        message
        status
      }
    }
  `,
  BANNER_ITEM_DELETE: gql`
    mutation deleteBannerItem($banner_id: Int!) {
      deleteBannerItem(data: { banner_id: $banner_id }) {
        message
        status
        tenant_id
      }
    }
  `,
};
