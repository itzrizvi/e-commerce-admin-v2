import { gql } from '@apollo/client';

export const reportQuery = {
    GET_ORDER_LIST_REPORT: gql`
  query getOrderListReport {
  getOrderListReport {
    message
    tenant_id
    status
    data {
      order_id
      customer_name
      customer_email
      total_amount
      sub_total
      shipping_cost
      discount_amount
      tax_amount
      totalproducts
      totalquantity
      orderstatus
      tax_exempt
      paymentmethod
      shippingmethod
      coupon_name
      coupon_code
      coupon_type
      coupon_amount
      createdAt
    }
  }
}`,
    //     GET_SINGLE_ORDER_ADMIN: gql`
    //   query getSingleOrderAdmin($query: GetSingleOrderAdminInput) {
    //     getSingleOrderAdmin(query: $query) {
    //       message
    //       tenant_id
    //       status
    //       data {
    //         id
    //         total
    //         sub_total
    //         shipping_cost
    //         discount_amount
    //         tax_amount
    //         tax_exempt
    //         tenant_id
    //         createdAt
    //         updatedAt
    //         orderitems {
    //           id
    //           order_id
    //           price
    //           quantity
    //           tenant_id
    //           product {
    //             id
    //             prod_short_desc
    //             prod_name
    //             prod_slug
    //             prod_sku
    //             prod_partnum
    //             prod_status
    //             taxable
    //             prod_condition
    //             prod_thumbnail
    //             is_featured
    //             prod_sale_price
    //             prod_regular_price
    //             prod_outofstock_status
    //             createdAt
    //             updatedAt
    //             tenant_id
    //           }
    //         }
    //         paymentmethod {
    //           id
    //           name
    //           slug
    //           description
    //           status
    //           tenant_id
    //         }
    //         payment {
    //           id
    //           order_id
    //           amount
    //           provider_id
    //           status
    //           tenant_id
    //           billingAddress {
    //             id
    //             ref_id
    //             ref_model
    //             address1
    //             address2
    //             phone
    //             fax
    //             email
    //             city
    //             state
    //             zip_code
    //             country
    //             type
    //             status
    //             tenant_id
    //           }
    //         }
    //         orderstatus {
    //           id
    //           name
    //           slug
    //           description
    //           status
    //           tenant_id
    //         }
    //         customer {
    //           id
    //           first_name
    //           last_name
    //           email
    //           email_verified
    //           user_status
    //           image
    //         }
    //         shippingAddress {
    //           id
    //           ref_id
    //           ref_model
    //           address1
    //           address2
    //           phone
    //           fax
    //           email
    //           city
    //           state
    //           zip_code
    //           country
    //           type
    //           status
    //           tenant_id
    //         }
    //         taxExemptFiles {
    //           id
    //           order_id
    //           file_name
    //           tenant_id
    //         }
    //         coupon {
    //           id
    //           coupon_name
    //           coupon_code
    //           coupon_description
    //           coupon_type
    //           coupon_amount
    //           coupon_maxamount
    //           coupon_minamount
    //           coupon_startdate
    //           coupon_enddate
    //           coupon_status
    //           coupon_sortorder
    //           tenant_id
    //           createdAt
    //           updatedAt
    //         }
    //         added_by {
    //           id
    //           first_name
    //           last_name
    //           email
    //           image
    //           roles {
    //             id
    //             role_no
    //             role
    //             role_slug
    //             role_status
    //             role_description
    //           }
    //         }
    //       }
    //     }
    //   }
    //   `,
};
export const orderMutation = {}
