import { gql } from "@apollo/client";

export const authQuery = {
    
  VALIDATE_TOKEN: gql`
    mutation validateToken($token: String) {
        validateToken(token: $token) {
            status
        }
    }`
}
