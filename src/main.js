import { createApp,h,provide} from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import {apolloClient} from "./plugins/graphql";
import { DefaultApolloClient } from '@vue/apollo-composable';
import store from './store/index.js'
import auth from "./plugins/auth";
import router from "./router/router.js";
import 'moment-timezone';
import moment from 'moment';


let config_auth = {
  path: "http://www.bolt.local",
  autoFetch: false,
  fetchTime: 5000,
  fetchPath: "/api/user",
  user: "",
};
const app = createApp({
  setup() {
    provide('moment', moment);
    provide('auth', new auth(config_auth));
    provide(DefaultApolloClient, apolloClient); // using Composition API 
  },
  render: () => h(App),
});
// app.config.globalProperties.auth = new auth(config_auth);
// app.config.globalProperties.moment = moment;


// eslint-disable-next-line no-unused-vars


app.use(store).use(router).mount('#app');
