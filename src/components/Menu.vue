<template>
  <div v-if="store.getters['users/getUser']">
    <h1 class="font-bold text-center py-1 bg-black text-white text-md">
      Adnminstrator
    </h1>
    <div class="shadow-md">
      <div
        class="text-gray-700 text-md border-b"
        v-if="
          store.getters['users/getUser'].level == 'admin' ||
            store.getters['users/getUser'].level == 'master'
        "
      >
        <router-link :to="{ path: '/all-users' }" class="py-1 pl-3 block"
          >Người dùng</router-link
        >
      </div>
      <div class="text-gray-700 text-md border-b">
        <router-link :to="{ path: '/list-check-in' }" class="py-1 pl-3 block"
          >Chấm công</router-link
        >
      </div>
      <div
        class="text-gray-700 text-md border-b"
        v-if="
          store.getters['users/getUser'].level == 'admin' ||
            store.getters['users/getUser'].level == 'master'
        "
      >
        <a href="" class="py-1 pl-3 block">Thống kê</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>

<style></style>
