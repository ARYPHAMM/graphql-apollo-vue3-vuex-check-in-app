import gql from "graphql-tag";
import { apolloProvider } from "../plugins/graphql";
const apollo = apolloProvider.defaultClient;

// export default function() {
//   const { updateUserById } = useMutation(gql`
//     mutation updateUser($id: Int!) {
//       updateUser(id: $id) {
//         id
//       }
//     }
//   `);
//   return {
//     mutate,
//   };
// }
// mutation createCheckIn{
//   createCheckIn(username: "quoctienphamm",password: "123456") {
//     id
//     user{
//       id
//     }
//     status
//     time
//     session
//   }
// }
export const updateUserById = async (obj) => {
  let res = await apollo.mutate({
    mutation: gql`
      mutation updateUser($id: Int!,$fullname: String!,$gender: String!,$address: String,$password: String) {
        updateUser(id: $id,fullname: $fullname,gender: $gender,address: $address,password: $password) {
          id
          fullname
          gender
          address
          password
        }
      }
    `,
    variables: obj,
  });
  return res.data;
};
export const updateUserCurrent = async (obj) => {
  let res = await apollo.mutate({
    mutation: gql`
      mutation updateUserCurrent($id: Int!,$fullname: String!,$gender: String!,$address: String!,$password: String) {
        updateUserCurrent(id: $id,fullname: $fullname,gender: $gender,address: $address,password: $password) {
          id
          fullname
          gender
          address
          password
        }
      }
    `,
    variables: obj,
  });
  return res.data;
};
