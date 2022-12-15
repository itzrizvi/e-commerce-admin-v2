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
      }
    }
  `
};
