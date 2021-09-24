<template>
  <div>
    <table class="table-fixed border-separate border w-full">
      <thead>
        <tr>
          <th class="w-1/5 border-gray-400 border-b-2">Họ tên</th>
          <th class="w-1/5 border-gray-400 border-b-2">Tài khoản</th>
          <th class="w-1/5 border-gray-400 border-b-2">Thống kê</th>
          <th class="w-1/5 border-gray-400 border-b-2">Cập nhật</th>
          <th class="w-1/5 border-gray-400 border-b-2">Khóa</th>
        </tr>
      </thead>

      <tbody v-if="store.getters['users/allUsers']">
        <tr
          class="text-center"
          v-for="user in store.getters['users/allUsers']"
          :key="user.id"
        >
          <td class="border-gray-400 border-r">{{ user.fullname }}</td>
          <td class="border-gray-400 border-r">{{ user.username }}</td>
          <td class="border-gray-400 border-r ">
            Xem
          </td>
          <td class="border-gray-400 border-r ">
            <button @click="getUser(user.id)">
              <i class="fas fa-edit    "></i>
            </button>
          </td>
          <td>
            <span v-if="user.lock == 1">
              Hoạt động
            </span>
            <span v-if="user.lock == 0">
              Đã khóa
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="store.getters['users/paging']">
      <Paging :paging="store.getters['users/paging']" />
    </div>
    <TeleportUpdateUser
      :popup="popup"
      :user="user"
      @close="close"
      @updateUser="saveUpdateUser"
    />
  </div>
</template>

<script>
import { ref, reactive,watch } from "vue";
import { useStore } from "vuex";
import { useUser } from "../mixins/Users";
import TeleportUpdateUser from "./TeleportUpdateUser";
import Paging from "./Paging";
import { useRoute } from "vue-router";
// import  {mutation}  from "../graphql/user.mutation";
export default {
  components: {
    TeleportUpdateUser,
    Paging,
  },
  setup() {
    const store = useStore(); // use store
    if (
      store.state.users.user.level != "admin" ||
      store.state.users.user.level != "master"
    ) {
      const { levelUser } = useUser(); // check authenticator, accept admin and master
      levelUser("user");
    }
    const route = useRoute();
    const paging = {
      page: route.query.page == null ? 1 : parseInt(route.query.page),
      limit: 10,
    };
    store.dispatch("users/fetchUsers", paging);
    const user = reactive({}); // user need update
    const popup = ref(false); // call teleport
    const getUser = (id) => {
      // get user need update
      user.value = {};
      user.value = store.getters["users/allUsers"].find(
        (item) => item.id == id
      );
      popup.value = true;
    };
    const saveUpdateUser = (item) => {
      // update user in store and API
      store.dispatch("users/updateUser", item);
      popup.value = false;
    };
    const close = () => {
      // close teleport modal
      popup.value = false;
    };
    // eslint-disable-next-line no-unused-vars
    watch(route,(value,val)=>{
      paging.page = route.query.page == null ? 1 : parseInt(route.query.page);
      store.dispatch("users/fetchUsers", paging);
    });
    return {
      popup,
      user,
      getUser,
      close,
      saveUpdateUser,
      store,
    };
  },
};
</script>

<style></style>
