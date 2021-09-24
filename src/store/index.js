import { createStore } from 'vuex'
import users from "./modules/users";
import checkins from "./modules/checkins";
export default createStore({
  modules: {
    users,
    checkins
  },
});
