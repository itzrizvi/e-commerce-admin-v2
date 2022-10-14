import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
})
export default apolloClient;

export const apolloUploadClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.REACT_APP_API_URL
  }),
})