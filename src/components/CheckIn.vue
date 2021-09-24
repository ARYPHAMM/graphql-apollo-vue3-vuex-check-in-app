<template>
  <div>
    <div class="container lg:max-w-sm flex m-auto items-center h-screen">
      <div class="row w-full">
        <form @submit.prevent="checkIn" action="">
          <h1 class="text-xl font-bold text-2xl text-center mb-3">
            Điểm danh
          </h1>
          <div>
            <label class="block text-left font-bold text-md ">Tài khoản</label>
            <div class="relative shadow-sm">
              <i class="fas fa-user  absolute left-1 top-2 text-gray-500"></i>
              <input
                v-model="form.username"
                class="pl-5 block text-left border w-full px-1 py-1 text-sm rounded-0 outline-none"
                type="text"
                placeholder="Nhập Tài khoản..."
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, inject } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let auth = inject("auth");
    const store = useStore();
    const router = useRouter();
    store.commit("users/setUser", {});
    store.commit("users/setLogin", false);
    auth.logout();
    const form = reactive({ username: "", password: "" });
    const checkIn = () =>{
       // eslint-disable-next-line no-unused-vars
       store.dispatch("checkins/checkIn", form).then((res)=>{
         alert('Điểm danh thành công');
         router.push('/');
       // eslint-disable-next-line no-unused-vars
       }).catch((error)=>{
               alert('Điểm danh thất bại, vui lòng kiểm tra lại');
       });
    }
    return {
      form,
      checkIn
    };
  },
};
</script>

<style></style>
