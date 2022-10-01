import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: 'https://api.primeserverparts.com/graphql',
    cache: new InMemoryCache()
})


export const authMutation = {
    LOGIN_MUTATION: gql`
        mutation adminSignIn($email: String!, $password: String!) {
            adminSignIn(email: $email, password: $password) {
            email
            emailVerified
            authToken
            uid
            message
            first_name
                roleNo
            status
            }
        }
        `
}



export default apolloClient;