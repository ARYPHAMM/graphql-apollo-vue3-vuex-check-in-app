// eslint-disable-next-line no-unused-vars
import { getUsers,getUserById,paginateUsers } from "../../graphql/user.query";
// eslint-disable-next-line no-unused-vars
import {updateUserById, updateUserCurrent as updateUserCurrent1}  from "../../graphql/user.mutation";
// eslint-disable-next-line no-unused-vars
// let mutate = mutation();
const state = {
  user: {},
  users: [],
  login: false,
  paging:{
    per_page:0,
    total: 0,
    limit: 0,
    page: 0,
    allPage: 0,
  }
};
const getters = {
   allUsers: (state) => {
    return state.users.filter((item) => item.id !== state.user.id);
  },
   getUser: (state) => {
    return state.user;
  },
   login: (state) => {
    return state.login;
  },
  paging: (state) => {
    return state.paging;
  },

};
const actions = {
  // eslint-disable-next-line no-unused-vars
  updateUser({ commit }, item) {
    updateUserById(JSON.parse(JSON.stringify(item))).then(() =>{
      commit("updateUser",item);
    });
  },
  // eslint-disable-next-line no-unused-vars
  updateUserCurrent({ commit }, item) {
    updateUserCurrent1(JSON.parse(JSON.stringify(item))).then(() =>{
      commit("setUser",item);
    });
  },
  fetchUsers({ commit },paging) {
    paginateUsers(paging).then((res) => {
      res = JSON.parse(JSON.stringify(res));
      res.paginateUsers.limit = paging.limit;
      res.paginateUsers.page = paging.page;
      commit("setPaginate", res.paginateUsers); 
    });
  },
};
const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  updateUser: (state, user) => {
    state.users.map((currentValue) => {
      if (currentValue.id == user.id) {
        currentValue.fullname = user.fullname;
        currentValue.gender = user.gender;
        currentValue.address = user.address;
      }
    });
  },
  setUsers: (state, users) => {
    state.users = JSON.parse(JSON.stringify(users));
  },
  setLogin: (state,value) => {
    state.login = value;
  },
  setPaginate: (state,value) => {
    state.users = JSON.parse(JSON.stringify(value.data));
    state.paging.per_page = value.per_page;
    state.paging.total = value.total;
    state.paging.limit = value.limit;
    state.paging.page = value.page;
    state.paging.allPage = value.total < value.limit?0 :  Math.round(value.total % value.limit !=0 ? (value.total % value.limit + 1) : value.total / value.limit );
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
