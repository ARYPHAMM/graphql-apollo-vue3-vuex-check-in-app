<template>
  <div class="flex flex-row">
    <div class="w-64" v-if="store.getters['users/login']">
      <Menu />
    </div>
    <div class="w-full">
      <Account  v-if="store.getters['users/login']"/>
      <router-view v-if="display" />
    </div>
  </div>
</template>

<script>
import { ref, inject } from "vue";
import { useStore } from "vuex";
import { useUser } from "./mixins/Users";
import { useRoute } from "vue-router";
import Menu from "./components/Menu.vue";
import Account from "./components/Account.vue";

export default {
  name: "App",
  components:{
    Menu,
    Account
  },
  setup() {
    const display = ref(false);
    const route = useRoute();
    const store = useStore();
    let auth = inject("auth");
    const { levelUser } = useUser();
    //  login start
    auth
      .user()
      .then((res) => {
        store.commit("users/setUser", res);
        store.commit("users/setLogin",true);
        if (route.name == "login")
          levelUser(store.getters["users/getUser"].level);
        display.value = true;
      })
      .catch(() => {
         if (route.name != "check-in")
           levelUser(0);
        display.value = true;
      });
    return {
      display,
      store
    };
  },
};
</script>
