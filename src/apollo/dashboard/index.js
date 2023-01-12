import { gql } from '@apollo/client';

export const dashboardAnalytics = {
  GET_DASHBOARD_ANALYTICS: gql`
    query getDashboardAnalytics {
        getDashboardAnalytics {
          message
          status
          tenant_id
          totalCustomer
          newCustomer
          verifiedCustomer
          orderCount
          totalShippedOrder
          todayShippedOrder
          shippingInProgress
          newOrderCount
          totalQuotes
          todayQuotes
        recentOrders {
          id
          total
          createdAt
          updatedAt
          customer{
            id
            first_name
            last_name
            email
            image
          }
          orderStatus {
            id
            name
            slug
            status
          }
        }
        recentPurchaseOrders {
          id
          po_number
          order_id
          type
          grandTotal_price
        }
        recentQuotes {
          id
          status
          grand_total
          createdAt
          quotedby {
            id
            first_name
            email
          }
        }
      }
    }
  `,
};
