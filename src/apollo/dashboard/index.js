import { gql } from '@apollo/client';

export const dashboardAnalytics = {
  GET_DASHBOARD_ANALYTICS: gql`
    query getDashboardAnalytics {
        getDashboardAnalytics {
        message
        status
        orderCount
        todayOrderPendingCount
        todayDeliveredOrderCount
        todayProductSoldCount
        todayProductPendingCount
        revenueCount
        todayRevenue
        customerCount
        newCustomer
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
      }
    }
  `,
};
