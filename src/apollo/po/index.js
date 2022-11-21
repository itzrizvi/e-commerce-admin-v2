import { gql } from "@apollo/client";

export const poQuery = {
    GET_ALL_PO: gql`
        query getPurchaseOrderList{
            getPurchaseOrderList {
                message
                tenant_id
                status
                data {
                id
                po_id
                grandTotal_price
                order_placed_via
                status
                comment
                }
            }
        }`,
    UPDATE_PO_STATUS: gql`
        mutation updatePOStatus($data:POStatusChangeInput){
            updatePOStatus(data:$data){
                message
                status
                tenant_id
            }
        }
    `
}
