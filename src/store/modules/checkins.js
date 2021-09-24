// eslint-disable-next-line no-unused-vars
import { paginateCheckIns,createCheckIn } from "../../graphql/checkin.query";
// eslint-disable-next-line no-unused-vars
import {updateUserById, updateUserCurrent as updateUserCurrent1}  from "../../graphql/user.mutation";
// eslint-disable-next-line no-unused-vars
// let mutate = mutation();
const state = {
  checkins: [],
  paging:{
    per_page:0,
    total: 0,
    limit: 0,
    page: 0,
    allPage: 0,
  }
};
const getters = {
   allCheckIns: (state) => {
    return state.checkins;
  },
  paging: (state) => {
    return state.paging;
  },

};
const actions = {

  fetchCheckIns({ commit },paging) {
    paginateCheckIns(paging).then((res) => {
      res = JSON.parse(JSON.stringify(res));
      res.paginateCheckIns.limit = paging.limit;
      res.paginateCheckIns.page = paging.page;
      commit("setPaginate", res.paginateCheckIns); 
    });
  },
  // eslint-disable-next-line no-unused-vars
  async checkIn({ commit },form) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-unused-vars
      createCheckIn(form).then((res) => {
        if(res.createCheckIn != null)
           resolve(true);
        else 
        reject(true);
      }).catch(()=> {
        reject(true);
      });
    });
  },
};
const mutations = {
  
  setCheckIns: (state, checkins) => {
    state.checkins = JSON.parse(JSON.stringify(checkins));
  },
  setPaginate: (state,value) => {
    state.checkins = JSON.parse(JSON.stringify(value.data));
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
