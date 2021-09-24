<template>
  <div class="container lg:max-w-sm flex m-auto items-center h-screen">
    <div class="row w-full">
      <form @submit.prevent="login" action="">
        <h1 class="text-xl font-bold text-2xl text-center mb-3">
          Đăng nhập
        </h1>
        <div>
          <label class="block text-left font-bold text-md "
            >Tên đăng nhập</label
          >
          <div class="relative shadow-sm">
            <i class="fas fa-user  absolute left-1 top-2 text-gray-500"></i>
            <input
              v-model="form.username"
              class="pl-5 block text-left border w-full px-1 py-1 text-sm rounded-0 outline-none"
              type="text"
              placeholder="Nhập tên đăng nhập..."
            />
          </div>
        </div>
        <div>
          <label class="block text-left font-bold text-md">Mật khẩu</label>
          <div class="relative shadow-sm">
            <i class="fas fa-key absolute left-1 top-2 text-gray-500"></i>
            <input
              v-model="form.password"
              class="pl-5 block text-left border w-full px-1 py-1 text-sm rounded-0 outline-none"
              type="password"
              placeholder="Nhập mật khẩu..."
            />
          </div>
        </div>
        <div class="flex justify-end">
          <button
            class=" shadow-md px-1 px-5 bg-gray-400 m-1 text-lg rounded-sm"
          >
            <i class="fas fa-sign-in-alt    "></i>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, inject } from "vue";
import { useStore } from "vuex";
import { useUser } from "../mixins/Users";
export default {
  setup() {
    let auth = inject("auth");
    const form = reactive({ username: "", password: "" });
    // eslint-disable-next-line no-unused-vars
    const store = useStore();
    // eslint-disable-next-line no-unused-vars
    const { levelUser } = useUser();
    const login = () => {
      // eslint-disable-next-line no-unused-vars
      auth.login(form).then((res) => {
            // eslint-disable-next-line no-undef
            store.commit("users/setUser", res);
            store.commit("users/setLogin", true);
            levelUser(store.getters["users/getUser"].level);
      });
    };
    return {
      form,
      login,
    };
  },
};
</script>

<style></style>
