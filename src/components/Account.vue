<template>
  <div v-if="store.getters['users/getUser']" class="relative shadow-md z-10">
    <button
     @click="menu = !menu"
      class="px-1 py-1 w-40 float-right bg-black text-white font-semibold overflow-hidden"
    >
      {{ store.getters["users/getUser"].username }}
    </button>
    <div class="clear-both"></div>
    <ul
      :class="`absolute top-full left-auto right-0 w-40 text-center shadow-md bg-white ${!menu? 'opacity-0 pointer-events-none' : ''}  `"
    >
      <li>
        <button @click="setting" class="border-b pr-1">Thiết lập</button>
      </li>
      <li>
        <button type="button" @click="logout" class="border-b pr-1">
          Thoát
        </button>
      </li>
    </ul>
    <TeleportUpdateUser
      :popup="popup"
      :user="user"
      @close="close"
      @updateUser="saveUpdateUser"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref, inject } from "vue";
import { useRouter } from "vue-router";

import TeleportUpdateUser from "./TeleportUpdateUser";

export default {
  components: {
    TeleportUpdateUser,
  },
  setup() {
    const store = useStore();
    let auth = inject("auth");
    const router = useRouter();
    const popup = ref(false);
    const menu = ref(false);
    const user = reactive({});
    const logout = () => {
      store.commit("users/setUser", {});
      store.commit("users/setLogin", false);
      auth.logout();
      router.push("/");
    };
    const setting = () => {
      popup.value = true;
      user.value = store.getters["users/getUser"];
      
    };
    const saveUpdateUser = (item) => {
      // update user in store and API
      store.dispatch("users/updateUserCurrent", item);
      popup.value = false;
    };
    const close = () => {
      // close teleport modal
      popup.value = false;
    };
    return {
      store,
      setting,
      logout,
      user,
      popup,
      saveUpdateUser,
      close,
       menu
    };
  },
};
</script>

<style></style>
