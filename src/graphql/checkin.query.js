import gql from "graphql-tag";
// eslint-disable-next-line no-unused-vars
import { apolloProvider } from "../plugins/graphql";

// eslint-disable-next-line no-unused-vars
const apollo = apolloProvider.defaultClient;
// eslint-disable-next-line no-unused-vars
export const paginateCheckIns = async (obj) => {
  let res = await apollo.query({
    query: gql`
      query paginateCheckIns($page: Int!, $limit: Int!, $date: String!) {
        paginateCheckIns(page: $page, limit: $limit, date: $date) {
          data {
            id
            user {
              id
              fullname
            }
            status
            time
            location
            session
          }
          total
          per_page
        }
      }
    `,
    variables: obj,
  });
  return res.data;
};
export const createCheckIn = async (obj) => {
  let res = await apollo.mutate({
    mutation: gql`
    mutation createCheckIn($username: String!, $password: String!) {
        createCheckIn(username: $username, password: $password) {
          id
        }
      }
    `,
    variables: obj,
  });
  return res.data;
};