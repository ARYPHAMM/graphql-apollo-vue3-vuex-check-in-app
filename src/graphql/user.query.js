import gql from "graphql-tag";
// eslint-disable-next-line no-unused-vars
import { apolloProvider } from "../plugins/graphql";

// eslint-disable-next-line no-unused-vars
const apollo = apolloProvider.defaultClient;
// eslint-disable-next-line no-unused-vars
export const getCheckins = async () => {
  let res = await apollo.query({
    query: gql`
      query getCheckins {
        CheckIns {
          id
          user{
            id
          }
          status
          time
          location
          session
        }
      }
    `,
  });
  return res.data;
};
export const getUsers = async () => {
  let res = await apollo.query({
    query: gql`
      query getUsers {
        users {
          id
          username
          fullname
          level
          email
          lock
          gender
          address
          
        }
      }
    `,
  });
  return res.data;
};
export const paginateUsers = async (obj) => {
  let res = await apollo.query({
    query: gql`
      query paginateUsers($page: Int!,$limit: Int!) {
        paginateUsers(page: $page,limit: $limit) {
           data{ id
              username
              fullname
              level
              email
              lock
              gender
              address}
          ,total,per_page
        }
      }
    `,
    variables: obj
  });
  return res.data;
};
export const getUserById = async (id) => {
  let res = await apollo.query({
    query: gql`
      query getUserById($id: Int!) {
        user(id: $id) {
          id
          email
          lock
        }
      }
    `,
    variables: {
      id: id,
    },
  });
  return res.data;
};
export const fetchUser = async () => {
  let res = await apollo.query({
    query: gql`
      query fetchUser{
        user{
          id
          username
          fullname
          level
          email
          lock
          gender
          address
        }
      }
    `
  });
  return res.data;
};
export const login = async (obj) => {
  let res = await apollo.query({
    query: gql`
      query userLogin($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          access_token
          token_type
          user{
            id
            username
            fullname
            level
            email
            lock
            gender
            address
          }
        }
      }
    `,
    variables: obj,
  });
  return res.data;
};
