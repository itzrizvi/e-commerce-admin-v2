import { gql } from '@apollo/client';

export const authQuery = {
  VALIDATE_TOKEN: gql`
    mutation validateToken($token: String) {
      validateToken(token: $token) {
        status
      }
    }
  `,
  RESET_PASSWORD: gql`
    mutation setPassword($data: SetPasswordInput) {
      setPassword(data: $data) {
        message
        status
        tenant_id
      }
    }
  `,
  GET_AUTH_PERMISSION: gql`
    query getSingleAdmin($query: GetSingleAdminInput) {
      getSingleAdmin(query: $query) {
        message
        status
        data {
          roles {
            permissions {
              edit_access
              read_access
              rolesPermission {
                roles_permission_slug
              }
            }
          }
        }
      }
    }
  `,
};
