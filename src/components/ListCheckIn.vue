<template>
  <div>
    Xem theo ngày  <input class="outline-none border my-2 border-black" type="date"  data-date-format="DD MMMM YYYY" v-model="date">
    <button @click="search" class="mx-2">
       Tìm
    </button>
    <table class="table-fixed border-separate border w-full">
      <thead>
        <tr>
          <th class="w-1/5 border-gray-400 border-b-2">Họ tên</th>
          <th class="w-1/5 border-gray-400 border-b-2">Thời gian</th>
          <th class="w-1/5 border-gray-400 border-b-2">
            Buổi
          </th>
          <th class="w-1/5 border-gray-400 border-b-2">Trạng thái</th>
        </tr>
      </thead>

      <tbody v-if="store.getters['checkins/allCheckIns']">
        <tr
          class="text-center"
          v-for="checkin in store.getters['checkins/allCheckIns']"
          :key="checkin.id"
        >
          <td class="border-gray-400 border-r">{{ checkin.user.fullname }}</td>
          <td class="border-gray-400 border-r">
            {{
              moment
                .tz(new Date(checkin.time * 1000), "Asia/Ho_Chi_Minh")
                .format("DD/MM/YYYY HH:mm")
            }}
          </td>
          <td class="border-gray-400 border-r">
            <span v-if="checkin.session == 'morning'">
              Sáng
            </span>
            <span v-else>
              Chiều
            </span>
          </td>
          <td class="border-gray-400 border-r">
            <span v-if="checkin.status == 'good'">
              Đúng giờ
            </span>
            <span v-else>
              trể
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="store.getters['checkins/paging']">
      <Paging :paging="store.getters['checkins/paging']" />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { ref, reactive, watch, inject } from "vue";
import { useStore } from "vuex";
import { useUser } from "../mixins/Users";
import Paging from "./Paging";
import { useRoute } from "vue-router";
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Paging,
  },
  setup() {
    const store = useStore(); // use store
    let moment = inject("moment");
    const date = ref(0);
    date.value = moment.tz(new Date(), "Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DD");
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
      date: date.value
    };
    store.dispatch("checkins/fetchCheckIns", paging);
    const search = ()=>{
      paging.date = date.value;
      store.dispatch("checkins/fetchCheckIns", paging);
    }
    return {
      store,
      moment,
      date,
      search
    };
  },
};
</script>

<style></style>
