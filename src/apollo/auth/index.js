import { gql } from "@apollo/client";

export const authQuery = {

  VALIDATE_TOKEN: gql`
    mutation validateToken($token: String) {
        validateToken(token: $token) {
            status
        }
    }`,
  GET_AUTH_PERMISSION_old: gql`
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
}
